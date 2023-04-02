import express from 'express'
import getAccessToken, { setupAccessToken } from './spotify/spotifytAccesToken.js'
import * as querystring from 'querystring'
import * as dotenv from 'dotenv'
import spotifyToken from './spotify/spotifyToken.js'

const app = express()
dotenv.config()

app.get('/login', function (req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: process.env.SPOTIFY_CLIENT_ID,
          scope: 'user-modify-playback-state',
          redirect_uri: 'http://localhost:8080/callback'
        }))
})

app.get('/callback', async (req, res) => {
  const code = req.query.code || null

  console.log('is logged in')

  const body = new URLSearchParams()
  body.append('grant_type', 'authorization_code')
  body.append('code', code)
  body.append('redirect_uri', 'http://localhost:8080/callback')

  const spotifyAccess = await spotifyToken(body)

  setupAccessToken(spotifyAccess)

  res.redirect('/')
})

app.get('/next', async (req, res) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })

  res.send('switch')
})

app.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('__ server is running __')
  }
})
