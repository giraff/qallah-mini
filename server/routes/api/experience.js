import express from "express";
import auth from "../../middleware/auth";

const mdbConn = require("../../database");
const router = express.Router();

export default router;

// @routes  GET api/experience/
// @desc    Load all Experience
// @access  Auth user
router.get("/", auth, (req, res) => {
  mdbConn.query(
    `SELECT experience_seq AS classname ,experience_headline AS headline ,DATE_FORMAT(experience_startdate, '%Y,%m,%d') AS startDate ,DATE_FORMAT(experience_enddate, '%Y,%m,%d') AS endDate ,experience_text AS text FROM experience WHERE user_seq = ( SELECT user_seq FROM user WHERE email="${req.user.id}") ORDER BY experience_startdate ASC;`,
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
  console.log("experience 넘어온 값 =>", req.body);
  const { headline, startDate } = req.body;
  if (!headline) {
    return res.status(400).json({ msg: "제목은 반드시 작성해주세요" });
  }
  if (!startDate) {
    return res.status(400).json({ msg: "시작 날짜를 반드시 작성해주세요" });
  }

  try {
    mdbConn.query(
      `INSERT INTO experience (experience_headline,experience_text,experience_startdate,experience_enddate,user_seq) VALUES ("${req.body.headline}","${req.body.text}","${req.body.startDate}","${req.body.endDate}",(SELECT A.user_seq FROM user A WHERE A.email="${req.user.id}"));`,
      (err, rows) => {
        if (!err) {
          console.log("experience 추가 완료===>");
          return res.status(200).json({ msg: "success" });
        } else {
          console.log(err);
          return res.status(400).json({ msg: err });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});
