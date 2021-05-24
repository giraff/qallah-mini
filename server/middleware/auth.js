import jwt from 'jsonwebtoken';
import config from '../config/index';
const { JWT_SECRET } = config;

// 인증 함수 미들웨어
const auth = (req, res, next) => {
  // userloading을 실행할 때마다 네트워크 헤더 필드 x-auth-token 키의 값에 token을 할당한다.
  // 현재는 헤더에서 'x-auth-token' 필드의 값(=token)을 읽어오는 것
  const token = req.headers['x-auth-token'];

  // 토큰이 없다면 인증된 사용자가 아니다.
  if (!token) { 
    // 401 Unauthorized : 의미상 '비인증'(Unauthenticated) 의미
    return res.status(401).json({ msg: "토큰 없음. 인증이 거부됨!!!" });
  } else {
    // 토큰이 있다면
    try {
      // 유효한 토큰인지 확인
      const decoded = jwt.verify(token, JWT_SECRET);
      // jwt.verify 함수를 이용하여 암호화된 JWT의 payload를 decoded라는 변수에 저장
      // payload에는 user의 id가 저장되어 있다 (반드시 기억!) 그 id로 DB를 조회
      req.user = decoded;
      next();
    } catch (e) {
      // 유효한 토큰 아님 
      console.log(e);
       // 400 Bad Request : 서버가 클라이언트 오류를 감지해 요청을 처리할 수 없거나 하지 않음
      res.status(400).json({ msg: "토큰이 유효하지 않습니다" });
    }
  }
};

export default auth;