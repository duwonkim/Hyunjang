import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ResumeManagement.module.css';

function ResumeManagement() {
  const [resumes] = useState([
    {
      title: '센스 있고 적응력 좋은 인재입니다.',
      modifiedDate: '2023-05-21',
      description: '서비스 기타, 놀이공원·테마파크, 백화점·쇼핑몰',
    },
    {
      title: '성실하게 잘합니다.',
      modifiedDate: '2023-06-15',
      description: '전단지배포, 서빙, 캐셔·카운터, 편의점',
    },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  const handleNewResume = () => {
    navigate('/dea5'); // 새 이력서 작성 페이지로 이동
  };

  const setRelativeDate = (amount, unit, type) => {
    const newDate = new Date();
    if (type === 'start') {
      if (unit === 'year') newDate.setFullYear(newDate.getFullYear() + amount);
      if (unit === 'month') newDate.setMonth(newDate.getMonth() + amount);
      if (unit === 'week') newDate.setDate(newDate.getDate() + amount * 7);
      setStartDate(newDate);
    } else {
             if (unit === 'year') newDate.setFullYear(newDate.getFullYear() + amount);
      if (unit === 'month') newDate.setMonth(newDate.getMonth() + amount);
      if (unit === 'week') newDate.setDate(newDate.getDate() + amount * 7);
      setEndDate(newDate);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>이력서 관리</h1>
      <p className={styles.info}>
        이력서는 최대 6개까지 등록할 수 있습니다. 지원 후 수정한 이력서 내용(회원정보 제외)은 지원한 이력서에는 반영되지 않습니다.
      </p>
      <div className={styles.datePickerContainer}>
        <div className={styles.datePickers}>
          <div className={styles.datePicker}>
            <label className={styles.dateLabel}>시작일:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy.MM.dd"
              className={styles.dateInput}
            />
          </div>
          <div className={styles.datePicker}>
            <label className={styles.dateLabel}>종료일:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy.MM.dd"
              className={styles.dateInput}
            />
          </div>
        </div>
        <div className={styles.dateButtons}>
          <button className={styles.dateButton} onClick={() => setRelativeDate(-1, 'year', 'start')}>1년 전</button>
          <button className={styles.dateButton} onClick={() => setRelativeDate(-1, 'month', 'start')}>1달 전</button>
          <button className={styles.dateButton} onClick={() => setRelativeDate(-1, 'week', 'start')}>1주일 전</button>
          <button className={styles.dateButton} onClick={() => setRelativeDate(1, 'week', 'end')}>1주일 후</button>
          <button className={styles.dateButton} onClick={() => setRelativeDate(1, 'month', 'end')}>1달 후</button>
          <button className={styles.dateButton} onClick={() => setRelativeDate(1, 'year', 'end')}>1년 후</button>
        </div>
      </div>
      <hr className={styles.separator} />
      <div className={styles.contractList}>
        {resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <div key={index} className={styles.contractItem}>
              <h2 className={styles.contractTitle}>{resume.title}</h2>
              <p className={styles.contractDate}>최종 수정일: {resume.modifiedDate}</p>
              <p className={styles.contractDescription}>{resume.description}</p>
              <div className={styles.buttonGroup}>
                <button className={styles.button}>수정</button>
                <button className={styles.button}>삭제</button>
                <button className={styles.button}>공개하기</button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noContracts}>이력서가 없습니다.</p>
        )}
      </div>
      <button onClick={handleNewResume} className={styles.newContractButton}>새 이력서 작성</button>
    </div>
  );
}

export default ResumeManagement;
