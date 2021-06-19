import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { EXPERIENCE_UPLOAD_REQUEST } from 'redux/types';

const ExperienceForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [form, setValues] = useState({
        headline: '',
        text: '',
        startdate: '',
    });
    const onChange = e => {
        const { name, value } = e.target;
        setValues({
            ...form,
            [name]: value,
        });
    };
    const onSubmit = () => {
        const token = localStorage.getItem('token');
        const { headline, text, startdate } = form;
        const body = { headline, text, startdate, token };

        dispatch({
            type: EXPERIENCE_UPLOAD_REQUEST,
            payload: body,
        });

        history.push('/experience/done');
    };

    useEffect(() => {
        console.log(form);
    }, []);

    return (
        <form className="expr-elem expr-content" onSubmit={e => onSubmit(e)}>
            <div className="expr-headline">
                <input className="input-field lang-kor" name="headline" id="headline" type="text" onChange={e => onChange(e)} />
            </div>
            <div className="expr-text">
                <textarea className="input-field lang-kor" name="text" id="text" cols="100%" rows="5" onChange={e => onChange(e)} />
            </div>
            <div className="expr-date">
                <div className="lang-kor">
                    <i className="fas fa-bars" /> 날짜
                </div>
                <div className="input-field date-input">
                    <i className="fas fa-trash" />
                    <input type="date" name="startdate" id="startdate" onChange={e => onChange(e)} />
                    <input type="checkbox" /> 기간
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
            <input className="save-btn expr-add-btn lang-kor" type="submit" value="저장하기" />
        </form>
    );
};

export default ExperienceForm;
