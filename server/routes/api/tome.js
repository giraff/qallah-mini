/**routes > api > tome.js */

/**api/tome 주소 다음에 슬래쉬로 들어가면 아래 라우터를 사용 */
import express from 'express';
import bcrypt from 'bcryptjs';
import auth from '../../middleware/auth';

// 입력 정보 저장하기 위해 전역 선언 db 객체 불러오기
const mdbConn = require('../../database');

// express 의 Router() 로 생성한 인스턴스 router
const router = express.Router();

// @routes  GET api/user/
// @desc    GET all users (전체 사용자 조회)
// @access  public (모두 접근 가능)

router.get('/', (req, res, next) => {
  try {
    mdbConn.query('SELECT * FROM user', (err, rows, field) => {
      if(!err) {
        if(rows != []) res.status(200).json(rows);
        else throw Error("No User");
      } 
    })
  } catch(e) {
    console.log(e);
    res.status(400).json({msg: e.message});
  }
});

// @routes  GET api/tome/detail
// @desc    GET all tome data 
// @access  public 
router.get('/detail', (req, res, next) => {
    try{
  // express 서버에서 대부분 정보가 req.body에 담겨있다.
  // 1. req.body에서 필드 입력 정보 가져오기
  console.log('detail 도착');
  // 3. 모두 채워졌다면 이미 존재하는 유저인지 검사 (존재한다면 반려)
  mdbConn.query(`SELECT * FROM questiontome`, (err, rows, field) => {
        if(!err){
            // 존재하지 않는 질문
            if(rows[0] == undefined) {
                return res.status(400).json({msg: '질문 데이터가 존재하지 않습니다.'});
            } else {
              // 존재하는 질문
                res.json({
                    data: rows
                })
              // res.send(`register Success`);
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

// @routes  GET api/tome/detail
// @desc    GET all answerbyme date 
// @access  public 

router.get('/detail/answer', auth, (req,res,next) => {
  try{
       console.log('/detail 도착[답변 가져오기]');
       mdbConn.query(`SELECT (user_seq) FROM user WHERE email=${req.user.id}`, (err, rows, field) => {
         if(!err) {
           // 로그인한 사용자의 데이터가 존재 하지 않으면
           if(rows[0] == undefined) {
             return res.status(400).json({msg: '사용자가 존재하지 않습니다.'});
           } else {
             // 로그인한 사용자의 데이터가 존재 하면
             // user_seq = 로그인 한 유저의 시퀀스 넘버
              const user_seq = rows[0];
              mdbConn.query(`SELECT (me_question_seq, user_seq, answer_content) FROM answerbyme WHERE user_seq=${user_seq}`, (err,rows, field) => {
                if(!err) {
                  // 사용자의 답변 데이터가 존재 하지 않으면
                  if(rows[0] == undefined) {
                    return res.status(400).json({msg: '답변 데이터가 존재하지 않습니다.'});
                  } else {
                    // 사용자의 답변 데이터가 존재 하면
                    res.json({
                      answerdata: rows
                    })
                  }
                } else {
                  res.send(`error: ${err}`);
                }
              })
           }
         } else {
           res.send(`error: ${err}`)
         }
       })
  } catch(e) {
    console.log(e);
    res.status(400).json({msg: e.message});
  }
}) 

export default router;