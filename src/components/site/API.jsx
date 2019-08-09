import axios from 'axios';

// const getBaseUrl = function(env, target) {
//   console.log(env);
//   if (env === 'production' && target === 'staging') {
//     return 'https://lsst-epo.github.io/a-window-to-the-stars/';
//   }

//   if (env === 'production') {
//     return 'https://lsst-epo.github.io/a-window-to-the-stars/';
//   }

//   return 'http://localhost:8080/';
// };

export default axios.create({
  baseURL: '/',
  // baseURL: getBaseUrl(process.env.NODE_ENV, process.env.DEPLOY_ENV),
});
