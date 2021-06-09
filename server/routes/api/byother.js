import express from "express";
import moment from "moment";

const mdbConn = require("../../database");
const router = express.Router();
import auth from "../../middleware/auth";

//@routes   GET api/byother/detail
//@desc     get all questions (question by others 남이 보는 나)
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
//@routes   api/byother/detail/:id
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
          res.json(rows[0]);
        }
      }
    );
  } catch (e) {
    res.json({ msg: "질문 불러오는 도중 에러." });
    return;
  }
});

//@routes   api/byother/answer/:id
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
          console.log(rows[0]);
          res.status(200).json(rows[0]);
        } else {
          res.status(400).json({ msg: "SELECT 쿼리 도중 에러" });
        }
      }
    );
  } catch (e) {
    res.json({ msg: "답변을 불러오는 도중 에러" });
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
          res.status(200).json({ msg: "success" });
        } else {
          res.status(400).json({ msg: "err" });
        }
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
// router.post('/answer', auth, async (req, res, next) => {
//   try{
//     const result = req.body.result;
//     if(result != []) {
//       mdbConn.query(`SELECT user_seq FROM user WHERE email="${req.user.id}"`, (err, rows, field) => {
//         if(!err) {
//           if(rows[0] != undefined) {
//             result.forEach((val) => {
//               const form = {
//                 other_question_seq: val.answer_seq,
//                 user_seq: rows[0].user_seq,
//                 answer_time: moment().format("YYYY-MM-DD hh:mm:ss"),
//                 answer_content: val.answer_content
//               }

//               // 저장하는 answer_content에 값이 ""이어도 저장이 되는 문제가 발생할 것이라 예상..

//               mdbConn.query(`INSERT INTO answerbyothers (user_seq, answer_time, answer_content, other_question_seq) VALUES ("${form.user_seq}","${form.answer_time}","${form.answer_content}","${form.other_question_seq}")`, (err, rows, field) => {
//                 if(!err) {
//                   console.log(`잘 들어갔습니다.`);
//                   return;
//                 } else {
//                   console.log(`에러! 에러! 에러!${err}`);
//                   return;
//                 }
//               })
//             })
//           } else {
//             console.log(`해당 이메일에 해당하는 유저가 없어...`);
//             return;
//           }
//         } else {
//           console.log(err);
//           return;
//         }
//       })
//     } else {
//       console.log('배열에 값이 없어서 저장할 값이 없어.');
//       return;
//     }
//   } catch(e) {
//     res.json({ msg: "답변을 저장하는 도중 에러가 났습니다."});
//     return;
//   }
// });

export default router;
