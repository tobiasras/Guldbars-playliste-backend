import express from 'express'
import getAccessToken, { setupAccessToken } from './spotify/spotifytAccesToken.js'
import * as querystring from 'querystring'
import * as dotenv from 'dotenv'
import spotifyToken from './spotify/spotifyToken.js'

const app = express()
app.use(express.json())

dotenv.config()
// api
app.get('/authorizeLogin/:password', (req, res) => {
  if (req.query.password) {
    console.log(req.query.password)
  }
  res.send(JSON.stringify({ hello: 'hello from backend' }))
})

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
  const body = new URLSearchParams()
  body.append('grant_type', 'authorization_code')
  body.append('code', code)
  body.append('redirect_uri', 'http://localhost:8080/callback')

  const spotifyAccess = await spotifyToken(body)

  setupAccessToken(spotifyAccess)
  res.redirect('/load')
})

// api
app.get('/api/next', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send()
})

app.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('__ server is running __')
  }
})
