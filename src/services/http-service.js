import axios from 'axios';
import queryString from 'querystring';
import isEmpty from 'lodash/isEmpty';
import { getToken, getUserId } from './data-service';


const baseUrl = 'https://self-manage-finance.onrender.com';
const localhost = 'http://localhost:5000';


const _get = (path, params) => {
  params = params || {};
  const token = getToken();
  const options = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
  const url = _getUrl(path, params);
    return axios({
      method: 'get',
      url: url,
      params,
      ...options,
    });
}

 const _getUrl = (path, params) => {
    params = params || {};
    return `${localhost + path}${
      !isEmpty(params)
        ? `?` + queryString.stringify(params)
        : queryString.stringify(params)
    }`;
  }
  
const _post = (path, params, body) => {
    body = body || {};
  const url = _getUrl(path, params);
  const token = getToken();
  const options = {
    method: 'post',
    headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
  }
  return axios
      .post(url, body, options);
}


export const loginUser = (path, body) => {
    return _post(path, {}, body);
}

export const getCategories = (path, params) => {
  return _get(path, params);
}
