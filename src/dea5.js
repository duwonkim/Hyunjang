import React, { useState } from 'react';
import styles from './ResumeForm.module.css';

const ResumeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState([{ school: '', major: '', graduationYear: '' }]);
  const [experience, setExperience] = useState([{ company: '', position: '', period: '', description: '' }]);
  const [skills, setSkills] = useState(['']);
  const [introduction, setIntroduction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 이력서 제출 로직 추가
    alert('이력서가 제출되었습니다.');
  };

  const addEducation = () => {
    setEducation([...education, { school: '', major: '', graduationYear: '' }]);
  };

  const addExperience = () => {
    setExperience([...experience, { company: '', position: '', period: '', description: '' }]);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  return (
    <div className={styles.container}>
      <h1>이력서 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2>개인 정보</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.section}>
          <h2>학력</h2>
          {education.map((edu, index) => (
            <div key={index} className={styles.inputGroup}>
              <label htmlFor={`school-${index}`}>학교명</label>
              <input
                type="text"
                id={`school-${index}`}
                value={edu.school}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].school = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <label htmlFor={`major-${index}`}>전공</label>
              <input
                type="text"
                id={`major-${index}`}
                value={edu.major}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].major = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <label htmlFor={`graduationYear-${index}`}>졸업연도</label>
              <input
                type="text"
                id={`graduationYear-${index}`}
                value={edu.graduationYear}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].graduationYear = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
            </div>
          ))}
          <button type="button" className={styles.button} onClick={addEducation}>추가 학력</button>
        </div>
        <div className={styles.section}>
          <h2>경력</h2>
          {experience.map((exp, index) => (
            <div key={index} className={styles.inputGroup}>
              <label htmlFor={`company-${index}`}>회사명</label>
              <input
                type="text"
                id={`company-${index}`}
                value={exp.company}
                onChange={(e) => {
                  const newExperience = [...experience];
                  newExperience[index].company = e.target.value;
                  setExperience(newExperience);
                }}
                required
              />
              <label htmlFor={`position-${index}`}>직위</label>
              <input
                type="text"
                id={`position-${index}`}
                value={exp.position}
                onChange={(e) => {
                  const newExperience = [...experience];
                  newExperience[index].position = e.target.value;
                  setExperience(newExperience);
                }}
                required
              />
              <label htmlFor={`period-${index}`}>근무기간</label>
              <input
                type="text"
                id={`period-${index}`}
                value={exp.period}
                onChange={(e) => {
                  const newExperience = [...experience];
                  newExperience[index].period = e.target.value;
                  setExperience(newExperience);
                }}
                required
              />
              <label htmlFor={`description-${index}`}>주요업무</label>
              <textarea
                id={`description-${index}`}
                value={exp.description}
                onChange={(e) => {
                  const newExperience = [...experience];
                  newExperience[index].description = e.target.value;
                  setExperience(newExperience);
                }}
                required
              />
            </div>
          ))}
          <button type="button" className={styles.button} onClick={addExperience}>추가 경력</button>
        </div>
        <div className={styles.section}>
          <h2>스킬</h2>
          {skills.map((skill, index) => (
            <div key={index} className={styles.inputGroup}>
              <label htmlFor={`skill-${index}`}>스킬</label>
              <input
                type="text"
                id={`skill-${index}`}
                value={skill}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index] = e.target.value;
                  setSkills(newSkills);
                }}
                required
              />
            </div>
          ))}
          <button type="button" className={styles.button} onClick={addSkill}>추가 스킬</button>
        </div>
        <div className={styles.section}>
          <h2>자기소개</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="introduction">자기소개</label>
            <textarea
              id="introduction"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.button}>제출</button>
      </form>
    </div>
  );
};

export default ResumeForm;
