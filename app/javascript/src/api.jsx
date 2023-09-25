const BASE_URL = '/api';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const headers = {
  'Content-Type': 'application/json',
  'X-CSRF-Token': csrfToken,
};

export const signInUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/log-in`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ user: { username, password } }),
    });

    if (!response.ok) throw new Error('Error signing in user');

    const data = await response.json();
    window.location.href = '/feed'; // Redirect after successful login
    return data;
  } catch (error) {
    console.error('Error signing in user:', error);
    return null;
  }
}

export const createUser = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/sign-up`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ user: { username, email, password } }),
    });

    if (!response.ok) throw new Error('Error creating user');

    const data = await response.json();
    console.log('Data after successful login:', data);
    window.location.href = '/feed';
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}



export const signOutUser = async () => {
  console.log('signOutUser function called');
  try {
    const response = await fetch(`${BASE_URL}/log-out`, { // Remove one '/api'
      method: 'DELETE',
      headers,
    });

    if (!response.ok) throw new Error('Error signing out user');

    const data = await response.json();
    if (data.success) {
      // Redirect to home page after successful logout
      window.location.href = '/';
    }
    return data;
  } catch (error) {
    console.error('Error signing out user:', error);
    return null;
  }
}


export const authenticate = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sessions/authenticated`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) throw new Error('Error checking authentication');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return null;
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) throw new Error('Error fetching current user');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const fetchTweets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tweets`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) throw new Error('Error fetching tweets');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return null;
  }
}

export const createTweet = async (message, image) => {
  try {
    const response = await fetch(`${BASE_URL}/tweets`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ tweet: { message, image } }),
    });

    if (!response.ok) throw new Error('Error creating tweet');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating tweet:', error);
    return null;
  }
}

export const deleteTweet = async (tweetId) => {
  try {
    const response = await fetch(`${BASE_URL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) throw new Error('Error deleting tweet');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting tweet:', error);
    return null;
  }
}

export const fetchTweetsByUser = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/tweets/user/${username}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) throw new Error('Error fetching tweets by user');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tweets by user:', error);
    return null;
  }
}

export const fetchUserDataByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${username}`);
    if (!response.ok) throw new Error('Error fetching user data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

