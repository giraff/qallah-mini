import axios from 'axios';
import React, { useEffect } from 'react';
// import useScript from 'hooks/useScript';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EXPERIENCE_LOAD_REQUEST } from 'redux/types';

const experienceMain = () => {
    const dispatch = useDispatch();
    const { userName } = useSelector(state => state.auth);
    const { experience } = useSelector(state => state.experience);

    useEffect(() => {
        const token = localStorage.getItem('token');
        dispatch({
            type: EXPERIENCE_LOAD_REQUEST,
            payload: token,
        });
    }, []);

    useEffect(() => {
        const dataObject = {
            timeline: {
                headline: 'The Main Timeline Headline Goes here',
                type: 'default',
                date: [
                    {
                        startDate: '2011,12,10',
                        headline: 'Headline Goes Here22',
                        text: 'Hello EveryOne',
                        classname: 1,
                    },
                ],
                era: [
                    {
                        startDate: '2011,12,10',
                        endDate: '2011,12,11',
                        headline: 'Headline Goes Here33',
                    },
                ],
            },
        };

        const script = document.createElement('script');
        console.log(script);
        script.text = `
      $(document).ready(() => {
        createStoryJS({
            type: 'timeline',
            width: '100%',
            height: '700',
            source: ${JSON.stringify(dataObject)},
            embed_id: 'timeline-embed',
        });
      });`;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [experience]);

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
