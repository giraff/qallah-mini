import express from 'express';
import moment from 'moment';

const mdbConn = require('../../database');
const router = express.Router();
import auth from '../../middleware/auth';

//@routes   GET api/byother/detail
//@desc     get all questions (question by others 남이 보는 나)
router.get('/detail', (req, res, next) => {
  try{
    console.log('detail 도착');
    mdbConn.query(`SELECT * FROM questionbyothers`, (err, rows, field) => {
      if(!err){
          if(rows[0] == undefined) {
              return res.status(400).json({msg: '질문 데이터가 존재하지 않습니다.'});
          } else {
              res.json(rows)
          }
        } else {
          res.send(`error: ${err}`);
        }
      })
  } catch(e) {
    console.log(e);
    res.status(400).json({msg: e.message});
  }
})

router.get('/detail/:id', (req, res) => {
  try{
    mdbConn.query(`SELECT * FROM questionbyothers WHERE other_question_seq=${req.params.id}`, (err, rows, field) => {
      if(!err) {
        res.json(rows[0]);
      }
    })

  } catch(e) {
    res.json({msg: "질문이 없습니다."});
    return;
  }
})

router.post('/answer', auth, async (req, res, next) => {
  try{
    const result = req.body.result;
    if(result != []) {
      mdbConn.query(`SELECT user_seq FROM user WHERE email="${req.user.id}"`, (err, rows, field) => {
        if(!err) {
          if(rows[0] != undefined) {
            result.forEach((val) => {
              const form = {
                other_question_seq: val.answer_seq,
                user_seq: rows[0].user_seq,
                answer_time: moment().format("YYYY-MM-DD hh:mm:ss"),
                answer_content: val.answer_content
              }

              // 저장하는 answer_content에 값이 ""이어도 저장이 되는 문제가 발생할 것이라 예상..

              mdbConn.query(`INSERT INTO answerbyothers (user_seq, answer_time, answer_content, other_question_seq) VALUES ("${form.user_seq}","${form.answer_time}","${form.answer_content}","${form.other_question_seq}")`, (err, rows, field) => {
                if(!err) {
                  console.log(`잘 들어갔습니다.`);
                  return;
                } else {
                  console.log(`에러! 에러! 에러!${err}`);
                  return;
                }
              })
            })           
          } else {
            console.log(`해당 이메일에 해당하는 유저가 없어...`);
            return;
          }
        } else {
          console.log(err);
          return;
        }
      })
    } else {
      console.log('배열에 값이 없어서 저장할 값이 없어.');
      return;
    }
  } catch(e) {
    res.json({ msg: "답변을 저장하는 도중 에러가 났습니다."});
    return;
  }
});
export default router;