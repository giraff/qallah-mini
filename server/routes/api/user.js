/**routes > api > user.js */

/**api/user 주소 다음에 슬래쉬로 들어가면 아래 라우터를 사용 */
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 입력 정보 저장하기 위해 전역 선언 db 객체 불러오기
const mdbConn = require('../../database');

// express 의 Router() 로 생성한 인스턴스 router
const router = express.Router();

// @routes  GET api/user/
// @desc    GET all users (전체 사용자 조회)
// @access  public (모두 접근 가능)

router.get('/', (req, res, next) => {
  try {
    mdbConn.query('SELECT * FROM user', (err, data) => {
      if(!err) {
        console.log(data);
        res.send(JSON.stringify(data));
      } else {
        console.log(err);
        res.send(JSON.stringify(err));
      }
    })
  } catch(e) {
    console.log(e);
    res.status(400).json({msg: e.message});
  }
});


// @routes  POST api/user/
// @desc    Register user (가입하기)
// @access  public (모두 접근 가능)
router.post('/', (req, res, next) => {

});
export default router;