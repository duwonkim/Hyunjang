const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

app.post('/api/user-login', (req, res) => {
  const { userId, password } = req.body;
  // 유저 인증 로직 (예: 데이터베이스에서 유저 확인)
  const user = authenticateUser(userId, password);

  if (user) {
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

function authenticateUser(userId, password) {
  // 유저 인증 로직 (예: 데이터베이스에서 유저 정보 확인)
  if (userId === 'test' && password === 'password') {
    return { id: '12345', name: 'John Doe', email: 'john.doe@example.com' };
  }
  return null;
}

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
