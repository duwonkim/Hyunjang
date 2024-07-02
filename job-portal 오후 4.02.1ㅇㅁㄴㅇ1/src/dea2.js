import React from 'react';
import { Link } from 'react-router-dom';
import './MemberSelection.css';

function MemberSelection() {
  return (
    <div className="member-selection">
      <h1>현장어때 회원가입을 환영합니다.</h1>
      <div className="selection-container">
        <div className="member-type">
          <img src='/public/image.png' alt="개인회원" />
          <h2>개인회원</h2>
          <p>이력등록하고 레지스트리를 찾아보세요</p>
          <Link to="/join-us" className="join-button personal">개인회원 가입</Link>
          <div className="social-icons">
            <img src="naver-icon-url" alt="네이버" />
            <img src="kakao-icon-url" alt="카카오" />
            <img src="facebook-icon-url" alt="페이스북" />
            <img src="google-icon-url" alt="Google" />
            <img src="apple-icon-url" alt="Apple" />
          </div>
        </div>
        <div className="member-type">
          <img src="/public/company-image.png" alt="기업회원" />
          <h2>기업회원</h2>
          <p>공고를 등록하고 플레이어를 찾아보세요</p>
          <Link to="/dea3" className="join-button company">기업회원 가입</Link>
        </div>
      </div>
      <div className="existing-member">
        <p>이미 가입하신 분은 아이디와 설명으로 로그인하세요.</p>
        <Link to="/login" className="login-button">통합회원 로그인</Link>
      </div>
    </div>
  );
}

export default MemberSelection;
