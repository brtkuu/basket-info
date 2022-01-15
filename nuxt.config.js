export default {
  head: {
    titleTemplate: '%s - basket-info',
    title: 'basket-info',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'
      }
    ]
  },
  ssr: false,
  css: [
    '~/assets/scss/main.scss'
  ],
  plugins: [
    '~/plugins/axios.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'https://api-nba-v1.p.rapidapi.com',
    https: true
  },
  dotenv: {
    systemvars: true
  },
  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
  }
}
