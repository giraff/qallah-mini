import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TOME_REQUEST,TOME_ANSWER_RECEIVE_REQUEST } from "../../redux/types";

const QuestionToMeDetail = () => {
    const ToMeObj = useSelector((state) => state.tomedetail.payload);
    const ToMeChk = useSelector((state) => state.tomedetail.isToMe);

    const dispatch = useDispatch();
    

    const [form,setValues] = useState({
        question_seq: 0,
        question_context: "",
        question_answer: "",
        next_button: false,
        prev_button: true
    })

    // 첫 번째 useEffect는 DB에서 질문을 조회하기 위한 것
    useEffect(() => {
        console.log("ToMeDetail Render");
        dispatch({
            type: TOME_REQUEST
        });
        console.log("렌더 종료",ToMeChk);
      }, []);  
    
    // 두 번째 useEffect는 첫 화면에서 첫 질문이 로딩되지 않는 이슈의 해결을 위한 것
    useEffect(() => {
        if(ToMeChk)
        {
            setValues({
                ...form,
                question_context: ToMeObj.data[question_seq].question_content
            });
        } else {
            console.log(ToMeChk)
        }
    }, [ToMeChk]);

    // 첫 번째 useEffect는 DB에서 질문을 조회하기 위한 것
    useEffect(() => {
        console.log("ToMeDetailAnswerReceive Render");
        dispatch({
            type: TOME_ANSWER_RECEIVE_REQUEST
        });
      }, []);  

    const { question_seq, question_context, question_answer } = form;

    const onChange = (e) => {
        const {name, value} = e.target;
        console.log(value);
        setValues({
            ...form,
            question_answer: value
        })
    }
    const next_question = (e) => {
        e.preventDefault();
        setValues({
            ...form,
            question_seq : question_seq + 1,
            question_context : ToMeObj.data[question_seq + 1].question_content,
            question_answer: "",
            next_button: question_seq + 1 == ToMeObj.data.length - 1 ? true : false,
            prev_button: false
        })
        console.log("다음질문", form);

    }

    const prev_question = (e) => {
        e.preventDefault();
        setValues({
            ...form,
            question_seq : question_seq - 1,
            question_context : ToMeObj.data[question_seq - 1].question_content,
            question_answer: "",
            next_button: false,
            prev_button: question_seq - 1 == 0 ? true : false
        })
        console.log("이전질문", form);

    }
 
    return (
        <form>
            <div>{form.question_seq+1}. {form.question_context}</div><br/>
            <input onChange={onChange}  value={form.question_answer} placeholder="답변을 입력해 주세요"></input>
            <button onClick={next_question} disabled={form.next_button}>Next</button>
            <button onClick={prev_question} disabled={form.prev_button}>Prev</button>
        </form>
    );
};

export default QuestionToMeDetail;