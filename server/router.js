/**router.js */
// # express 모듈
const express = require('express');
// express.Router의 인스턴스 router 생성
const router = express.Router();
// # database 가져오기
const mdbConn = require('./database');

// /로 GET 요청이 들어오면 user 테이블의 user_name을 추출하여 콘솔에 찍는다
router.get('/', (req, res, next) => {
  mdbConn.query('SELECT user_name FROM user', (err, data) => {
    if(!err) {
      console.log(data);
      res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  })
})

// router 내보내기
module.exports = router;
