import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { EXPERIENCE_UPLOAD_REQUEST, EXPR_CLEAR_ERROR_REQUEST } from 'redux/types';

const ExperienceForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [localMsg, setLocalMsg] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { errorMsg, isUploaded } = useSelector(state => state.experience);
    const [form, setValues] = useState({
        headline: '',
        text: '',
        startDate: '',
        endDate: '',
    });
    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({
            type: EXPR_CLEAR_ERROR_REQUEST,
        });
        setValues({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const token = localStorage.getItem('token');
        const { headline, text, startDate, endDate } = form;

        const body = { headline, text, startDate, endDate, token };

        dispatch({
            type: EXPERIENCE_UPLOAD_REQUEST,
            payload: body,
        });
        // history.push('/experience/done');
    };

    useEffect(() => {
        console.log('errorMsg => ', errorMsg);
        console.log('isUploaded => ', isUploaded);
    }, [errorMsg, isUploaded]);

    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
            if (isUploaded) history.push('/experience/done');
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg, isUploaded]);

    useEffect(() => {
        dispatch({
            type: EXPR_CLEAR_ERROR_REQUEST,
        });
    }, [dispatch, history.location]);

    const handleChecked = event => {
        console.log('기간 체크 => ', isChecked);
        setIsChecked(event.target.checked);
    };

    return (
        <form className="expr-elem expr-content lang-kor">
            <div className="expr-headline ">
                <i className="fas fa-bars" /> 제목*
                <input
                    className="input-field"
                    name="headline"
                    id="headline"
                    type="text"
                    placeholder="title"
                    autoComplete="off"
                    onChange={handleChange}
                />
            </div>
            <div className="expr-text">
                <i className="fas fa-bars" /> 세부내용
                <textarea className="input-field" name="text" id="text" cols="100%" rows="5" onChange={handleChange} />
            </div>
            <div className="expr-date">
                <i className="fas fa-bars" /> 날짜*
                <div className="input-field date-input">
                    <input type="date" name="startDate" id="startDate" onChange={handleChange} />
                    {isChecked ? (
                        <div>
                            ~
                            <input type="date" name="endDate" id="endDate" onChange={handleChange} />
                        </div>
                    ) : null}
                    <input type="checkbox" checked={isChecked} onChange={handleChecked} /> 기간
                </div>
            </div>
            {/* <div className="expr-theme">
                <div className="lang-kor">
                    <i className="fas fa-bars" /> 주제
                </div>
                <div className="input-field theme theme-input">
                    <input className="input-field lang-kor" type="text" placeholder="#을 이용하여 태그를 작성하세요!" onChange={e => onChange(e)} />
                </div>
            </div> */}
            {/* <div className="expr-file">
                <div className="lang-kor">
                    <i className="fas fa-bars" /> 첨부파일
                </div>
                <div className="file-wrapper">
                    <div
                        className="file-input"
                        onClick={() => console.log('file1')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => console.log('file1')}
                    >
                        <i className="fas fa-plus" />
                    </div>
                    <div
                        className="file-input"
                        onClick={() => console.log('file2')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => console.log('file2')}
                    >
                        <i className="fas fa-plus" />
                    </div>
                    <div
                        className="file-input"
                        onClick={() => console.log('file3')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => console.log('file3')}
                    >
                        <i className="fas fa-plus" />
                    </div>
                    <div
                        className="file-input"
                        onClick={() => console.log('file4')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => console.log('file4')}
                    >
                        <i className="fas fa-plus" />
                    </div>
                </div>
            </div> */}
            {/* <div className="expr-link">
                <div className="lang-kor">
                    <i className="fas fa-bars" /> 링크
                </div>
                <div className="input-field link-input">
                    <input className="input-field lang-kor" name="link" id="link" type="text" onChange={e => onChange(e)} />
                </div>
            </div> */}
            {localMsg ? <div style={{ color: 'red' }}>{localMsg}</div> : null}

            <button
                label="submit"
                type="button"
                className="save-btn expr-add-btn"
                onClick={() => {
                    handleSubmit();
                    return false;
                }}
            >
                저장하기
            </button>
        </form>
    );
};

export default ExperienceForm;
