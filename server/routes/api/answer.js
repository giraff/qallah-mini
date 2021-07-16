import express from "express";
import auth from "../../middleware/auth";

const mdbConn = require("../../database");
const router = express.Router();

//@routes   GET api/answer/
//@desc     해당 사용자가 작성한 답변을 일자(YYYY-mm-dd)별로 가져옴
//@access   auth user
//@API      loadAnswersByDateAPI
router.get("/", auth, (req, res) => {
  try {
    mdbConn.query(
      `
      SELECT
        A.date
        ,SUM(A.cnt)
        ,A.TYPE
        ,@ROWNUM := @ROWNUM + 1 AS ROWNUM
      FROM
        (
          SELECT 
            DATE_FORMAT(answer_time, '%Y-%m-%d') AS date,
            COUNT(DATE_FORMAT(answer_time, '%Y-%m-%d')) AS cnt,
            'answerbyme' AS TYPE
          FROM 
          answerbyme A
          WHERE user_seq = (
                      SELECT user_seq
                      FROM user
                      WHERE email="${req.user.id}"
                      )
          GROUP BY DATE_FORMAT(answer_time, '%Y-%m-%d')
          UNION ALL
          SELECT 
            DATE_FORMAT(answer_time, '%Y-%m-%d') AS date,
            COUNT(DATE_FORMAT(answer_time, '%Y-%m-%d')) AS cnt,
            'answerbyothers' AS TYPE
          FROM 
            answerbyothers A
          WHERE user_seq = (
                      SELECT user_seq
                      FROM user
                      WHERE email="${req.user.id}"
                      )
          GROUP BY DATE_FORMAT(answer_time, '%Y-%m-%d')
          UNION ALL
          SELECT 
            DATE_FORMAT(refl_answer_time, '%Y-%m-%d') AS date,
            COUNT(DATE_FORMAT(refl_answer_time, '%Y-%m-%d')) AS cnt,
            'answerforrefl' AS TYPE
          FROM 
            answerforrefl A
          WHERE user_seq = (
                      SELECT user_seq
                      FROM user
                      WHERE email="${req.user.id}"
                      )
          GROUP BY DATE_FORMAT(refl_answer_time, '%Y-%m-%d')
        ) A
      WHERE
        (SELECT @ROWNUM:=0)=0
      GROUP BY A.date,A.TYPE
      ORDER BY A.date
    `,
      (err, rows) => {
        if (!err) {
          return res.status(200).json(rows);
        } else {
          return res.status(400).json({ msg: err });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ mes: e });
  }
});

//@routes   GET api/answer/years
//@desc     연도만 가져오기
//@access   auth user
//@API      loadAnswersByYearsAPI
router.get("/years", auth, (req, res) => {
  try {
    mdbConn.query(
      `
      SELECT 
        A.date
        ,SUM(A.cnt)
        ,@ROWNUM2 := @ROWNUM2 + 1 AS ROWNUM
      FROM
        (
          SELECT
            DATE_FORMAT(answer_time, '%Y') AS date,
            COUNT(DATE_FORMAT(answer_time, '%Y')) AS cnt
          FROM 
            answerbyme A
          WHERE user_seq = (
                      SELECT user_seq
                      FROM user
                      WHERE email="${req.user.id}"
                      )
          GROUP BY DATE_FORMAT(answer_time, '%Y')
          UNION ALL
          SELECT 
            DATE_FORMAT(answer_time, '%Y') AS date,
            COUNT(DATE_FORMAT(answer_time, '%Y')) AS cnt
          FROM 
            answerbyothers A
          WHERE user_seq = (
                      SELECT user_seq
                      FROM user
                      WHERE email="${req.user.id}"
                      )
          GROUP BY DATE_FORMAT(answer_time, '%Y')
          UNION ALL
          SELECT 
            DATE_FORMAT(refl_answer_time, '%Y') AS date,
            COUNT(DATE_FORMAT(refl_answer_time, '%Y')) AS cnt
          FROM 
            answerforrefl A
          WHERE user_seq = (
                      SELECT user_seq
                      FROM user
                      WHERE email="${req.user.id}"
                      )
          GROUP BY DATE_FORMAT(refl_answer_time, '%Y')
        ) A
      WHERE
        (SELECT @ROWNUM2:=0)=0
      GROUP BY DATE
      ORDER BY ROWNUM
      `,
      (err, rows) => {
        if (!err) {
          return res.status(200).json(rows);
        } else {
          return res.status(400).json({ msg: err });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

//@routes GET api/answer/answertest
//현재 auth user가 작성한 모든 답변의 연도, 월, 일, 주제를 한 꺼번에 불러오기
router.get("/answertest", auth, (req, res) => {
  try {
    mdbConn.query(
      `
      SELECT
      A.DATE
      ,A.YEAR
      ,A.MONTH
      ,A.DAY
      ,A.TYPE
      ,@ROWNUm := @ROWNUm + 1 AS ROWNUM
    FROM
    (
      SELECT 
          DATE_FORMAT(answer_time, '%Y-%m-%d') AS DATE,
          DATE_FORMAT(answer_time, '%Y') AS YEAR,
          DATE_FORMAT(answer_time, '%m') AS MONTH,
          DATE_FORMAT(answer_time, '%d') AS DAY,
          'answerbyme' AS TYPE
      FROM 
      answerbyme A
      WHERE user_seq = (
                  SELECT user_seq
                  FROM user
                  WHERE email="${req.user.id}"
                  )
      GROUP BY DATE_FORMAT(answer_time, '%Y-%m-%d')
      UNION
      SELECT 
        DATE_FORMAT(answer_time, '%Y-%m-%d') AS DATE,
        DATE_FORMAT(answer_time, '%Y') AS YEAR,
        DATE_FORMAT(answer_time, '%m') AS MONTH,
        DATE_FORMAT(answer_time, '%d') AS DAY,
        'answerbyothers' AS TYPE
      FROM 
        answerbyothers A
      WHERE user_seq = (
                  SELECT user_seq
                  FROM user
                  WHERE email="${req.user.id}"
                  )
      GROUP BY DATE_FORMAT(answer_time, '%Y-%m-%d')
      UNION
      SELECT
        DATE_FORMAT(refl_answer_time, '%Y-%m-%d') AS DATE, 
        DATE_FORMAT(refl_answer_time, '%Y') AS YEAR,
        DATE_FORMAT(refl_answer_time, '%m') AS MONTH,
        DATE_FORMAT(refl_answer_time, '%d') AS DAY,
        'answerforrefl' AS TYPE
      FROM 
        answerforrefl A
      WHERE user_seq = (
                  SELECT user_seq
                  FROM user
                  WHERE email="${req.user.id}"
                  )
      GROUP BY DATE_FORMAT(refl_answer_time, '%Y-%m-%d')
    )A
    WHERE
      (SELECT @ROWNUM:=0)=0
    GROUP BY A.year, A.MONTH, A.DAY ,A.TYPE
    ORDER BY A.DATE
      `,
      (err, rows) => {
        if (!err) {
          return res.status(200).json(rows);
        } else {
          console.log(err);
          return res.status(400).json({ msg: err });
        }
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: e });
  }
});

// config의 params에 보낸 object를 꺼내 연도, 월, 일, 주제에 부합하는 답변 상세 내용을 불러오기
router.get("/detail", auth, (req, res) => {
  try {
    const { year, month, day, type } = JSON.parse(req.query.info);
    let dbquery = "";
    if (type === "answerbyme") {
      console.log(".,,,answerbyme ,,, 진입");
      dbquery = `SELECT
        A.me_question_seq AS seq
        , B.question_content AS question
        , A.answer_content AS answer

      FROM
        answerbyme AS A
      INNER JOIN questiontome AS B
      ON A.me_question_seq = B.me_question_seq
      WHERE
        A.user_seq = (
                SELECT user_seq
                FROM user
                WHERE email="${req.user.id}"
                )
      AND
        DATE_FORMAT(A.answer_time, '%Y-%m-%d') = '${year}-${month}-${day}'
        `;
    } else if (type === "answerbyothers") {
      console.log(".,,,answerbyothers ,,, 진입");
      dbquery = `
        SELECT
          A.other_question_seq AS seq
          , B.other_question_content AS question
          , A.answer_content AS answer

        FROM
          answerbyothers AS A
        INNER JOIN questionbyothers AS B
        ON A.other_question_seq = B.other_question_seq
        WHERE
          A.user_seq = (
                  SELECT user_seq
                  FROM user
                  WHERE email="${req.user.id}"
                  )
        AND
          DATE_FORMAT(A.answer_time, '%Y-%m-%d') = '${year}-${month}-${day}'
      `;
    } else if (type === "answerforrefl") {
      console.log(".,,,answerforrefl ,,, 진입");
      dbquery = `
        SELECT
        A.refl_question_seq AS seq
          , B.refl_content AS question
          , A.refl_answer_content AS answer

        FROM
          answerforrefl AS A
        INNER JOIN reflection AS B
        ON A.refl_question_seq = B.refl_question_seq
        WHERE
          A.user_seq = (
                  SELECT user_seq
                  FROM user
                  WHERE email="${req.user.id}"
                  )
        AND
          DATE_FORMAT(A.refl_answer_time, '%Y-%m-%d') = '${year}-${month}-${day}'
      `;
    }

    mdbConn.query(dbquery, (err, rows) => {
      if (!err) return res.status(200).json(rows);
      else return res.status(400).json({ msg: err });
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ msg: e });
  }
});
export default router;
