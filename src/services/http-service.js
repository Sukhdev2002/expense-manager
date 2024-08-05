import axios from 'axios';
import queryString from 'querystring';
import isEmpty from 'lodash/isEmpty';
import { getToken, getUserId } from './data-service';


// const baseUrl = 'https://self-manage-finance.onrender.com';
const baseUrl = 'https://manage-finance.vercel.app';


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
    ...options,
  });
}

const _getUrl = (path, params) => {
  params = params || {};
  return `${baseUrl + path}${!isEmpty(params)
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


const _put = (path, params, body) => {
  body = body || {};
  const url = _getUrl(path, params);
  const token = getToken();
  const options = {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
  return axios.put(url, body, options);
}

const _delete = (path, params) => {
  const url = _getUrl(path, params);
  const token = getToken();
  const options = {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
  return axios.delete(url, options);
}


export const postData = (path, body) => {
  return _post(path, {}, body);
}

export const fetchData = (path, params) => {
  return _get(path, params);
}


export const updateData = (path, body) => {
  return _put(path, {}, body);
}

export const deleteData = (path) => {
  return _delete(path, {});
}