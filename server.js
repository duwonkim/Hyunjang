const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

const db_config = {
  host: 'localhost',
  user: 'root',
  password: 'rlaendnjs',
  database: 'mydb2'
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(db_config);

  db.connect((err) => {
    if (err) {
      console.log('error when connecting to db:', err.code);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to db!');
    }
  });

  db.on('error', (err) => {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// JWT 비밀 키
const JWT_SECRET = 'your_jwt_secret_key';

// JWT 토큰 생성 함수
function generateToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
}

// JWT 인증 미들웨어
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 개인회원가입 데이터 삽입 엔드포인트 추가
app.post('/api/register', (req, res) => {
  const { userId, phone, password, name, email, referral } = req.body;

  const query = 'INSERT INTO personal_member_registration (userId, phone_number, password, name, email, referral_source) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [userId, phone, password, name, email, referral], (err, result) => {
    if (err) {
      console.error('회원가입 중 오류 발생:', err);
      res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.', details: err });
    } else {
      res.status(201).json({ success: '회원가입이 완료되었습니다.' });
    }
  });
});

// 기업회원가입 데이터 삽입 엔드포인트 추가
app.post('/api/company-register', (req, res) => {
  const { companyId, email, phone, password, referral } = req.body;

  const query = 'INSERT INTO company_member_registration (companyId, email, phone, password, referral_source) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [companyId, email, phone, password, referral], (err, result) => {
    if (err) {
      console.error('회원가입 중 오류 발생:', err);
      res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.', details: err });
    } else {
      res.status(201).json({ success: '회원가입이 완료되었습니다.' });
    }
  });
});

// 개인회원 로그인 엔드포인트
app.post('/api/user-login', (req, res) => {
  const { userId, password } = req.body;

  const query = 'SELECT * FROM personal_member_registration WHERE userId = ? AND password = ?';
  db.query(query, [userId, password], (err, results) => {
    if (err) {
      console.error('로그인 중 오류 발생:', err);
      res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
    } else {
      if (results.length > 0) {
        const user = { id: results[0].id, userId: results[0].userId };
        const token = generateToken(user);
        res.status(200).json({ success: '로그인 성공', token });
      } else {
        res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
      }
    }
  });
});

// 기업회원 로그인 엔드포인트
app.post('/api/company-login', (req, res) => {
  const { userId, password } = req.body;

  const query = 'SELECT * FROM company_member_registration WHERE companyId = ? AND password = ?';
  db.query(query, [userId, password], (err, results) => {
    if (err) {
      console.error('로그인 중 오류 발생:', err);
      res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
    } else {
      if (results.length > 0) {
        const user = { id: results[0].id, userId: results[0].companyId };
        const token = generateToken(user);
        res.status(200).json({ success: '로그인 성공', token });
      } else {
        res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
      }
    }
  });
});


// 글 작성 데이터 삽입 엔드포인트 추가
app.post('/api/create-post', (req, res) => {
  const { phone_number, title, job_category, rate, date, start_time, end_time, location, personnel, description } = req.body;

  console.log('Received data:', req.body);  // 디버깅을 위한 로그

  const query = 'INSERT INTO job_registration (phone_number, title, job_category, rate, date, start_time, end_time, location, personnel, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [phone_number, title, job_category, rate, date, start_time, end_time, location, personnel, description], (err, result) => {
    if (err) {
      console.error('글 작성 중 오류 발생:', err);
      res.status(500).json({ error: '글 작성 중 오류가 발생했습니다.', details: err });
    } else {
      res.status(201).json({ success: '글 작성이 완료되었습니다.' });
    }
  });
});

// 데이터베이스에서 게시글 목록 가져오는 엔드포인트 추가
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM job_registration';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('데이터 불러오기 중 오류 발생:', err);
      res.status(500).json({ error: '데이터 불러오기 중 오류가 발생했습니다.', details: err });
    } else {
      res.status(200).json(results);
    }
  });
});

// 특정 게시글을 ID로 가져오는 엔드포인트 추가
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM job_registration WHERE phone_number = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('데이터 불러오기 중 오류 발생:', err);
      res.status(500).json({ error: '데이터 불러오기 중 오류가 발생했습니다.', details: err });
    } else if (results.length === 0) {
      res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});



app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});