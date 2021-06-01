import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BYOTHER_UPLOAD_REQUEST } from '../../redux/types';

// 전역변수 (답변 저장하는 객체)
const answers = [
  {
    answer_seq: 1,
    answer_content: ""
  }
]

const ByOtherQuestion = ({req}) => {  
  const dispatch = useDispatch();
  const history = useHistory();
  // 현재 페이지 번호 (url에 넘어오는 값)
  const [currentPage, setCurrentPage] = useState(parseInt(req.match.params.id));
  /** 질문 관련 state */
  // 질문 총 개수
  const [qlength, setQLength] = useState(0);
  // 현재 페이지에 표시할 질문
  const [questions, setQuestions] = useState("");
  /** 답변 관련 state */
  // 현재 페이지에 입력한 input 필드값
  const [inputData, setInputData] = useState("");
  // input 필드 값이 변경됐는지 여부 (true/false)
  const [inputChange, setInputChange] = useState(false);

  // 질문 불러오기 API
  const getQuestionAPI = async (page) => {
    try{
      // 전체 질문 갯수 가져오기
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
  
  // input 필드 변경할 때마다 실행
  const onChange = (e) => {
    setInputChange(true);
    const {value} = e.target;
    setInputData(value);
  }
  // prev, next 버튼 클릭때마다 실행
  const onClickEvent = (e) => {
    const { name } = e.target;
    // 이미 답변을 저장한 질문인 경우, alreadySaved(flag)는 true가 된다.
    let alreadySaved = false;

    // answers의 각 배열 훑으며 
    answers.forEach((val, idx) => {
      // 해당 질문에 이미 작성한 답변 있다면
      if(inputChange && val.answer_seq === currentPage) {
        alreadySaved = true;
        // 기존 답변 덮어쓰기 
        val.answer_content = inputData
      } 
    })
    
    // 이전에 답변했던 질문이 아닌 경우
    if(inputChange && !alreadySaved) {
      // 새 답변 생성하기
      answers.push({answer_seq : currentPage, answer_content: inputData })
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
      setInputData(answers[currentPage-2] !== undefined ? 
        answers[currentPage-2].answer_content : 
        "");
    } else if (name === "next") {
      // 누른 버튼이 next 
      if(currentPage < qlength) {
        // 다음 질문으로 이동
        history.push(`/byother/detail/${currentPage + 1}`);
        setCurrentPage(currentPage + 1);
        // 예전에 작성해둔 답변이 있다면 다음 질문 페이지 input에 그 답변 표시
        setInputData(answers[currentPage] !== undefined ? 
          answers[currentPage].answer_content : 
          "");
      }
    } else if (name === "finish") {
      // 누른 버튼이 마지막 질문 페이지의 답변 완료 버튼이면
      // 로컬 스토리지에서 토큰 받아오고, 작성한 답변 객체와 함께 객체에 담아 UPLOAD 요청
      const token = localStorage.getItem("token");
      const body = { answers, token };

      dispatch({
        type: BYOTHER_UPLOAD_REQUEST,
        payload: body,
      })
      // 질문 완료 페이지로 이동
      history.push('/byother/done');
      // 답변 객체 초기화 
      answers.splice(0);
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
                      value={inputData === "" ? (answers[currentPage-1] !== undefined ? answers[currentPage - 1].answer_content : ""): inputData} 
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