import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="#">회사소개</a>
                <a href="#">인재채용</a>
                <a href="#">회원약관</a>
                <a href="#" className="bold-text">개인정보 처리방침</a>
                <a href="#" className="bold-text">이메일 무단수집거부</a>
                <a href="#" className="bold-text">위치기반서비스 이용약관</a>
                <a href="#">채용정보 API</a>
                <a href="#">제휴문의</a>
                <a href="#">고객센터</a>
            </div>
            <div className="footer-info">
                <div className="customer-service">
                    <h2>고객센터 00-0000-0000</h2>
                    <p>(평일 09:00~19:00, 주말·공휴일 휴무)</p>
                </div>
                <p>이메일 : 0000@naver.com, fax : 00-0000-00000(대표), 00-0000-0000(세금계산서)</p>
                <p>현장어때, 우 : 00000, 000 0000 00 00, 대표 : 000</p>
                <p>사업자등록 : 000-00-000000, 직업정보제공사업 : 00 00 0 0000-0호, 통신판매업 : 제 0000-00000호</p>
            </div>
            <div className="footer-buttons">
                <button>이메일문의</button>
                <button>B</button>
                <button>F</button>
                <button className="footer-cert">사업자정보확인</button>
            </div>
        </footer>
    );
};

export default Footer;
