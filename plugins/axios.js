const config = ({ $axios, $config, app, store }) => {
  $axios.onRequest((config) => {
    config.headers.common['x-rapidapi-key'] = $config.API_KEY;
  });
};

export default config;
