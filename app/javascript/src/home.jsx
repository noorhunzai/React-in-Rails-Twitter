import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './home.scss';

const Home = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backStep, setBackStep] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('/assets/bg_1.jpg');

  useEffect(() => {
    const backgroundURL = [
      '/assets/bg_0.jpg',
      '/assets/bg_1.jpg',  
      '/assets/bg_2.jpg'
    ];

    const timer = setInterval(() => {
      setBackStep(prevStep => {
        const newStep = (prevStep + 1) % backgroundURL.length;
        setBackgroundImage(backgroundURL[newStep]);
        return newStep;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const signUp = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
      const data = await response.json();
      window.location.replace(data.redirectUrl);
    } else {
      const errorData = await response.json();
      alert(errorData.message || "An error occurred.");  // For simplicity, using an alert. Replace with a better UI/UX solution in production.
    }
    
  };

  const logIn = async (e) => {
    e.preventDefault();
  
    const response = await fetch('/api/log-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    if (response.ok) {
      const data = await response.json();
      window.location.replace(data.redirectUrl); // Redirect after successful login
    } else {
      const errorData = await response.json();
      alert(errorData.message || "An error occurred.");
    }
  };
    
  return (
    <div>
      <div id="homeback"></div>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#"><i className="fab fa-twitter"></i></a>
          
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <strong>English </strong>
              </a>
              <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                <li><a className="dropdown-item" href="#">Burushaski</a></li>
                <li><a className="dropdown-item" href="#">Shina</a></li>
                <li><a className="dropdown-item" href="#">English</a></li>
                <li><a className="dropdown-item" href="#">Wakhi</a></li>
                <li><a className="dropdown-item" href="#">Khowar</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="container main">
        <div className="row">
          <div className="front-card col-10 mx-auto">
            <div className="row">
              <div className="col-md-6 welcome">
                <div id="welcome-text">
                  <h1><strong>Welcome to Twitter.</strong></h1>
                  <p>Connect with your friends — and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                </div>
                <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
                <p><a href="#" id="twit-account">Tweet and photo by @Hackpacific<br />3:20 PM - 15 December 2016</a></p>
              </div>

              <div className="col-md-5 offset-md-1 authentication">  {/* Authentication container for both log-in and sign-up */}
                <div className="log-in">
                  <form onSubmit={logIn}>
                    <div className="form-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" id="rememberMe"/>
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <button id="log-in-btn" className="btn btn-primary">Log in</button>
                      <a href="#">Forgot password?</a>
                    </div>
                  </form>
                </div>

                <div className="sign-up">
                  <div className="new-to-t mb-2">
                    <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
                  </div>
                  <form onSubmit={signUp}>
                    <div className="form-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <button id="sign-up-btn" className="btn btn-warning float-end">Sign up for Twitter</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.body.appendChild(document.createElement('div')));
});
