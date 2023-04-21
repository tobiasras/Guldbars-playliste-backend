import express from 'express'
import getAccessToken from '../spotify/spotifytAccesToken.js'
import { filterQueue } from '../spotify/filters/trackObjectFilter.js'
import sendMessageByStatus from '../spotify/util/sendMessage.js'
import { createLimiter } from './Limiters/limiters.js'

const routerQueue = express.Router()

routerQueue.get('/', createLimiter(15, 100), async (req, res) => {
  const promise = fetch('https://api.spotify.com/v1/me/player/queue', {
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  const response = await promise

  if (response.status !== 200) {
    sendMessageByStatus(response, res)
  } else {
    const result = await response.json()
    res.send(filterQueue(result.queue))
  }
})

routerQueue.post('/', createLimiter(5, 1), async (req, res) => {
  const promise = fetch('https://api.spotify.com/v1/me/player/queue/?uri=' + req.query.uri, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })

  const result = await promise
  sendMessageByStatus(result, res)
})

export default routerQueue
