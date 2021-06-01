import express from 'express';

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

router.post('/answer', auth, (req, res, next) => {
  try{
    const { answers } = req.body;
    console.log(answers);
  } catch(e) {
    res.json({ msg: "답변을 저장하는 도중 에러가 났습니다."});
  }
});
export default router;