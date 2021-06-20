import express from "express";
import auth from "../../middleware/auth";
import bcrypt from "bcryptjs";

const mdbConn = require("../../database");
const router = express.Router();

//@routes GET api/myaccount/detail
//@desc   아이디(이메일), 이름 가져오기
//@access public
router.get("/detail", auth, (req, res, next) => {
  try {
    console.log("/myaccount/detail 도착");
    mdbConn.query(
      `
            SELECT
                user_name,
                email
            FROM
                user
            WHERE
                email = "${req.user.id}"
        `,
      (err, rows) => {
        if (!err) {
          return res.status(200).json(rows[0]);
        } else {
          return res.status(400).json({ msg: "SELECT 쿼리 에러 " });
        }
      }
    );
  } catch (e) {
    return res.json({ msg: "아이디(이메일), 이름을 불러오는 도중 에러 " });
  }
});

//@routes POST api/myaccount/pw
//@desc   현재 비밀번호와 DB 비밀번호 비교하기
//@access public
router.post("/pw", auth, (req, res, next) => {
  const { pw } = req.body;
  try {
    console.log("/myaccount/pw 도착");
    console.log("password >> ", req.body);
    mdbConn.query(
      `
            SELECT
              pwd
            FROM
              user
            WHERE
              email = "${req.user.id}"
      `,
      (err, rows) => {
        console.log("rows >>", rows[0]);
        if (!err) {
          // USER ID를 이용하여 PW를 정상적으로 찾았을 때,
          bcrypt.compare(pw, rows[0].pwd, function (err, result) {
            if (!err) {
              // 입력한 PW 와 DB에 저장되어 있는 PW를 비교
              if (!result)
                return res.status(400).json({ msg: "비밀번호가 틀립니다." });
              else {
                console.log("PW가 일치합니다 >> ", result);
                res.json(result);
              }
            }
          });
        }
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

//@routes POST api/myaccount/update
//@desc   아이디(이메일), 이름, 비밀번호 업데이트 하기
//@access public
router.post("/update", auth, (req, res, next) => {
  const { new_name, new_pw } = req.body;
  console.log(new_name, new_pw);
  try {
    console.log("/myaccount/update 도착");
    bcrypt.genSalt(10, (err, salt) => {
      if (!err) {
        bcrypt.hash(new_pw, salt, (err, hash) => {
          if (err) throw err;
          const password = hash;
          console.log("password hashing >> ", password);
          mdbConn.query(
            `
                      UPDATE
                          user
                      SET
                          user_name = "${new_name}",
                          pwd = "${password}"
                      WHERE
                          email = "${req.user.id}"
                          `,
            (err, rows) => {
              if (!err) {
                return res.status(200).json({ msg: "Update Succress" });
              } else {
                return res.status(400).json({ msg: "err" });
              }
            }
          );
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

export default router;
