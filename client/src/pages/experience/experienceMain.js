import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EXPERIENCE_LOAD_REQUEST } from 'redux/types';

let script = null;
const experienceMain = () => {
    const { userName } = useSelector(state => state.auth);
    const { isUploaded } = useSelector(state => state.experience);
    const dispatch = useDispatch();
    useEffect(async () => {
        const token = localStorage.getItem('token');
        dispatch({
            type: EXPERIENCE_LOAD_REQUEST,
            payload: token,
        });
        console.log('Main에서의 isUploaded', isUploaded);
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        const result = await axios.get('api/experience', config);

        const ObjectArray = [];
        const eraArray = [];
        if (result.data.length === 0) {
            ObjectArray.push({
                headline: 'The Main Timeline Headline Goes here',
                startDate: '0000,00,00',
                text: '경험을 추가해주세요',
            });
        } else {
            result.data.forEach(val => {
                if (val.endDate === '0000,00,00') {
                    ObjectArray.push({
                        startDate: `${val.startDate}`,
                        headline: `${val.headline}`,
                        classname: `${val.classname}`,
                        text: `${val.text}`,
                    });
                    // eraArray.push({
                    //     startDate: `${val.startDate}`,
                    //     headline: `${val.headline}`,
                    //     text: `${val.text}`,
                    // });
                } else {
                    ObjectArray.push({
                        startDate: `${val.startDate}`,
                        endDate: `${val.endDate}`,
                        headline: `${val.headline}`,
                        classname: `${val.classname}`,
                        text: `${val.text}`,
                    });
                    // eraArray.push({
                    //     startDate: `${val.startDate}`,
                    //     endDate: `${val.endDate}`,
                    //     headline: `${val.headline}`,
                    //     text: `${val.text}`,
                    // });
                }
            });
        }

        console.log(ObjectArray);
        const dataObject = {
            timeline: {
                headline: '표지',
                type: 'default',
                text: 'hi!',
                date: ObjectArray,
            },
        };

        console.log(dataObject);
        script = document.createElement('script');

        console.log(document);
        script.text = `
          $(document).ready(() => {
            createStoryJS({
                type: 'timeline',
                width: '100%',
                height: '700',
                lang:'ko',
                font:'PlayfairDisplay-Muli',
                start_zoom_adjust:'0',	
                start_at_end: true,
                source: ${JSON.stringify(dataObject)},
                embed_id: 'timeline-embed',
            });
          });`;
        if (script !== null) document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section className="sections">
            <div className="sections-overlay">
                <div className="exp-container">
                    <div className="exp-header">
                        <h1>{`"${userName}"`}님의 경험</h1>
                    </div>
                    <div className="exp-content">
                        <div id="timeline-embed" />
                        <script type="text/javascript" src="https://cdn.knightlab.com/libs/timeline/latest/js/storyjs-embed.js" />
                    </div>
                    <div className="exp-footer">
                        <div className="exp-start">
                            <Link className="exp-button" to="/experience/form">
                                경험 추가
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default experienceMain;
