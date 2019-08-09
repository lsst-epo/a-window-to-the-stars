import axios from 'axios';

const getBaseUrl = function(env) {
  const envs = {
    development: '/',
    staging: '/',
    production: 'https://lsst-epo.github.io/a-window-to-the-stars/',
  };

  return envs[env] || '/';
};

export default axios.create({
  baseURL: getBaseUrl(process.env.NODE_ENV),
});
