import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-ac02b.firebaseio.com/'
});

export default instance;
