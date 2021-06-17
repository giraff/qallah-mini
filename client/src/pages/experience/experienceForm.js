import React from 'react';
import ExperienceForm from '../../components/experience/ExperienceForm';

const experienceForm = () => (
    // 날짜, 주제, 첨부파일, 링크 등 제목, 내용 적고 저장 하면 저장되고 구글 스프레드 시트에 띄워짐
    <section className="sections">
        <div className="sections-overlay">
            <div className="expr-wrap">
                {/* <div className="expr-elem expr-header">나의 경험</div> */}
                <ExperienceForm />
            </div>
        </div>
    </section>
);

export default experienceForm;
