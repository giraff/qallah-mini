import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ByOtherQuestion = ({req}) => {  
  const history = useHistory();
  // 질문 개수(배열 길이)
  const [qlength, setQLength] = useState(0);
  // 답변 폼
  const [form, setValues] = useState([{answer: ""}]);
  // 현재 페이지에 입력한 input 필드값
  const [answerContent, setAnswerContent] = useState("");
  // 현재 페이지에 표시할 질문
  const [questions, setQuestions] = useState("");
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(parseInt(req.match.params.id));

  // 질문 불러오기 API
  const getQuestionAPI = async (page) => {
    try{
      // 전체 질문 길이 가져오기
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

  // prev, next 버튼 클릭때마다 실행
  const onClickEvent = (e) => {
    const { name } = e.target;
    if(name === "prev") {
      if(currentPage > 1) {
        history.push(`/byother/detail/${currentPage - 1}`);
        setCurrentPage(parseInt(currentPage) - 1);
      }
    } else if (name === "next") {
      // 이번껀 저장. +
      if(currentPage < qlength) {
        history.push(`/byother/detail/${currentPage + 1}`);
        if(form.length < currentPage) {
          console.log('form.length가 currentPage보다 작다');
          const arr = [...form];
          console.log(arr);
          setValues([...form, {answer: answerContent}]);
        } else if(currentPage === 1 && form.length === 1) {
          console.log('form.length도 1, currentPage도 1이다');
          setValues([{answer: answerContent}])
          console.log([...form]);
        }
        setCurrentPage(currentPage + 1);
      }
    } else if (name === "finish") {
      setValues([...form, {answer: answerContent}])
      console.log(form)
      history.push('/byother/done');
    }
    setAnswerContent("")
  }

  // 인풋 필드 변경할 때마다 실행
  const onChange = (e) => {
    const {value} = e.target;
    setAnswerContent(value);
  }

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
                <input value={answerContent === "" ? "" : answerContent} onChange={onChange} placeholder="답변을 입력해주세요"></input>
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