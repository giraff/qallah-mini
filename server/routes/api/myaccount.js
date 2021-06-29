import express from "express";
import auth from "../../middleware/auth";
import bcrypt from "bcryptjs";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import config from "../../config/index";

const { AWS_KEY, AWS_PRIVATE_KEY } = config;

const mdbConn = require("../../database");
const router = express.Router();
const s3 = new AWS.S3({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "giraffbucket",
    region: "ap-northeast-2",
    key: (req, file, cb) => {
      console.log(file);
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: {
    fileSize: 30 * 1024 * 1024,
  },
});
//@routes GET api/myaccount/detail
//@desc   아이디(이메일), 이름, 프로필 이미지 가져오기
//@access public
router.get("/detail", auth, (req, res, next) => {
  try {
    console.log("/myaccount/detail 도착");
    mdbConn.query(
      `
            SELECT
                user_name,
                email,
                profileImage
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
    return res.json({
      msg: "아이디(이메일), 이름, 프로필 이미지를 불러오는 도중 에러 ",
    });
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

//@routes POST api/myaccount/profile
router.post("/profile", auth, uploadS3.single("upload"), (req, res, next) => {
  console.log("프로필 이미지 수정하자!");
  try {
    mdbConn.query(
      `
      UPDATE 
        user
      SET 
        profileImage='${req.file.location}'
      WHERE 
        email="${req.user.id}"
    `,
      (err) => {
        if (!err) {
          console.log(req.file.location);
          return res
            .status(200)
            .json({ uploaded: true, url: req.file.location });
        } else {
          return res.status(400).json({ uploaded: false, url: null });
        }
      }
    );
  } catch (e) {
    console.error(e);
    return res.status(400).json({ uploaded: false, url: null });
  }
});

router.delete("/profile", auth, (req, res, next) => {
  console.log("프로필 이미지 삭제하자!");
  try {
    mdbConn.query(
      `
      UPDATE
        user
      SET
        profileImage=NULL
      WHERE
        email="${req.user.id}"
    `,
      (err) => {
        if (!err) {
          return res.status(200).json({ deleted: true });
        } else {
          return res.status(400).json({ deleted: false });
        }
      }
    );
  } catch (e) {
    console.error(e);
    return res.status(400).json({ uploaded: false, url: null });
  }
});
export default router;
