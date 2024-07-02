import React from 'react';
import './ViewPost.css'; // 스타일을 위한 CSS 파일 import

const ViewPost = () => {
    // 예시 데이터 - 실제 데이터는 서버에서 가져와서 채워야 합니다.
    const postData = {
        title: '글 제목',
        job: '직종 A',
        price: '100,000원',
        date: '2024-05-01',
        startTime: '09:00',
        endTime: '18:00',
        location: '서울',
        phone: '010-1234-5678',
        people: '3',
        content: '여기에 글의 메인 내용이 들어갑니다.'
    };

    const apply = () => {
        alert("지원이 완료되었습니다!");
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="container">
            <h1 id="post-title">{postData.title}</h1>
            
            <div className="post-detail">
                <label>직종: <span id="post-job">{postData.job}</span></label>
            </div>
            
            <div className="post-detail">
                <label>단가: <span id="post-price">{postData.price}</span></label>
            </div>
            
            <div className="post-detail">
                <label>날짜: <span id="post-date">{postData.date}</span></label>
            </div>
            
            <div className="post-detail">
                <label>근무 시작 시간: <span id="post-start-time">{postData.startTime}</span></label>
            </div>
            
            <div className="post-detail">
                <label>근무 종료 시간: <span id="post-end-time">{postData.endTime}</span></label>
            </div>
            
            <div className="post-detail">
                <label>근무 위치: <span id="post-location">{postData.location}</span></label>
            </div>

            <div className="post-detail">
                <label>전화번호: <span id="post-phone">{postData.phone}</span></label>
            </div>

            <div className="post-detail">
                <label>인원수: <span id="post-people">{postData.people}</span></label>
            </div>

            <div className="post-detail">
                <label>메인 내용:</label>
                <p id="post-content">{postData.content}</p>
            </div>

            <div className="buttons">
                <button type="button" onClick={goBack}>뒤로가기</button>
                <button type="button" onClick={apply}>지원하기</button>
            </div>
        </div>
    );
};

export default ViewPost;
