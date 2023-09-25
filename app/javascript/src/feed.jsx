import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { signOutUser } from './api';
import './feed.scss';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Feed = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [postInput, setPostInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    authenticate();
    fetchTweets();
    fetchCurrentUser(); // Add this line to fetch the current user
  }, []);

  const authenticate = async () => {
    try {
      const data = await authenticateUser();
      if (data) {
        setCurrentUser(data.username); // Set the current user's username
      }
    } catch (error) {
      console.error('Error authenticating:', error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const data = await getCurrentUser(); // Add this function to fetch the current user
      if (data) {
        setCurrentUser(data.username); // Set the current user's username
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const charCount = () => {
    return 140 - postInput.length;
  };
  
  const readURL = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update image preview here if needed
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const postTweet = () => {
    const newTweet = {
      username: currentUser,
      message: postInput,
      image: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
    setPostInput('');
    setImageFile(null);
  };

  const fetchTweets = async () => {
    try {
      const data = await fetchTweetsByUser(currentUser); // Fetch tweets by the current user
      if (data) {
        setTweets(data.tweets); // Set fetched tweets in the state
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const handleLogout = async () => {
    const result = await signOutUser();
    if (result && result.success) {
      // Redirect to the home page or perform other actions
      window.location.href = '/';
    }
  };

  return (
    <div className="feed-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><i className="fab fa-twitter"></i></a> {/* Add some left padding */}
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav ms-auto d-flex align-items-center">
        <div className="d-flex me-3">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">
  <i className="fas fa-search"></i>
</button>
        </div>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
          data-bs-toggle="dropdown" aria-expanded="false">
            {currentUser} {/* Show current user's username */}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Lists</a></li>
            <li><a className="dropdown-item" href="#">Help</a></li>
            <li><a className="dropdown-item" href="#">Keyboard Shortcuts</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => signOutUser()}>Logout</a></li>            
          </ul>
        </li>
      </ul>  
    </div>
  </div>
</nav>
<div className="main container mt-5 pt-5">
        <div className="row">
          <div className="col-3 profile-trends">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{currentUser}</h5> {/* Show current user's username */}
                <p className="card-text">@{currentUser}</p> {/* Show current user's username */}
                <div className="d-flex">
                  <div className="me-3">
                    <p>Tweets</p>
                    <p>10</p>
                  </div>
                  <div className="me-3">
                    <p>Following</p>
                    <p>0</p>
                  </div>
                  <div className="me-3">
                    <p>Followers</p>
                    <p>0</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="trends mt-3">
              <h6>Trends</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><a href="#">#Hongkong</a></li>
                <li className="list-group-item"><a href="#">#Ruby</a></li>
                <li className="list-group-item"><a href="#">#foobarbaz</a></li>
                <li className="list-group-item"><a href="#">#rails</a></li>
                <li className="list-group-item"><a href="#">#API</a></li>
              </ul>
            </div>
          </div>
          <div className="col-6 feed-box">
            <div className="feed">
              <div className="post-tweet-box">
                <textarea
                className="form-control post-input"
                rows="3"
                placeholder="What's happening?"
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
                ></textarea>
                <div className="d-flex flex-row-reverse">
                  <input
                  type="file"
                  id="image-select"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  readURL(e.target);
                  }}
                  />
                  <span className="post-char-counter">
                    {charCount()} characters left
                  </span>
                  <button
                  className="btn btn-primary"
                  disabled={charCount() < 0}
                  onClick={postTweet}
                  >
                    Tweet
                  </button>
          </div>
        </div>
          {tweets.map((tweet, index) => (
          <div className="tweet col-12" key={index}>
            <a className="tweet-username" href="#">
              {tweet.username}
            </a>
            <p>{tweet.message}</p>
            {tweet.image && <img src={tweet.image} alt="tweet image" />}
            
            <div className="tweet-emojis">
    <a
      className="emoji comment"
      href="#"
      onClick={(e) => handleEmojiClick(e, 'comment')}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Comment"
    >
      💬
    </a>
    <a
      className="emoji like"
      href="#"
      onClick={(e) => handleEmojiClick(e, 'like')}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Like"
    >
      ❤️
    </a>
    <a
      className="emoji repost"
      href="#"
      onClick={(e) => handleEmojiClick(e, 'repost')}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Repost"
    >
      🔄
    </a>
    <a
      className="emoji share"
      href="#"
      onClick={(e) => handleEmojiClick(e, 'share')}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Share"
    >
      📢
    </a>
  </div>
  <div className="tweet-dropdown">
    <button
      className="btn btn-link"
      type="button"
      id={`dropdownMenuButton-${tweet.id}`}
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {/* Three dots icon */}
      <span className="dots-icon ">...</span>
    </button>
    <div className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${tweet.id}`}>
      <a className="dropdown-item" href="#">
        Edit
      </a>
      <a className="dropdown-item" href="#" onClick={() => handleDelete(tweet.id)}>
        Delete
      </a>
      <a className="dropdown-item" href="#">
        Tag
      </a>
    </div>
  </div>
            </div>
            ))}
         </div>
        </div>          
        </div>
      </div>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('feed-container');
  if (element) {
    ReactDOM.render(<Feed />, element);
  }
});