/**routes > api > refl.js */

/**api/refl 주소 다음에 슬래쉬로 들어가면 아래 라우터를 사용 */
import express, { response } from "express";
import bcrypt from "bcryptjs";
import auth from "../../middleware/auth";

// 입력 정보 저장하기 위해 전역 선언 db 객체 불러오기
const mdbConn = require("../../database");

// express 의 Router() 로 생성한 인스턴스 router
const router = express.Router();

// @routes  GET api/refl/
// @desc    GET all users (전체 사용자 조회)
// @access  public (모두 접근 가능)

router.get("/", (req, res, next) => {
  try {
    mdbConn.query("SELECT * FROM user", (err, rows, field) => {
      if (!err) {
        if (rows != []) res.status(200).json(rows);
        else throw Error("No User");
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// @routes  GET api/refl/detail
// @desc    GET all refl data
// @access  public
router.get("/detail", (req, res, next) => {
  try {
    // express 서버에서 대부분 정보가 req.body에 담겨있다.
    // 1. req.body에서 필드 입력 정보 가져오기
    console.log("/refl/detail 도착");
    // 3. 모두 채워졌다면 이미 존재하는 유저인지 검사 (존재한다면 반려)
    mdbConn.query(`SELECT * FROM reflection`, (err, rows, field) => {
      if (!err) {
        // 존재하지 않는 질문
        if (rows[0] == undefined) {
          return res
            .status(400)
            .json({ msg: "질문 데이터가 존재하지 않습니다." });
        } else {
          // 존재하는 질문
          res.json({
            data: rows,
          });
          // res.send(`register Success`);
        }
      } else {
        res.send(`error: ${err}`);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// @routes  GET api/refl/answer
// @desc    모든 답변 가져오기
// @access  public

router.get("/answer", auth, (req, res) => {
  console.log("/refl/answer 라우터 => ", req.user.id);
  try {
    mdbConn.query(
      `SELECT
      *
      FROM
        answerforrefl
      WHERE
        DATE_FORMAT(refl_answer_time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
      AND
        user_seq=(SELECT user_seq FROM user WHERE email="${req.user.id}")`,
      (err, rows) => {
        if (!err) {
          return res.status(200).json(rows);
        } else {
          return res.status(400).json({ msg: "모든 답변 불러오기 도중 err" });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

// @routes  GET api/refl/answer/receive
// @desc    GET all answerbyme date
// @access  public

router.get("/answer/receive", auth, (req, res, next) => {
  try {
    console.log("/answer/receive 도착 [답변불러오기]");
    console.log("req.params >> ", req.query.question_seq);
    mdbConn.query(
      `SELECT
          refl_answer_content
        FROM
          answerforrefl
        WHERE
          refl_question_seq = ${req.query.question_seq}
        AND
          user_seq = 
          (
              SELECT
                A.user_seq
              FROM
                user A
              WHERE
                A.email = '${req.user.id}'
          )
        AND
          DATE_FORMAT(refl_answer_time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
          `,
      (err, rows) => {
        if (!err) {
          res.json({
            data: rows[0],
          });
        } else {
          return res.status(400).json({ msg: "error " });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

// @routes  POST api/refl/detail/answer/store
// @desc    답변 넣을때마다 저장
// @access  public

router.post("/detail/answer/store", auth, async (req, res, next) => {
  try {
    console.log("/detail/answer/store 도착 [답변저장하기]");
    console.log(req.body);
    console.log(req.user);
    mdbConn.query(
      `INSERT
                    INTO answerforrefl
                          (
                            refl_answer_seq,
                            refl_question_seq,
                            user_seq,
                            refl_answer_content,
                            refl_answer_time
                          )
                    VALUES (
                      (
                        SELECT
                          A.refl_answer_seq
                        FROM
                          answerforrefl A
                        WHERE
                          A.user_seq = (
                                          SELECT
                                            B.user_seq
                                          FROM
                                            user B
                                          WHERE
                                            B.email = '${req.user.id}'
                          )
                        AND	
                          DATE_FORMAT(A.refl_answer_time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
                        AND
                          A.refl_question_seq = ${req.body.question_seq}
                        )
                      , ${req.body.question_seq}
                      , (
                          SELECT
                            C.user_seq
                          FROM
                            user C
                          WHERE
                            C.email = '${req.user.id}'
                      )
                      , '${req.body.answer_context}'
                      , NOW()
                      )
                      ON DUPLICATE KEY UPDATE
                      refl_answer_content = '${req.body.answer_context}'
                      , refl_answer_time = NOW()
                    `,
      (err, rows) => {
        console.log(rows);
        if (!err) {
          return res.status(200).json({ msg: "success" });
        } else {
          return res.status(400).json({ msg: "error" });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

// @routes  GET api/refl/answer/delete
// @desc    당일 답변 모두 삭제
// @access  public

router.delete("/detail/answer/delete", auth, (req, res) => {
  console.log("/detail/answer/delete 도착 [답변 삭제하기]");
  try {
    mdbConn.query(
      `DELETE FROM
                answerforrefl
              WHERE
                user_seq = (
                  SELECT 
                    user_seq
                  FROM
                    user
                  WHERE
                    email = "${req.user.id}"
                )
                AND
                  DATE_FORMAT(refl_answer_time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')`,
      (err) => {
        if (!err) {
          return res.status(200).json({ msg: "답변 삭제 완료" });
        } else {
          return res.status(400).json({ msg: "답변 삭제 쿼리 에러" });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

router.get("/detail/history", auth, (req, res) => {
  console.log("/detail/history 도착 [히스토리 불러오기]");
  try {
    mdbConn.query(
      `SELECT
          refl_answer_seq AS seq
          , DATE_FORMAT(refl_answer_time, '%Y-%m-%d') AS history
          , DATE_FORMAT(refl_answer_time, '%Y') AS YEAR
          , DATE_FORMAT(refl_answer_time, '%m') AS MONTH
          , DATE_FORMAT(refl_answer_time, '%d') AS DAY
        FROM
          answerforrefl
        WHERE
          user_seq = (
            SELECT
              user_seq
            FROM
              user
            WHERE
              email = "${req.user.id}"
          )
          GROUP BY
            DATE_FORMAT(refl_answer_time, '%Y-%m-%d')`,
      (err, rows) => {
        if (!err) {
          return res.status(200).json(rows);
        } else {
          return res.status(400).json({ msg: "히스토리 불러오기 실패" });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});
export default router;
