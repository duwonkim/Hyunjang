import React, { useState, useEffect } from 'react';
import './MainPage.css'; // 스타일을 위한 CSS 파일 import

const MainPage = () => {
    const postsData = [
        { title: '글 제목 1', price: '100,000원', date: '2024-05-01', location: '서울', jobType: 'a' },
        { title: '글 제목 2', price: '150,000원', date: '2024-05-02', location: '부산', jobType: 'b' },
        { title: '글 제목 3', price: '120,000원', date: '2024-05-03', location: '인천', jobType: 'c' },
        { title: '글 제목 4', price: '130,000원', date: '2024-05-04', location: '대전', jobType: 'd' },
        { title: '글 제목 5', price: '110,000원', date: '2024-05-05', location: '광주', jobType: 'e' },
        { title: '글 제목 6', price: '115,000원', date: '2024-05-06', location: '울산', jobType: 'f' },
        { title: '글 제목 7', price: '140,000원', date: '2024-05-07', location: '수원', jobType: 'g' },
        { title: '글 제목 8', price: '160,000원', date: '2024-05-08', location: '성남', jobType: 'a' },
        { title: '글 제목 9', price: '170,000원', date: '2024-05-09', location: '고양', jobType: 'b' },
        { title: '글 제목 10', price: '180,000원', date: '2024-05-10', location: '용인', jobType: 'c' },
        { title: '글 제목 11', price: '190,000원', date: '2024-05-11', location: '창원', jobType: 'd' },
        { title: '글 제목 12', price: '200,000원', date: '2024-05-12', location: '부천', jobType: 'e' },
        { title: '글 제목 13', price: '210,000원', date: '2024-05-13', location: '안산', jobType: 'f' },
        { title: '글 제목 14', price: '220,000원', date: '2024-05-14', location: '남양주', jobType: 'g' },
        { title: '글 제목 15', price: '230,000원', date: '2024-05-15', location: '천안', jobType: 'a' },
        { title: '글 제목 16', price: '240,000원', date: '2024-05-16', location: '전주', jobType: 'b' },
        { title: '글 제목 17', price: '250,000원', date: '2024-05-17', location: '대구', jobType: 'c' }
    ];

    const postsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedPosts, setSortedPosts] = useState([...postsData]);

    useEffect(() => {
        renderPosts();
    }, [currentPage, sortedPosts]);

    const renderPosts = () => {
        const postContainer = document.getElementById('posts');
        if (postContainer) {
            postContainer.innerHTML = '';

            const start = (currentPage - 1) * postsPerPage;
            const end = start + postsPerPage;
            const paginatedPosts = sortedPosts.slice(start, end);

            paginatedPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>직종: ${getJobType(post.jobType)}</p>
                    <p>단가: ${post.price}</p>
                    <p>날짜: ${post.date}</p>
                    <p>근무 위치: ${post.location}</p>
                `;
                postElement.addEventListener('click', () => {
                    window.location.href = 'view.html';
                });
                postContainer.appendChild(postElement);
            });

            document.getElementById('prev').disabled = currentPage === 1;
            document.getElementById('next').disabled = end >= sortedPosts.length;
            renderPageNumbers();
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage * postsPerPage < sortedPosts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbersContainer = document.getElementById('pageNumbers');
        if (pageNumbersContainer) {
            pageNumbersContainer.innerHTML = '';
            const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.innerText = i;
                pageButton.onclick = () => goToPage(i);
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }
                pageNumbersContainer.appendChild(pageButton);
            }
        }
    };

    const sortByDate = () => {
        const sorted = [...postsData].sort((a, b) => new Date(a.date) - new Date(b.date));
        setSortedPosts(sorted);
        setCurrentPage(1);
    };

    const sortByPrice = () => {
        const sorted = [...postsData].sort((a, b) => {
            const priceA = parseInt(a.price.replace(/,/g, ''));
            const priceB = parseInt(b.price.replace(/,/g, ''));
            return priceB - priceA;
        });
        setSortedPosts(sorted);
        setCurrentPage(1);
    };

    const filterByDate = () => {
        const selectedDate = document.getElementById('datePicker').value;
        const filtered = postsData.filter(post => post.date === selectedDate);
        setSortedPosts(filtered);
        setCurrentPage(1);
    };

    const sortByRecent = () => {
        const sorted = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date));
        setSortedPosts(sorted);
        setCurrentPage(1);
    };

    const filterByJob = () => {
        const selectedJob = document.getElementById('jobType').value;
        if (selectedJob === "") {
            setSortedPosts([...postsData]);
        } else {
            const filtered = postsData.filter(post => post.jobType === selectedJob);
            setSortedPosts(filtered);
        }
        setCurrentPage(1);
    };

    const getJobType = (jobType) => {
        switch (jobType) {
            case 'a': return '배관';
            case 'b': return '전기';
            case 'c': return '용접';
            case 'd': return '안전관리자';
            case 'e': return '벽지';
            case 'f': return '기타';
            case 'g': return '신호수';
            default: return '';
        }
    };

    return (
        <div>
            <header>
                <h1>현장 찾기</h1>
            </header>

            <div className="container">
                <div className="sorting">
                    <button onClick={sortByRecent}>최신 순</button>
                    <button onClick={sortByDate}>가까운 거리 순</button>
                    <button onClick={sortByPrice}>높은 단가 순</button>
                </div>
                근무 날짜 선택
                <input type="date" id="datePicker" onChange={filterByDate} />
                <br />
                직종 선택
                <select id="jobType" onChange={filterByJob}>
                    <option value="">전체</option>
                    <option value="a">배관</option>
                    <option value="b">전기</option>
                    <option value="c">용접</option>
                    <option value="d">안전관리자</option>
                    <option value="e">벽지</option>
                    <option value="f">기타</option>
                    <option value="g">신호수</option>
                </select>
                <div id="posts"></div>
                <div className="pagination">
                    <button id="prev" onClick={prevPage}>이전</button>
                    <div id="pageNumbers"></div>
                    <button id="next" onClick={nextPage}>다음</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
