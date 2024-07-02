import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import logo from './HP.png'; // 이미지 파일을 import
import { Link, useNavigate } from 'react-router-dom'; // Link import

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 상태 확인 (예: 로컬 스토리지에 토큰이 있는지 확인)
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleMouseEnter = (index) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveMenu(index);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 250); // 0.25초 동안 유지
    };

    const handleLogout = () => {
        // 로그아웃 처리 (예: 토큰 제거)
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/login'); // 로그인 페이지로 이동
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
                                <a href="./WritePost">인부모집</a>
                            </li>
                            <li
                                onMouseEnter={() => handleMouseEnter(1)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <a href="./du">현장 찾기</a>
                                {activeMenu === 1 && (
                                    <div className="menu_pan">
                                        <div className="menu_category">
                                            <div className="category1"> &nbsp;특별시 &nbsp; &gt;</div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">서울</a></div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category1"> &nbsp;광역시 &nbsp; &gt;</div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">인천</a></div>
                                            <div className="category"><a href="./categoryPage.html">부산</a></div>
                                            <div className="category"><a href="./categoryPage.html">대전</a></div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">광주</a></div>
                                            <div className="category"><a href="./categoryPage.html">대구</a></div>
                                            <div className="category"><a href="./categoryPage.html">울산</a></div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category1"> &nbsp;도 &nbsp; &gt;</div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">경기도</a></div>
                                            <div className="category"><a href="./categoryPage.html">강원도</a></div>
                                            <div className="category"><a href="./categoryPage.html">충청북도</a></div>
                                            <div className="category"><a href="./categoryPage.html">충청남도</a></div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">전라북도</a></div>
                                            <div className="category"><a href="./categoryPage.html">전라남도</a></div>
                                            <div className="category"><a href="./categoryPage.html">경상북도</a></div>
                                            <div className="category"><a href="./categoryPage.html">경상남도</a></div>
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <a href="./amin8">커뮤니티</a>
                                {activeMenu === 2 && (
                                    <div className="menu_pan">
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">경험및 리뷰</a></div>
                                            <div className="category"><a href="./categoryPage.html">한줄톡</a></div>
                                            <div className="category"><a href="./categoryPage.html">면족보</a></div>
                                            <div className="category"><a href="./categoryPage.html">알바후기</a></div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">최신글</a></div>
                                            <div className="category"><a href="./categoryPage.html">인기글</a></div>
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li
                                onMouseEnter={() => handleMouseEnter(3)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <a href="./categoryPage.html">회원서비스</a>
                                {activeMenu === 3 && (
                                    <div className="menu_pan">
                                        <div className="menu_category">
                                            <div className="category1"> &nbsp;개인 서비스 &nbsp; &gt;</div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">이력서 관리</a></div>
                                            <div className="category"><a href="./categoryPage.html">이력서 양식</a></div>
                                            <div className="category"><a href="./categoryPage.html">임금정산하기</a></div>
                                            <div className="category"><a href="./categoryPage.html">근로계약서 보기</a></div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category1"> &nbsp;기업 서비스 &nbsp; &gt;</div>
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./categoryPage.html">공고 관리</a></div>
                                            <div className="category"><a href="./categoryPage.html">공고 등록</a></div>
                                            <div className="category"><a href="./categoryPage.html">근로계약서 보기</a></div>
                                            <div className="category"><a href="./categoryPage.html">급여명세서 보기</a></div>
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li
                                onMouseEnter={() => handleMouseEnter(4)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <a href="./amin4">고객센터</a>
                                {activeMenu === 4 && (
                                    <div className="menu_pan">
                                        <div className="menu_category">
                                            <div className="category"><a href="./amin4">회사개요</a></div>
                                            <div className="category"><a href="./amin7">공지사항</a></div>
                                            <div className="category"><a href="./amin5">FAQ</a></div>
                                            <div className="category"><a href="./categoryPage.html">문의/제안</a></div>
                                            <div className="category"><Link to="/amin">이용약관</Link></div> {/* 수정된 링크 */}
                                        </div>
                                        <div className="menu_category">
                                            <div className="category"><a href="./amin6">개인정보처리방침</a></div>
                                            <div className="category"><a href="./amin3">게시물삭제규정</a></div>
                                            <div className="category"><a href="./categoryPage.html">위치기반서비스이용약관</a></div>
                                            <div className="category"><a href="./categoryPage.html">버그신고</a></div>
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
                {isLoggedIn ? (
                    <>
                        <Link to="/myinfo">나의 정보</Link>
                        <button onClick={handleLogout}>로그아웃</button>
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
