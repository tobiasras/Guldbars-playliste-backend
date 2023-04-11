import getAccessToken from '../spotify/spotifytAccesToken.js'
import express from 'express'

const routerSpotifyPlayer = express.Router()

routerSpotifyPlayer.get('/state', async (req, res) => {
  const promise = fetch('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  const response = await promise

  res.send(await response)
})

routerSpotifyPlayer.post('/next', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send('forward')
})

routerSpotifyPlayer.post('/previous', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/previous', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send('forward')
})

routerSpotifyPlayer.post('/play', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send('playing')
})

routerSpotifyPlayer.post('/pause', async (req, res) => {
  fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  res.send('forward')
})

export default routerSpotifyPlayer
