export default function ({ $axios, app, store }) {
  $axios.onRequest((config) => {
    config.headers.common['x-rapidapi-key'] = process.env.API_KEY;
  })
}
