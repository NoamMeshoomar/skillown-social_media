import axios from 'axios';

// const baseURL = 'http://localhost:8080';

export default axios.create({
    baseURL: `https://skillown.projects-portfolio.live/api/v1`
});