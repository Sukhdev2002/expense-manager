import { jwtDecode as jwt_decode } from 'jwt-decode';


export const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
}

export const getUserId = () => {
    const token = getToken();
    const decodedToken = jwt_decode(token|| ''); 
  return decodedToken?.userId;
}