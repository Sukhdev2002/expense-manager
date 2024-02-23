import axios from 'axios';
import queryString from 'querystring';
import isEmpty from 'lodash/isEmpty';

const baseUrl = 'https://self-manage-finance.onrender.com';
const localhost = 'http://localhost:5000';


const _get = (path, params) => {
    params = params || {};
    const options = {
      headers: {
        'Content-Type': 'application/json',
     }
    };
    return axios({
      method: 'get',
      url: path,
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
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return axios
        .post(url, body, options);
}


export const loginUser = (path, body) => {
    return _post(path, {}, body);
}
