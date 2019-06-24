import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://lsst-epo.github.io/a-window-to-the-stars/'
      : 'http://localhost:8080/',
});
