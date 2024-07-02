import React, { useState } from 'react';
import styles from './CompanyJoinUs.module.css';

function CompanyJoinUs() {
  const MASTER_KEY = "123456"; // 마스터 키 설정

  const [companyId, setCompanyId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [consents, setConsents] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'all') {
      setConsents({
        all: checked,
        terms: checked,
        privacy: checked,
        marketing: checked
      });
    } else {
      setConsents(prevConsents => ({
        ...prevConsents,
        [name]: checked,
        all: checked && prevConsents.terms && prevConsents.privacy && prevConsents.marketing
      }));
    }
  };

  const handleVerification = async () => {
    if (!phone) {
      alert('휴대폰번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone })
      });

      if (response.ok) {
        alert('인증번호가 발송되었습니다.');
      } else {
        alert('인증번호 발송에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('인증번호 발송 중 오류가 발생했습니다.');
    }
  };

  const handleVerificationCheck = async () => {
    // 마스터 키 확인
    if (verificationCode === MASTER_KEY) {
      setIsVerified(true);
      alert('휴대폰 인증이 완료되었습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/company-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, verificationCode })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setIsVerified(true);
          alert('휴대폰 인증이 완료되었습니다.');
        } else {
          alert('인증번호가 일치하지 않습니다.');
        }
      } else {
        alert('인증번호 확인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('인증번호 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert('휴대폰 인증을 완료해주세요.');
      return;
    }
    if (Object.values(consents).some(value => !value)) {
      alert('필수 약관에 모두 동의해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/company-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId,
          email,
          phone,
          password,
          referral
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert('회원가입이 완료되었습니다.');
      } else {
        alert(`회원가입 실패: ${result.error}`);
      }
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>기업 회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="companyId">회사 이름 및 아이디 *</label>
          <input
            type="text"
            id="companyId"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">이메일 *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">비밀번호 *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone">휴대폰번호 *</label>
          <div className={styles.verificationInputGroup}>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="button" onClick={handleVerification} disabled={!phone}>인증번호</button>
          </div>
          <div className={styles.verificationInputGroup}>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button type="button" onClick={handleVerificationCheck}>확인</button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="referral">가입경로</label>
          <select id="referral" value={referral} onChange={(e) => setReferral(e.target.value)} required>
            <option value="">선택하세요</option>
            <option value="search">검색엔진</option>
            <option value="ad">광고</option>
            <option value="friend">지인추천</option>
            <option value="social_media">소셜미디어</option>
            <option value="other">기타</option>
          </select>
        </div>
        <div className={styles.consentContainer}>
          <h2>약관 동의 *</h2>
          <label>
            <input
              type="checkbox"
              name="all"
              checked={consents.all}
              onChange={handleConsentChange}
            />
            전체동의
          </label>
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={consents.terms}
              onChange={handleConsentChange}
            />
            (필수) 서비스 이용약관동의
          </label>
          <label>
            <input
              type="checkbox"
              name="privacy"
              checked={consents.privacy}
              onChange={handleConsentChange}
            />
            (필수) 개인정보 수집 및 이용 동의
          </label>
          <label>
            <input
              type="checkbox"
              name="marketing"
              checked={consents.marketing}
              onChange={handleConsentChange}
            />
            (선택) 광고성 정보 이메일/SMS 수신 동의
          </label>
        </div>
        <button type="submit" className={styles.joinButton}>가입하기</button>
      </form>
    </div>
  );
}

export default CompanyJoinUs;
