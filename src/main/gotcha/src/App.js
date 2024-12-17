import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Main from './Main';

function App() {
  useEffect(() => {
    // 기본 사용자 정보 설정
    const defaultUsername = 'admin';
    const defaultPassword = 'admin123';
    localStorage.setItem('username', defaultUsername);
    localStorage.setItem('password', defaultPassword);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;