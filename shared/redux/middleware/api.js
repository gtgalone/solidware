import nprogress from 'nprogress';

require('es6-promise').polyfill();
require('isomorphic-fetch');

nprogress.configure({ showSpinner: false });

const callApi = (endpoint, opts) => {
  const options = Object.assign({}, { credentials: 'include' }, opts);
  if (options.method === 'GET' && typeof window !== 'undefined') {
    nprogress.start();
  }

  return fetch(endpoint, options)
    .then((response) => {
      if (options.method === 'GET' && typeof window !== 'undefined') {
        nprogress.done();
      }
      return response;
    })
    .then((response) => {
      if (!response.ok) {
        return response.json()
          .then(
            json => Promise.reject(json),
            err => Promise.reject(err, { message: `"${response.statusText}" 오류가 발생했습니다.` }),
          );
      }
      return response;
    })
    .then(response =>
      response.json().then(json => json).catch((err) => {
        if (options.method === 'DELETE' || options.method === 'PUT' || response.status === 204) { // PUT 과 DELETE는 리턴값이 없을 수 있음
          return null;
        }
        return Promise.reject(err);
      }));
};

export const CALL_API = 'Call API';

export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, method, headers } = callAPI;
  const { types, params } = callAPI;
  let body = undefined;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!method) {
    method = 'GET';
  }
  if (!headers) {
    headers = {};
  }
  if (params) {
    body = JSON.stringify(params);
  }
  headers = Object.assign({}, headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, { method, body, headers }).then(
    response => next(actionWith({
      type: successType,
      data: response,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || (error.error ? error.error.message : '알 수 없는 오류가 발생했습니다.'),
    })),
  );
};
