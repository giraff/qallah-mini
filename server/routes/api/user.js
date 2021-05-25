/**routes > api > user.js */

/**api/user 주소 다음에 슬래쉬로 들어가면 아래 라우터를 사용 */
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

// @routes  GET api/user/register
// @desc    Register user 
// @access  public 
router.post('/register', (req, res, next) => {
  // express 서버에서 대부분 정보가 req.body에 담겨있다.
  // 1. req.body에서 필드 입력 정보 가져오기
  console.log('Reg !!');
  const {name, email, password} = req.body;
  // 2. 필드 모두 채워졌는지 검사
  if(!name || !email || !password) {
    return res.status(400).json({msg: "모든 필드를 채워주세요"});
  };
  // 3. 모두 채워졌다면 이미 존재하는 유저인지 검사 (존재한다면 반려)
  mdbConn.query(`SELECT * FROM user WHERE email="${email}"`, (err, rows, field) => {
    if(!err){
      // 존재하는 유저
      if(rows[0] != undefined) {
          return res.status(400).json({msg: '이미 가입한 유저입니다.'});
      } else {
        // 존재하지 않는 유저
        bcrypt.genSalt(10, (err, salt) => { //salt 값 생성
          if(!err) {
            bcrypt.hash(password, salt, (err, hash) => { // 기존 비밀번호 + salt => 암호화된 해쉬 생성
              if(err) throw err;
              const password = hash;
              mdbConn.query(`INSERT INTO user (user_name, email, pwd) VALUES ("${name}", "${email}", "${password}")`, (err, rows, field) => {
                if (!err){
                  res.send(`register Succes`);
                } else {
                  res.send(`error: ${err}`);
                }
              })
            })
          }
        })
        // res.send(`register Success`);

        // TODO:Token 생성 후 response 
      }
    } else {
      res.send(`error: ${err}`);
    }
  })
})

export default router;