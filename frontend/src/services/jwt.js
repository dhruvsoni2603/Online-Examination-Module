import Cookies from 'js-cookie';

// Cookie options for secure storage
const cookieOptions = {
  secure: true, // Ensures cookies are sent over HTTPS
  sameSite: 'strict', // Protects against CSRF attacks
  path: '/', // Cookie accessible across the entire app
  expires: 1, // Token expiry in days (set to 1 day)
};

/**
 * Set JWT token in cookies
 * @param {string} token - JWT token to store
 */
export const setToken = (token) => {
  Cookies.set('jwt_token', token, cookieOptions);
};

/**
 * Get JWT token from cookies
 * @returns {string|null} JWT token if exists, otherwise null
 */
export const getToken = () => {
  return Cookies.get('jwt_token') || null;
};

/**
 * Remove JWT token from cookies
 */
export const removeToken = () => {
  Cookies.remove('jwt_token', { path: '/' });
};

/**
 * Check if a valid token exists
 * @returns {boolean} True if token exists, otherwise false
 */
export const hasToken = () => {
  return !!Cookies.get('jwt_token');
};

export const setUserId = (userId) => {
  Cookies.set('user_id', userId, cookieOptions);
}

export const getUserId = () => {
  return Cookies.get('user_id') || null;
}

export const removeUserId = () => {
  Cookies.remove('user_id', { path: '/' });
}

export const getRole = () => {
  return Cookies.get('role') || null;
}

export const setRole = (role) => {
  Cookies.set('role', role, cookieOptions);
}

export const removeRole = () => {
  Cookies.remove('role', { path: '/' });
}