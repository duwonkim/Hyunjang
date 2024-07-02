import React, { useState, useEffect } from 'react';
import './BulletinBoard.css'; // CSS 파일 import

const BulletinBoard = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        author: '',
        content: ''
    });

    useEffect(() => {
        // Load posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(storedPosts);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: posts.length + 1,
            ...formValues,
            date: new Date().toLocaleDateString(),
            views: 0,
            likes: 0,
            dislikes: 0
        };
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setFormValues({ title: '', author: '', content: '' });
        setShowModal(false);
    };

    const handleDeleteSelected = () => {
        const selectedCheckboxes = document.querySelectorAll('.post-select:checked');
        const selectedIds = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.getAttribute('data-id')));
        const updatedPosts = posts.filter(post => !selectedIds.includes(post.id));
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <div className="bulletin-board">
            <h1>QnA</h1>
            <div className="filters">
                <input type="text" placeholder="전체" />
                <input type="text" placeholder="분류1" />
                <input type="text" placeholder="분류2" />
                <button>검색</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                        <th>조회</th>
                        <th>추천</th>
                        <th>비추천</th>
                    </tr>
                </thead>
                <tbody id="posts-tbody">
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td><input type="checkbox" className="post-select" data-id={post.id} /></td>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.date}</td>
                            <td>{post.views}</td>
                            <td>{post.likes}</td>
                            <td>{post.dislikes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="buttons">
                <button onClick={handleDeleteSelected}>선택삭제</button>
                <button>선택복사</button>
                <button>선택이동</button>
                <button onClick={() => setShowModal(true)}>글쓰기</button>
            </div>

            {showModal && (
                <div id="write-post-modal" className="modal">
                    <div className="modal-content">
                        <h2>새 글쓰기</h2>
                        <form id="post-form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="post-title">제목</label>
                                <input
                                    type="text"
                                    id="post-title"
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="post-author">글쓴이</label>
                                <input
                                    type="text"
                                    id="post-author"
                                    name="author"
                                    value={formValues.author}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="post-content">내용</label>
                                <textarea
                                    id="post-content"
                                    name="content"
                                    rows="10"
                                    value={formValues.content}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">저장</button>
                                <button type="button" onClick={() => setShowModal(false)}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulletinBoard;
