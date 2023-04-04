import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import routerSpotifyAuthentication from './routes/spotifyAuthentication.js'
import adminLogin from './routes/adminLogin.js'
import spotifyPlayer from './routes/spotifyPlayer.js'

const app = express()

app.use(express.json())

app.use(cors())

dotenv.config()

app.use('/auth', routerSpotifyAuthentication)
app.use('/admin', adminLogin)
app.use('/player', spotifyPlayer)
app.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('__ server is running __')
  }
})
