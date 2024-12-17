import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbXboxX } from "react-icons/tb";
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      navigate('/main');
    } else {
      setError('잘못된 입력입니다. 다시 시도해 주십시오.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-container">
            <img src="/resources/Logo.png" alt="Gotcha Logo" className="logo" />
        </div>
        <div className="error-message-container">
          {error && (
            <div className="error-message">
              <TbXboxX style={{ marginRight: '8px', marginLeft: '5px', fontSize: '18px', color: '#6B8DD6' }} />
              {error}
            </div>
          )}
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>담당 지역코드를 입력해주세요.</label>
            <input
              type="text"
              placeholder="Enter"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Gotcha로부터 발급받은 관리자 Key를 입력해주세요.</label>
            <input
              type="password"
              placeholder="Enter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">로그인</button>
          <div className="separate">
            <hr /> <span>또는</span> <hr />
          </div>
          <button type="button" className="register-button">이용 신청</button>
        </form>
      </div>
    </div>
  );
}

export default Login;