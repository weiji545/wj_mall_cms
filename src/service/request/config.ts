let BAER_URL = ''
const TIME_OUT = 1000

if (process.env.NODE_ENV === 'development') {
  BAER_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BAER_URL = 'http://152.136.185.210:5000'
}

export { BAER_URL, TIME_OUT }
