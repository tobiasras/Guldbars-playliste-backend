import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import routerSpotifyAuthentication from './routes/spotifyAuthentication.js'
import adminLogin from './routes/adminLogin.js'
import spotifyPlayer from './routes/spotifyPlayer.js'
import spotifyQueue from './routes/spotifyQueue.js'
import { createLimiter } from './routes/Limiters/limiters.js'

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()
app.use(express.urlencoded({ extended: true }))

// Apply the rate limiting middleware to API calls only
app.use('/auth', createLimiter(15, 5))
app.use('/auth', routerSpotifyAuthentication)

app.use('/admin', createLimiter(5, 5))
app.use('/admin', adminLogin)

app.use('/player', createLimiter(15, 100))
app.use('/player', spotifyPlayer)

app.use('/queue', spotifyQueue)

app.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('__ server is running __')
  }
})
