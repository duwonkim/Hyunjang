import React from 'react';
import './Announcements.css'; // 스타일을 위한 CSS 파일 import

const Announcements = () => {
    const announcements = [
        { category: '공지사항', title: '현장어때 제트 상품 부분 유료화 안내', date: '2024-05-28', views: 6 },
        { category: '공지사항', title: '[현장어때] 이제 보스몬 앱으로 이용하세요!', date: '2024-05-28', views: 5 },
        { category: '공지사항', title: '일반적인 채용공고를 가장한 보이스 피싱 범죄에 주의하세요', date: '2024-05-27', views: 1 },
        { category: '공지사항', title: '채용담당자 연락처로 불법 홍보 전화를 받으시면 신고해주세요.', date: '2022-05-27', views: 0 },
        { category: '공지사항', title: '2024년 최저임금은 시급 9,860원입니다', date: '2023-12-20', views: 180 },
        { category: '공지사항', title: '24년 상반기 사장님 감사 이벤트', date: '2024-02-15', views: 3 },
        { category: '공지사항', title: '휴면해제 사전안내', date: '2024-05-27', views: 5 },
        { category: '공지사항', title: '이력서열람서비스 개편', date: '2024-04-02', views: 9 },
        { category: '공지사항', title: '현장어때 공고등록 상품개편 안내', date: '2024-04-07', views: 13 },
    ];

    return (
        <div className="container">
            <h2>공지사항</h2>
            <table>
                <thead>
                    <tr>
                        <th>분류</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((announcement, index) => (
                        <tr key={index}>
                            <td>{announcement.category}</td>
                            <td>{announcement.title}</td>
                            <td>{announcement.date}</td>
                            <td>{announcement.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Announcements;
