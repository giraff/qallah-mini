/**routes > api > user.js */

/**api/user 주소 다음에 슬래쉬로 들어가면 아래 라우터를 사용 */
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config'
const {JWT_SECRET} = config;

// 입력 정보 저장하기 위해 전역 선언 db 객체 불러오기
const mdbConn = require('../../database');

// express 의 Router() 로 생성한 인스턴스 router
const router = express.Router();

// @routes  GET api/user/
// @desc    GET all users (전체 사용자 조회)
// @access  public (모두 접근 가능)

// router.get('/', (req, res, next) => {
//   try {
//     mdbConn.query('SELECT * FROM user', (err, row, field) => {
//       if(!err) {
//         console.log(row);
//         console.log(field)
//         res.send(`row : ${JSON.stringify(row)}, field : ${JSON.stringify(field)}`);
//       } else {
//         console.log(err);
//         res.send(JSON.stringify(err));
//       }
//     })
//   } catch(e) {
//     console.log(e);
//     res.status(400).json({msg: e.message});
//   }
// });

router.get('/', (req, res, next) => {
  res.render('login');
})
// @routes  POST api/user/
// @desc    Register user (회원가입)
// @access  public (모두 접근 가능)

router.post('/login', (req, res, next) => {
  // express 서버에서 대부분 정보가 req.body에 담겨있다.
  // 1. req.body에서 필드 입력 정보 가져오기
  const {name, email, password} = req.body;

  // 2. 필드 모두 채워졌는지 검사
  if(!name || !email || !password) {
    return res.status(400).json({msg: "모든 필드를 채워주세요"});
  };

  // 3. 모두 채워졌다면 이미 존재하는 유저인지 검사 (존재한다면 반려)
  mdbConn.query(`SELECT * FROM user where id=${email}`, (err, rows, field) => {
    if(!err) {
      // 존재하는 유저
      if(rows[0] != undefined) {
        // return res.status(400).json({msg: '이미 가입한 유저입니다.'});
        res.send(`id: : ${rows[0]['user_email']} <br> pw : ${rows[0]['pwd']}`);
      } else {
        // 존재하지 않는 유저
        res.send('no data');
      }
    } else {
      res.send(`error: ${err}`);
    }
  })
  

});
export default router;