import React from "react";
import { Link } from "react-router-dom";

const QuestiontomeMain = () => {
    return (
        <section className="sections">
          <div className="sections-overlay">
            <div className="q-main-container">
              <div className="q-main-title">
                <h1>내가 보는 나</h1>
              </div>
              <div className="q-main-content">
                <div>예상 소요 시간 : 20분 ~ 1시간</div>
                <div>질문 수 : 20</div>
                <div>'나' 자신에게 질문하는 시간을 가져보세요.</div>
              </div>
              <div className="q-main-nav">
                <div className="link-start">
                  <Link to="/tome/detail">
                    <i className="fas fa-play fa-2x"></i>
                      {/* <button>시작 하기</button> */}  
                  </Link>
                  <label>시작하기</label>
                </div>
                <div className="link-history">
                  <Link to="/tome/history">
                    <i className="fas fa-history fa-2x"></i>
                      {/* <button>이전 답변보기</button> */}
                  </Link>
                  <label>이전답변</label>
                </div>
                <div className="link-home">
                  <Link to="../">
                    <i className="fas fa-home fa-2x"></i>
                      {/* <button>홈으로 돌아가기</button> */}
                  </Link>
                  <label>메인홈</label>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};

export default QuestiontomeMain;