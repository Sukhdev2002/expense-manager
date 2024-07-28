import { jwtDecode as jwt_decode } from 'jwt-decode';


export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
}

export const getUserId = () => {
  const token = getToken();
  const decodedToken = jwt_decode(token || '');
  return decodedToken?.userId;
}

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const removeToken = () => {
  localStorage.removeItem('token');
};