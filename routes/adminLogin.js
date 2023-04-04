
import express from 'express'

const routerAdmin = express.Router()

routerAdmin.get('/:password', (req, res) => {
  if (req.params.password) {
    console.log(req.params.password)
  }
  res.send(JSON.stringify({ hello: 'hello from backend' }))
})

export default routerAdmin
