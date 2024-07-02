import React, { useState, useRef } from 'react';
import './Header.css';
import logo from './HP.png';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 250);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="어떤 알바를 찾으세요?" />
        <button>검색</button>
      </div>
      <div className="nav">
        <div className="w_1350">
          <div className="h_L">
            <ul className="h_menu">
              <li
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/writepost">인부모집</Link>
              </li>
              <li
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/du">현장 찾기</Link>
                
              </li>
              <li
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/amin8">커뮤니티</Link>
                {activeMenu === 2 && (
                  <div className="menu_pan">
                    <div className="menu_category">
                      <div className="category"><Link to="/categoryPage.html">경험및 리뷰</Link></div>
                      <div className="category"><Link to="/categoryPage.html">한줄톡</Link></div>
                      <div className="category"><Link to="/categoryPage.html">면족보</Link></div>
                      <div className="category"><Link to="/categoryPage.html">알바후기</Link></div>
                    </div>
                    <div className="menu_category">
                      <div className="category"><Link to="/categoryPage.html">최신글</Link></div>
                      <div className="category"><Link to="/categoryPage.html">인기글</Link></div>
                    </div>
                  </div>
                )}
              </li>
              <li
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/dea7">회원서비스</Link>
                {activeMenu === 3 && (
                  <div className="menu_pan">
                    <div className="menu_category">
                    
                    </div>
                    <div className="menu_category">
                    <div className="category"><Link to="/dea5">이력서 작성</Link></div>
                      <div className="category"><Link to="/dea4">이력서 관리</Link></div>
                      <div className="category"><Link to="/categoryPage.html">임금정산하기</Link></div>
                      <div className="category"><Link to="/dea6">근로계약서 보기</Link></div>
                    </div>
                    <div className="menu_category">
                    </div>
                    
                  </div>
                )}
              </li>
              <li
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/amin4">고객센터</Link>
                {activeMenu === 4 && (
                  <div className="menu_pan">
                    <div className="menu_category">
                      <div className="category"><Link to="/amin4">회사개요</Link></div>
                      <div className="category"><Link to="/amin7">공지사항</Link></div>
                      <div className="category"><Link to="/amin5">FAQ</Link></div>
                      <div className="category"><Link to="/amin">이용약관</Link></div>
                    </div>
                    <div className="menu_category">
                      <div className="category"><Link to="/amin6">개인정보처리방침</Link></div>
                      <div className="category"><Link to="/amin3">게시물삭제규정</Link></div>
                    </div>
                  </div>
                )}
              </li>
              <li className="bar"></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="user-options">
        {user ? (
          <>
            <span>{user.userId}반갑습니다</span>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/dea2">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
