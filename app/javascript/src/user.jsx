import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './user.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { fetchUserDataByUsername } from './api';

const User = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data by username when the component mounts
    async function fetchData() {
      const data = await fetchUserDataByUsername(username);
      if (data) {
        setUserData(data);
      }
    }

    fetchData();
  }, [username]);

  return (
    <div className="container">
      {userData ? (
        <>
          <aside className="sidebar">{/* Recommendations to follow */}</aside>

          <main className="content">
            <header className="header">
              <nav className="navbar">
                <div className="logo">
                  <span>X</span>
                </div>
                <ul className="menu">
                  <li>Home</li>
                  <li>Explore</li>
                  <li>Notifications</li>
                  <li>Messages</li>
                  <li>Lists</li>
                  <li>Bookmarks</li>
                  <li>Communities</li>
                  <li>Verified</li>
                  <li>Profile</li>
                  <li>More</li>
                </ul>
                <div className="search-bar">
                  <input type="text" placeholder="Search Twitter" />
                </div>
              </nav>
            </header>

            <div className="profile">
              <div className="cover-photo"></div>
              <div className="profile-info">
                <div className="avatar"></div>
                <h1 className="display-name">{userData.displayName}</h1>
                <p className="handle">@{userData.username}</p>
                <p className="bio">{userData.bio}</p>
                <div className="stats">
                  <div className="stat">
                    <span className="count">{userData.postsCount}</span>
                    <span className="label">Posts</span>
                  </div>
                  <div className="stat">
                    <span className="count">{userData.followersCount}</span>
                    <span className="label">Followers</span>
                  </div>
                  <div className="stat">
                    <span className="count">{userData.followingCount}</span>
                    <span className="label">Following</span>
                  </div>
                </div>
                <div className="profile-options">
                  <span>Posts</span>
                  <span>Replies</span>
                  <span>Highlights</span>
                  <span>Media</span>
                  <span>Likes</span>
                </div>
              </div>
            </div>

            <div className="tweet-feed">
              {/* Your tweets and content go here */}
            </div>
          </main>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('user-container');
  if (element) {
    ReactDOM.render(<User />, element);
  }
});
