/**server.js */

const express = require('express'); // http 모듈 처럼 사용할 수 있지만 훨씬 많은 기능을 가진 외부 모듈
const path = require('path'); // 파일 및 디렉토리 경로 작업을 위한 utility 제공 모듈
const router = require('./router'); // 라우터 파일 임포트
var morgan = require('morgan'); // 웹 요청이 들어왔을 때 로그 출력
var cors = require('cors'); // CORS 이슈 다루기
var helmet = require('helmet'); // http 헤더 설정을 자동으로 바꾸어 잘 알려진 앱 취약성으로부터 앱 보호하는 패키지
var hpp = require('hpp'); // http 매개변수 공격으로부터 보호하기 위한 express 미들웨어

import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';

const app = express();

// env에 저장한 PORT 정보 가져오기
import config from './config/index';
const { PORT } = config;

app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use(cors()); // 모든 도메인에 대한 request 활성화 -> 좋지 않은 방식
/** ex. products/:id에 대한 url 라우팅, 즉 특정 도메인에만 cors를 허용하는게 이상적
 * 
 * app.get('/products/:id', cors(), function(req, res, next) {
 *    res.json({msg:'this is CORS-enabled for a single Route'});
 * })
 */
app.use(morgan('combined'));
app.use(helmet());
app.use(hpp());
// '/'로 시작되는 모든 요청은 router.js로 넘겨주겠다는 의미

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

//7000번 서버 포트로 서버 요청 받는다.
app.listen(PORT, () => {
  console.log(`Check out the app at http://localhost:${PORT}`);
});
