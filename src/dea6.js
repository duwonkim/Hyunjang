import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ContractManagement.module.css';

function ContractManagement() {
  const [contracts] = useState([
    {
      title: '계약서 제목 1',
      modifiedDate: '2023-05-21',
      description: '계약서 설명 1',
    },
    {
      title: '계약서 제목 2',
      modifiedDate: '2023-06-15',
      description: '계약서 설명 2',
    },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  const handleNewContract = () => {
    navigate('/contract-form'); // 새 근로계약서 작성 페이지로 이동
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
      <h1 className={styles.title}>근로계약서 관리</h1>
      <p className={styles.info}>
        근로계약서는 실제 채용이 결정된 후 해당 사업주를 상대로 작성해야 합니다. 근로계약서는 최초 작성일로부터 1개월 이내에 작성해야 하며, 기간 내에 작성하지 않을 경우 계약 실패로 처리됩니다. 계약이 완료된 근로계약서는 완료일로부터 1년간 다운받을 수 있으며, 사업주와 근로자가 각각 1부씩 보관해야 합니다. 근로계약서에 작성된 내용에 대한 책임은 작성한 사업주와 근로자에게 있습니다.
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
        {contracts.length > 0 ? (
          contracts.map((contract, index) => (
            <div key={index} className={styles.contractItem}>
              <h2 className={styles.contractTitle}>{contract.title}</h2>
              <p className={styles.contractDate}>최종 수정일: {contract.modifiedDate}</p>
              <p className={styles.contractDescription}>{contract.description}</p>
              <div className={styles.buttonGroup}>
                <button className={styles.button}>수정</button>
                <button className={styles.button}>삭제</button>
                <button className={styles.button}>공개하기</button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noContracts}>근로계약서가 없습니다.</p>
        )}
      </div>
      <button onClick={handleNewContract} className={styles.newContractButton}>새 근로계약서 작성</button>
    </div>
  );
}

export default ContractManagement;
