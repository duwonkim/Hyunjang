// MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContractManagement.module.css';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <h1>회원 페이지</h1>

      <div className={styles.menu}>
        <div className={styles.category}><Link to="/dea5">이력서 작성</Link></div>
        <div className={styles.category}><Link to="/dea4">이력서 관리</Link></div>
        <div className={styles.category}><Link to="/categoryPage">임금정산하기</Link></div>
        <div className={styles.category}><Link to="/dea6">근로계약서 보기</Link></div>
      </div>
    </div>
  );
};

export default MainPage;
