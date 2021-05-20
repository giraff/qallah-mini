// React : view를 만들기 위한 라이브러리
import React from 'react';
// ReactDOM : UI를 브라우저에 렌더링할 때 사용하는 라이브러리
import ReactDOM from 'react-dom';
import App from './App';

// 브라우저에 렌더링하는 도구(ReactDOM)에서 render를 가져와 
// React 규격에 맞추어 <App>을 그려주라는 뜻
// 그때 인자로 넘겨주는 document.getElementById('root') 
// => id가 'root'인 태그 안 쪽에다가 App을 그려라
ReactDOM.render(<App />, document.getElementById('root'));


