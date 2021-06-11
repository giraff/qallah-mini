import express from "express";
import moment from "moment";

const mdbConn = require("../../database");
const router = express.Router();
import auth from "../../middleware/auth";

//@routes   GET api/byother/detail
//@desc     모든 질문 불러오기
router.get("/detail", (req, res, next) => {
  try {
    console.log("detail 도착");
    mdbConn.query(`SELECT * FROM questionbyothers`, (err, rows, field) => {
      if (!err) {
        if (rows[0] == undefined) {
          return res
            .status(400)
            .json({ msg: "질문 데이터가 존재하지 않습니다." });
        } else {
          res.json(rows);
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
//@routes   GET api/byother/detail/:id
//@resc     페이지에 질문 불러오기
//@access   public
router.get("/detail/:id", (req, res) => {
  console.log("질문쓰 REQ => ", req.params.id);
  try {
    mdbConn.query(
      `SELECT * FROM questionbyothers WHERE other_question_seq=${req.params.id}`,
      (err, rows, field) => {
        if (!err) {
          console.log("질문쓰 => ", rows);
          return res.json(rows[0]);
        }
      }
    );
  } catch (e) {
    return res.json({ msg: "질문 불러오는 도중 에러." });
  }
});

//@routes   GET api/byother/answer/:id
//@resc     페이지에 답변 불러오기
//@access   public
router.get("/answer/:id", auth, (req, res) => {
  console.log("========answer load========== ");
  try {
    mdbConn.query(
      `SELECT answer_content FROM answerbyothers 
      WHERE other_question_seq=${req.params.id}
      AND user_seq=(SELECT user_seq FROM user WHERE email="${req.user.id}")
      AND date(answerbyothers.answer_time)=DATE(NOW())`,
      (err, rows) => {
        if (!err) {
          console.log("rows=>", rows[0]);
          return res.status(200).json(rows[0]);
        } else {
          return res.status(400).json({ msg: "SELECT 쿼리 도중 에러" });
        }
      }
    );
  } catch (e) {
    return res.json({ msg: "답변을 불러오는 도중 에러" });
  }
});

//@routes GET api/byother/answer
//@resc   모든 답변 불러오기
//@access public
router.get("/answer", auth, (req, res) => {
  console.log("answer 라우터 => ", req.user.id);
  try {
    mdbConn.query(
      `SELECT
      *
      FROM
        answerbyothers
      WHERE
        DATE_FORMAT(answer_time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
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

//@routes GET api/byother/answer
//@resc   모든 답변 불러오기
//@access public
router.delete("/answer/detail", auth, (req, res) => {
  console.log("delete 라우터 => ", req.user.id);
  try {
    mdbConn.query(
      `DELETE FROM answerbyothers WHERE user_seq=(
      SELECT user_seq FROM user WHERE email="${req.user.id}") AND DATE_FORMAT(answer_time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')`,
      (err) => {
        if (!err) {
          return res.status(200).json({ msg: "답변 detail 삭제 완료" });
        } else
          return res.status(400).json({ msg: "답변 detail 삭제 쿼리 중 에러" });
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: e.message });
  }
});

//@routes   api/byother/detail/answer/${page}
//@resc     답변 넣을때마다 저장
//@access   public
router.post("/detail/answer/:id", auth, async (req, res) => {
  try {
    console.log("답변 저장", req.params.id);

    mdbConn.query(
      `INSERT 
                    INTO answerbyothers
                        (
                          OTHER_ANSWER_SEQ
                      , answer_content
                      , answer_time
                      , user_seq
                      , other_question_seq
                      )
                  VALUES (
                        (
                        SELECT
                          A.other_answer_seq
                        FROM
                          answerbyothers A
                        WHERE
                          A.USER_SEQ = (
                                    SELECT B.USER_SEQ 
                                    FROM user B
                                    WHERE B.EMAIL='${req.user.id}'
                                    )
                        AND	
                          DATE_FORMAT(A.answer_time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
                        AND
                          A.OTHER_QUESTION_SEQ = ${req.params.id}
                        )
                        ,'${req.body.answerData}'
                      , NOW()
                      , (
                          SELECT B.USER_SEQ 
                          FROM user B
                          WHERE B.EMAIL='${req.user.id}'
                        )
                      , ${req.params.id}
                      )
                  ON DUPLICATE KEY UPDATE
                      answer_content = '${req.body.answerData}'
                      , answer_time = NOW()`,
      (err, rows) => {
        if (!err) {
          return res.status(200).json({ msg: "success" });
        } else {
          return res.status(400).json({ msg: "err" });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

//@router   GET api/byother/history
//@desc     답변의 날짜 데이터 가져오기
//@access   auth
router.get("/history", auth, (req, res) => {
  try {
    mdbConn.query(
      `SELECT 
        other_answer_seq AS seq, DATE_FORMAT(answer_time, '%Y-%m-%d') AS time
      FROM 
        answerbyothers 
      GROUP BY 
        DATE_FORMAT(answer_time, '%Y-%m-%d')`,
      (err, rows) => {
        if (!err) {
          return res.status(200).json(rows);
        } else {
          return res
            .status(400)
            .json({ msg: "히스토리에 답변 불러오는 도중 에러" });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

export default router;
