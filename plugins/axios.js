export default function ({ $axios, app, store }) {
  $axios.onRequest((config) => {
    config.headers.common['x-rapidapi-key'] = '41d322edb2msh41c388eb386d403p1fd5dfjsn44ba1965554a';
  })
}
