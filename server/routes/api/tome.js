/**routes > api > tome.js */

/**api/tome 주소 다음에 슬래쉬로 들어가면 아래 라우터를 사용 */
import express from 'express';
import bcrypt from 'bcryptjs';

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

// @routes  GET api/tome/detail/answer
// @desc    GET all answerbyme date 
// @access  public 
router.get('/detail/answer', (req,res,next) => {
  try{
       console.log('/detail/answer 도착[답변 가져오기]');
       mdbConn.query(`SELECT (me_answer_seq, me_question_seq, user_seq, answer_content, answer_time) FROM answerbyme`, (err, rows, field) => {
         if(!err) {
           if(rows[0] == undefined) {
             return res.status(400).json({msg: '답변 데이터가 존재하지 않습니다.'});
           } else {
             res.json({
               data: rows
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