import http from 'http'
import { createApp } from './app'
import mongoose from 'mongoose'

const connectionString = 'dummy' /* set using environment */

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('database connection happens')
  })
  .catch(error => {
    console.log('fails mongoose connection', error.message)
  })

const app = createApp()
// httpServer should be in global scope
let httpServer // insecure server
const createHttpServer = () => {
  const serverAddress = `http://localhost:3000`
  const server = http
    .createServer(app.callback())
    .listen(3000, () => {
      console.log(serverAddress)
    })
    .on('clientError', err => {
      console.trace(err)
    })

  httpServer = server
}

createHttpServer()
