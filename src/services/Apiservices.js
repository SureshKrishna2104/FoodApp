export const URL = 'http://3.133.49.92:9090';

export const postMethod = (type, value) => {
  //console.warn('inside post', type, value);
  let data = {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    body: JSON.stringify(value),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(URL + type, data)
    .then(response => response.json())
    .then(responseData => {
     // console.warn('out of the', responseData);
      return responseData;
    }); // promise
};
export const postMethod1 = (type, value, jwt) => {
  //console.warn('inside post', type, value, jwt);
  let data = {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    body: JSON.stringify(value),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return fetch(URL + type, data)
    .then(response => response.json())
    .then(responseData => {
   //   console.warn('out of the', responseData);
      return responseData;
    }); // promise
};
export const postMethod2= (type, value,jwt) => {
 // console.warn('inside post', type, value,jwt);
  let data = {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    body: JSON.stringify(value),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return fetch(URL + type, data)
    .then(response => response.json())
    .then(responseData => {
     // console.warn('out of the', responseData);
      return responseData;
    }); // promise
};

export const getAllData = type => {
 // console.warn('dashboard', type);
  let data = {
    method: 'GET',
  };
  return fetch(URL + type, data)
    .then(response => response.json())
    .then(responseData => {
      //console.warn('out of the', responseData);
      return responseData;
    })
    .catch(function (error) {
      console.warn(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      throw error;
    });
};
