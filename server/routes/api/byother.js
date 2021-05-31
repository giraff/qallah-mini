import express from 'express';

const mdbConn = require('../../database');
const router = express.Router();

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
        console.log(rows);
        res.json(rows[0]);
      }
    })

  } catch(e) {
    res.json({msg: "질문이 없습니다."});
    return;
  }
})
export default router;