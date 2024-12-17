// server.js (Node.js와 Express 서버)

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8080;

// CORS 허용
app.use(cors());

// MySQL 연결
const connection = mysql.createConnection({
  host: 'capstone-aid-database.c3seym2oyyq4.ap-northeast-2.rds.amazonaws.com',
  user: 'aid2024',
  password: 'Awsaid2024!!',
  database: 'gotcha_db',
});

// 데이터 조회 API 엔드포인트
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM final', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
