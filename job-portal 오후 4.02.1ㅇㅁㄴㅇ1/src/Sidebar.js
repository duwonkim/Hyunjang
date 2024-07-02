import React, { useEffect, useState } from 'react';
import { Home, Users, HelpCircle, Settings } from 'react-feather';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Sidebar.css';

const Sidebar = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate(); // useNavigate 훅 사용
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleLogin = () => navigate('/amin4'); // 페이지 이동
  const handleSignup = () => navigate('/amin4'); // 페이지 이동
  const handleNotice = () => navigate('/amin7'); // 페이지 이동
  const handleSettings = () => navigate('/settings'); // 페이지 이동

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="sidebar" style={{ top: `calc(9.5% + ${scrollY * 0.1}px)` }}>
      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <button className="sidebar__link" onClick={scrollToTop}>
            <Home />
            <span>홈으로</span>
          </button>
        </li>
        <li className="sidebar__item">
          <button className="sidebar__link" onClick={handleLogin}>
            <Users />
            <span>회사개요</span>
          </button>
        </li>
        <li className="sidebar__item">
          <button className="sidebar__link" onClick={handleNotice}>
            <HelpCircle />
            <span>공지사항</span>
          </button>
        </li>
        <li className="sidebar__item">
          <button className="sidebar__link" onClick={handleSettings}>
            <Settings />
            <span>정보 설정</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
