import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BYOTHER_UPLOAD_REQUEST } from '../../redux/types';

// 전역변수
const answers = []

const ByOtherQuestion = ({req}) => {  
  const dispatch = useDispatch();
  const history = useHistory();
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(parseInt(req.match.params.id));
  /** 질문 관련 state */
  // 질문 총 개수
  const [qlength, setQLength] = useState(0);
  // 현재 페이지에 표시할 질문
  const [questions, setQuestions] = useState("");
  /** 답변 관련 state */
  // input 필드 값
  const [answerContent, setAnswerContent] = useState("");
  // input 필드 값 변경 여부 (true/false)
  const [inputChange, setInputChange] = useState(false);

  // 질문 불러오기 API
  const getQuestionAPI = async (page) => {
    try{
      // 질문 총 개수 가져오기
      const allquestion = await axios.get(`api/byother/detail`);
      setQLength(allquestion.data.length);
      // 각 페이지에 표시할 질문 가져오기
      const res = await axios.get(`api/byother/detail/${page}`);
      return res.status === 200 ? res.data : "error"
    } catch(err) {
      return err;
    }
  }
  // React Hooks : url에 질문 요청 페이지가 변경될 때마다 실행
  useEffect(() => {
    const requestPage = req.match.params.id
    getQuestionAPI(requestPage).then(data => setQuestions(data));
  },[req.match.params.id])
  
  // 인풋 필드 변경할 때마다 실행
  const onChange = (e) => {
    setInputChange(true);
    const {value} = e.target;
    setAnswerContent(value);
  }
  // prev, next 버튼 클릭때마다 실행
  const onClickEvent = (e) => {
    const { name } = e.target;
    // 이미 답변을 저장한 질문인 경우, alreadySaved(flag)는 true가 된다.
    let alreadySaved = false;

    // defaultProps의 각 배열 훑으며 
    answers.forEach((val, idx) => {
      // 해당 질문에 이미 작성한 답변 있다면
      if(inputChange && val.answer_seq === currentPage) {
        alreadySaved = true;
        // 기존 답변 덮어쓰기 
        val.answer_content = answerContent
      } 
    })
    
    // 이전에 답변했던 질문이 아닌 경우
    if(inputChange && !alreadySaved) {
      // 새 답변 생성하기
      answers.push({answer_seq : currentPage, answer_content: answerContent })
    }
    // 모든 답변 세이브가 끝이 나고 inputChange false로 다시 설정
    setInputChange(false)
    // 누른 버튼이 prev 
    if(name === "prev") {
      // 2~끝 페이지인 경우
      if(currentPage > 1) {
        // 1 ~ 끝 페이지 직전 페이지로 이동 (이전 질문으로)
        history.push(`/byother/detail/${currentPage - 1}`);
        setCurrentPage(currentPage - 1);
      }
      // 예전에 작성해둔 답변 있으면, 이전 질문 페이지 input에 그 답변 표시
      setAnswerContent(answers[currentPage-2] !== undefined ? 
        answers[currentPage-2].answer_content : 
        "");
    } else if (name === "next") {
      // 누른 버튼이 next
      if(currentPage < qlength) {
        // 다음 질문으로 이동
        history.push(`/byother/detail/${currentPage + 1}`);
        setCurrentPage(currentPage + 1);
        // 예전에 작성해둔 답변이 있다면 다음 질문 페이지 input에 그 답변 표시
        setAnswerContent(answers[currentPage] !== undefined ? 
          answers[currentPage].answer_content : 
          "");
      }
    } else if (name === "finish") {
      // 누른 버튼이 답변 완료 버튼
      // 로컬 스토리지에서 받아온 토큰을 답변 객체와 같이 UPLOAD 요청으로 보냄
      // const result = [];
      // answers.forEach((val) => {result.push(val);})
      const result = answers.map((val) => val);

      const token = localStorage.getItem("token");
      const body = { result, token };

      dispatch({
        type: BYOTHER_UPLOAD_REQUEST,
        payload: body
      })
      // 질문 완료 페이지로 이동
      history.push('/byother/done');

      answers.splice(0)

    }
  }

  // 이동 버튼 
  const bottomNav = (
    <>
      {currentPage === qlength ? (
          <div>
            <button name="prev" onClick={onClickEvent}>Prev</button>  
            <button name="finish" onClick={onClickEvent}>답변완료</button>
          </div>
        ) : (
          <div>
            <button name="prev" onClick={onClickEvent}>Prev</button>  
            <button name="next" onClick={onClickEvent}>Next</button>
          </div>
        )
      }
    </>
  )

  const Body = (
    <>
      <div>
        {(() => {
          return(
            <div>
              <div>
                <h3>
                  {questions !== "" && questions.other_question_seq}. {questions.other_question_content}
                </h3>
              </div>
              <div>
                <input 
                      value={answerContent === "" ? (answers[currentPage-1] !== undefined ? answers[currentPage - 1].answer_content : ""): answerContent} 
                      onChange={onChange} 
                      placeholder="답변을 입력해주세요">
                </input>
              </div>
              {bottomNav}
            </div>
          )
        })()}     
      </div>
    </>
  )
  
  return (
    <div>
      {Body}
    </div>
  );
}

export default ByOtherQuestion;