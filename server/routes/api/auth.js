import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth';
import config from '../../config/index';
const {JWT_SECRET} = config;

const mdbConn = require('../../database');

const router = express.Router();

// @route   POST api/auth/
// @desc    Auth user
// @access  public

router.post('/', (req, res) => {
  console.log('5.server router/api/auth.js ')
  // 1. req.body에서 필드 입력 정보 추출 (구조 분해)
  const {email, password} = req.body;
  
  // 2. 모든 필드 채워졌는지 Simple validation
  if(!email || !password) {
    console.log('모든 필드를 채우지 않음');
    return res.status(400).json({msg: "모든 필드를 채워주세요"});
  }
  
  
  // 3. 모든 필드 채워지면 이미 존재하는 유저인지 확인
  
  console.log('Hello', req.body);
  try {
    mdbConn.query(`SELECT * FROM user WHERE email="${email}"`, (err, rows, field) => {
      if(!err) {
        // 존재하는 유저라면 
        if(rows[0] != undefined) {
          // 4. 패스워드 검증
          if(password != rows[0].pwd) {
            console.log('비밀번호가 일치하지 않습니다.');
            return res.status(400).json({msg: "비밀번호가 일치하지 않습니다."});
          }

          // 5. 로그인 후 토큰 값 발행
          console.log('6. 토큰 값 발행 중..')
          jwt.sign({id: rows[0].email}, JWT_SECRET, {expiresIn: "2 days"}, (err, token) => {
            if(err) throw err;
            res.json({
              token,
              user: {
                email: rows[0].email,
                name: rows[0].user_name,
                birth: rows[0].birth
              }
            })
          });

        } else {
          // 6. 유저가 존재하지 않으면
          console.log('유저가 존재하지 않음')
          return res.status(400).json({msg: "유저가 존재하지 않습니다."});
        }
      }
    })
  } catch(e) {
    console.log(e);
  }
});

// @route   POST api/auth/logout
// @desc    Logout
// @access  public

// LOGOUT
// 서버에선 오로지 응답 (로그아웃 성공 메시지) 만 보내주고
// 나머지 과정은 front 단에서 redux-saga를 이용해 처리.
router.post('/logout', (req, res) => {
  res.json('로그아웃 성공');
});

//@route    GET api/auth/user
//@desc     현재 인증된(token값이 가리키는) 유저의 정보를 가져옴.
//@access   auth (인증된 사용자만)
router.get('/user', auth, (req, res) => {
  console.log('라우터 도착', req.user)
  try{
    // pwd 빼고 사용자 정보 모두 가져오기
    mdbConn.query(`SELECT user_seq, user_name, email, create_at, birth FROM user WHERE email="${req.user.id}"`, (err, rows, field) => {
      if(!err) {
        if(rows[0] != undefined) {
          console.log('유저 있어')
          res.json(rows[0]);
        } else {
          throw Error("유저가 존재하지 않습니다.");
        }
      }
    });

  } catch(e) {
    console.log(e);
    res.status(400).json({msg: e.message});
    
  }
})

export default router;