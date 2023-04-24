import express from 'express'
import bcrypt from 'bcrypt'

const routerAdmin = express.Router()

routerAdmin.get('/:password', async (req, res) => {
  console.log(req.params.password)
  console.log(req.app.locals.adminPassword)

  const isSamePassword = await bcrypt.compare(req.params.password, req.app.locals.adminPassword)

  if (isSamePassword) {
    res.status(200)
    res.send('TRUUUUUUUEE')
  } else {
    res.send(401)
    res.send('WRONNNNNNGGG')
  }
})

export default routerAdmin
