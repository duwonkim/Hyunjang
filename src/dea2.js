import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MemberSelection.module.css';

function MemberSelection() {
  return (
    <div className={styles.memberSelection}>
      <h1>현장어때 회원가입을 환영합니다.</h1>
      <div className={styles.selectionContainer}>
        <div className={styles.memberType}>
          <h2>개인회원</h2>
          <p>이력등록하고 레지스트리를 찾아보세요</p>
          <Link to="/join-us" className={`${styles.joinButton} ${styles.personal}`}>개인회원 가입</Link>
        </div>
        <div className={styles.memberType}>
          <h2>기업회원</h2>
          <p>공고를 등록하고 플레이어를 찾아보세요</p>
          <Link to="/dea3" className={`${styles.joinButton} ${styles.company}`}>기업회원 가입</Link>
        </div>
      </div>
      <div className={styles.existingMember}>
        <p>이미 가입하신 분은 아이디와 설명으로 로그인하세요.</p>
        <Link to="/login" className={styles.loginButton}>로그인 바로가기</Link>
      </div>
    </div>
  );
}

export default MemberSelection;
