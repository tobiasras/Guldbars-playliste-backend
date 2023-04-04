import getAccessToken from '../spotify/spotifytAccesToken.js'
import express from 'express'

const routerSpotifyPlayer = express.Router()

routerSpotifyPlayer.get('/next', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send('forward')
})

routerSpotifyPlayer.get('/previous', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/previous', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send('forward')
})

routerSpotifyPlayer.get('/play', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send('playing')
})

routerSpotifyPlayer.get('/pause', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send('forward')
})

export default routerSpotifyPlayer
