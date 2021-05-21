import axios from 'axios';
 
const service = axios.create({
  baseURL: 'https://freeyourstuff.herokuapp.com/api' || 'http://localhost:5005/api',
  withCredentials: true // => you might need this when having the users in the app
});
 
const errorHandler = err => {
  throw err;
};
 
export default {
  service,
 
  handleUpload(theFile) {
    return service
      .post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },
};