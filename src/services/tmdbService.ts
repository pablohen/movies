import axios from 'axios';

const tmdbService = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4ec327e462149c3710d63be84b81cf4f',
    language: 'pt-BR',
  },
});

export default tmdbService;
