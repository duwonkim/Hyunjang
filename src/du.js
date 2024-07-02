import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
    const [postsData, setPostsData] = useState([]);
    const postsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedPosts, setSortedPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5001/api/posts')
            .then(response => response.json())
            .then(data => {
                setPostsData(data);
                setSortedPosts(data);
            })
            .catch(error => console.error('데이터 불러오기 중 오류 발생:', error));
    }, []);

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
                    <p>직종: ${getJobType(post.job_category)}</p>
                    <p>단가: ${post.rate}원</p>
                    <p>날짜: ${post.date}</p>
                    <p>근무 위치: ${post.location}</p>
                `;
                postElement.addEventListener('click', () => {
                    navigate(`/post/${post.phone_number}`);
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
            const priceA = parseInt(a.rate);
            const priceB = parseInt(b.rate);
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
            const filtered = postsData.filter(post => post.job_category === selectedJob);
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
