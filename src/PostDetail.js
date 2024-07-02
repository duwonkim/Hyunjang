import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/api/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('데이터 불러오기 중 오류 발생:', error));
  }, [id]);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  const goBack = () => {
    navigate(-1);
  };

  const apply = () => {
    alert('지원이 완료되었습니다!');
  };

  return (
    <div className="container">
      <h1 id="post-title">{post.title}</h1>

      <div className="post-detail">
        <label>직종: <span id="post-job">{post.job_category}</span></label>
      </div>

      <div className="post-detail">
        <label>단가: <span id="post-price">{post.rate}원</span></label>
      </div>

      <div className="post-detail">
        <label>날짜: <span id="post-date">{post.date}</span></label>
      </div>

      <div className="post-detail">
        <label>근무 시작 시간: <span id="post-start-time">{post.start_time}</span></label>
      </div>

      <div className="post-detail">
        <label>근무 종료 시간: <span id="post-end-time">{post.end_time}</span></label>
      </div>

      <div className="post-detail">
        <label>근무 위치: <span id="post-location">{post.location}</span></label>
      </div>

      <div className="post-detail">
        <label>전화번호: <span id="post-phone">{post.phone_number}</span></label>
      </div>

      <div className="post-detail">
        <label>인원수: <span id="post-people">{post.personnel}</span></label>
      </div>

      <div className="post-detail">
        <label>메인 내용:</label>
        <p id="post-content">{post.description}</p>
      </div>

      <div className="buttons">
        <button type="button" onClick={goBack}>뒤로가기</button>
        <button type="button" onClick={apply}>지원하기</button>
      </div>
    </div>
  );
};

export default PostDetail;
