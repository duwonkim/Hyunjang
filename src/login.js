import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from './AuthContext';
import logo from './HP.png';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      userId,
      password
    };

    const endpoint = isCompany ? '/api/company-login' : '/api/user-login';

    try {
      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('로그인 성공');
        // 토큰 저장 및 추가 처리 로직
        localStorage.setItem('token', data.token);
        // AuthContext에 사용자 정보 저장
        login({ userId: data.userId });
        // 홈페이지로 리디렉트
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`로그인 실패: ${errorData.error}`);
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    
    <div className="login-container">
      <div className="login-form">
        
      
        <div className="tabs">
          <button className={!isCompany ? 'active' : ''} onClick={() => setIsCompany(false)}>개인회원</button>
          <button className={isCompany ? 'active' : ''} onClick={() => setIsCompany(true)}>기업회원</button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="user-id">아이디</label>
            <input
              type="text"
              id="user-id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={rememberId}
                onChange={(e) => setRememberId(e.target.checked)}
              />
              아이디 저장
            </label>
            <div className="ip-security">
              <label>IP보안</label>
              <input type="checkbox" />
            </div>
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>
        <div className="help-links">
          <Link to="/find-id">아이디 찾기</Link>
          <span>|</span>
          <Link to="/find-password">비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/member-selection">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
