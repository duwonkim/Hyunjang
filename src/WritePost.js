import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritePost.css';

const WritePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    jobType: '',
    price: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    phonePart2: '',
    phonePart3: '',
    numberOfPeople: '1',
    mainContent: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/,/g, '');
    if (!isNaN(value) && value !== '') {
      setFormData({
        ...formData,
        price: parseInt(value).toLocaleString('ko-KR')
      });
    } else {
      setFormData({
        ...formData,
        price: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      phone_number: `010-${formData.phonePart2}-${formData.phonePart3}`,
      title: formData.title,
      job_category: formData.jobType,
      rate: formData.price.replace(/,/g, ''),
      date: formData.date,
      start_time: formData.startTime,
      end_time: formData.endTime,
      location: formData.location,
      personnel: formData.numberOfPeople,
      description: formData.mainContent
    };

    console.log('Sending data:', postData);  // 디버깅을 위한 로그

    try {
      const response = await fetch('http://localhost:5001/api/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      console.log('Server response:', response);  // 서버 응답 로그 추가

      if (!response.ok) {
        const result = await response.json();
        console.error('글 작성 실패:', result);  // 오류 로그 추가
        alert(`글 작성 실패: ${result.error}`);
      } else {
        alert('글 작성 성공');
        navigate('/');
      }
    } catch (error) {
      console.error('글 작성 중 오류가 발생했습니다:', error);
      alert('글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container">
      <h1>글 작성</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="jobType">직종 선택</label>
        <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} required>
          <option value="">선택하세요</option>
          <option value="배관">배관</option>
          <option value="전기">전기</option>
          <option value="용접">용접</option>
          <option value="안전관리자">안전관리자</option>
          <option value="벽지">벽지</option>
          <option value="기타">기타</option>
          <option value="신호수">신호수</option>
        </select>

        <label htmlFor="price">단가</label>
        <div className="price-input">
          <input type="text" id="price" name="price" value={formData.price} onChange={handlePriceChange} required />
          <span>원</span>
        </div>

        <label htmlFor="date">날짜</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

        <label htmlFor="start-time">근무 시작 시간</label>
        <input type="time" id="start-time" name="startTime" value={formData.startTime} onChange={handleChange} required />

        <label htmlFor="end-time">근무 종료 시간</label>
        <input type="time" id="end-time" name="endTime" value={formData.endTime} onChange={handleChange} required />

        <label htmlFor="location">근무 위치</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />

        <label htmlFor="phone">전화번호</label>
        <div className="phone-input">
          <input type="text" id="phone-part1" name="phonePart1" value="010" readOnly />
          <span>-</span>
          <input type="text" id="phone-part2" name="phonePart2" value={formData.phonePart2} onChange={handleChange} pattern="[0-9]{4}" required />
          <span>-</span>
          <input type="text" id="phone-part3" name="phonePart3" value={formData.phonePart3} onChange={handleChange} pattern="[0-9]{4}" required />
        </div>

        <label htmlFor="number-of-people">인원수</label>
        <select id="number-of-people" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} required>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <label htmlFor="main-content">메인 내용</label>
        <textarea id="main-content" name="mainContent" rows="10" value={formData.mainContent} onChange={handleChange} required></textarea>

        <div className="buttons">
          <button type="button" onClick={() => window.history.back()}>뒤로가기</button>
          <button type="submit">글 작성</button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
