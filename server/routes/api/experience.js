import express, { response } from "express";
import auth from "../../middleware/auth";

const mdbConn = require("../../database");
const router = express.Router();

export default router;

// @routes  GET api/experience/
// @desc    Load all Experience
// @access  Auth user
router.get("/", auth, (req, res) => {
  mdbConn.query(
    `
  SELECT 
    experience_seq AS expr_seq
    ,experience_headline AS expr_headline
    ,DATE_FORMAT(experience_date, '%Y-%m-%d') AS expr_date 
    ,experience_text AS expr_text 
  FROM experience
  WHERE user_seq = (
    SELECT user_seq 
    FROM user
    WHERE email="${req.user.id}"
    );
  `,
    (err, rows) => {
      if (!err) {
        console.log(rows);
        return res.status(200).json(rows);
      } else {
        console.log(err);
        return res.status(400).json({ msg: err });
      }
    }
  );
});
// @routes  POST api/experience/upload
// @desc    Upload Experience
// @access  Auth user
router.post("/upload", auth, (req, res) => {
  console.log("experience POST auth=>", req.user.id);
  console.log("experience 넘어온 값 =>", req.body);
  mdbConn.query(
    `
  INSERT
  INTO experience
  (
    experience_headline
    ,experience_text
    ,experience_date
    ,user_seq
  )
  VALUES
  (
    "${req.body.headline}"
    ,"${req.body.text}"
    ,"${req.body.startdate}"
    ,(
      SELECT A.user_seq
      FROM user A
      WHERE A.email="${req.user.id}"
      )
  );
  `,
    (err, rows) => {
      if (!err) {
        console.log("experience 추가 완료===>");
        return res.status(200);
      } else {
        console.log(err);
        return res.status(400).json({ msg: e.message });
      }
    }
  );
});
