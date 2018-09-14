import {API_HEADERS} from '../constants/config.js';
import {getUserToken} from './storage.js';

function generateHeaders(include_token){
  return getUserToken()
  .then((token) =>{
    console.log('EL TOKEN DEL GENERATE ES: '+ token);
    if(!include_token)
      return API_HEADERS;
    if(!token)
      return API_HEADERS;
    return {
      ...API_HEADERS,
      'Authorization': `${token}`,
    };
  });
}

const http = {
  get: (url, include_token=true)=>{
    console.log('ACCEDIENDO AL GET ...' + include_token);
    return generateHeaders(include_token)
    .then((headers)=>{
      return fetch(url, {
        method: 'GET',
        headers: headers,
      }).then((response)=>{
        if(response.ok){
          return response.json();
        } else {
          return Promise.reject({status: response.status});
        }
      }, (err)=>{
        return Promise.reject(err);
      })
    })
  },
  put: (url, data = {}, include_token=true)=>{
    return generateHeaders(include_token)
    .then((headers)=>{
      return fetch(url,{
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      }).then((response)=>{
        if(response.ok){
          return response.json();
        } else {
          return Promise.reject({status: response.status});
        }
      }, (err)=>{
        return Promise.reject(err);
      })
    })
  },
  post: (url, data, include_token=true)=>{
    return generateHeaders(include_token)
    .then((headers)=>{
      return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      }).then((response)=>{
        if(response.ok){
          return response.json();
        } else {
          return Promise.reject({status: response.status});
        }
      }, (err)=>{
        return Promise.reject(err);
      })
    })
  },
  delete: (url, include_token=true)=>{
    return generateHeaders(include_token)
    .then((headers)=>{
      return fetch(url, {
        method: 'DELETE',
        headers: headers,
      }).then((response)=>{
        if(response.ok){
          return response.json();
          return Promise.reject({status: response.status});
        } else {
        }
      }, (err)=>{
        return Promise.reject(err);
      })
    })
  }
};

export default http;
