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
        ,@ROWNUm := @ROWNUm + 1 AS ROWNUM
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
        ,@ROWNUM := @ROWNUM + 1 AS ROWNUM
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
        (SELECT @ROWNUM:=0)=0
      GROUP BY DATE
      ORDER BY ROWNUM;
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

export default router;
