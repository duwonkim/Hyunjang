import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from './AuthContext';
import './Login.css';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const handleLogin = async (e) => {
    console.log(e.target.value);
    e.preventDefault();
    const url = isCompany ? 'http://localhost:5001/api/company-login' : 'http://localhost:5001/api/user-login';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password })
      });

      if (!response.ok) {
        const result = await response.json();
        alert(`로그인 실패: ${result.error}`);
      } else {
        const result = await response.json();
        alert('로그인 성공');
        console.log('Received token:', result.token); // 콘솔에 토큰 출력
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('user', JSON.stringify(result.user)); // 사용자 정보 저장
        dispatch({ type: 'LOGIN', payload: result.user });
        navigate('/');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src="/path/to/albamon-logo.png" alt="알바몬 로고" />
        <img src="/path/to/jobkorea-logo.png" alt="잡코리아 로고" />
      </div>
      <div className="login-form">
        <div className="tabs">
          <button className={!isCompany ? 'active' : ''} onClick={() => setIsCompany(false)}>개인회원</button>
          <button className={isCompany ? 'active' : ''} onClick={() => setIsCompany(true)}>기업회원</button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="user-id">아이디(기업로그인시 id는 기업이름입니다)</label>
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
                type="checkbox" checked={rememberId}
                onChange={(e) => setRememberId(e.target.checked)}
              />
              아이디 저장
            </label>
            <div className="ip-security">
              <label>IP 보안</label>
              <input type="checkbox" />
            </div>
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>
        <div className="help-links">
          <a href="/find-id">아이디 찾기</a>
          <span>|</span>
          <a href="/find-password">비밀번호 찾기</a>
          <span>|</span>
          <a href="/dea2">회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
