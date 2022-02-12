import axios from 'axios';

const token = localStorage.getItem('token');

const APIwHeader = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: `Bearer ${token}`
  }
});

const API = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: false
});

export const signUp = (form) => API.post('/user/signup', form);
export const newRecord = (form) => API.post('/data/newrecord', form);
export const addToRecord = (id, form) => APIwHeader.put('/data/addtorecord/'+id, form);
export const signIn = (form) => API.post('/user/signin', form);
export const fetchAnUser = (id) => APIwHeader.get('/user/'+id, id);
export const fetchData = (id) => APIwHeader.get('/data/'+id, id);