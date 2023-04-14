import express from 'express'
import getAccessToken from '../spotify/spotifytAccesToken.js'
const routerQueue = express.Router()

routerQueue.get("/", async (req, res) => {
    const promise = fetch('https://api.spotify.com/v1/me/player/queue', {
        headers: {
            Authorization: 'Bearer ' + await getAccessToken()
        }

    })
    const response = await promise
    res.send(response);

})

export default routerQueue