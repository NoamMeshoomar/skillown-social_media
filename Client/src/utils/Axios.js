import axios from 'axios';

// const baseURL = 'http://localhost:8080';

export default axios.create({
    baseURL: `https://skillown-f9bc9d34718f.herokuapp.com/api`
});