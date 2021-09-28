import http from 'http'
import mongoose from 'mongoose'

import { createApp } from './app'

const connectionString = 'dummyString' /* set using environment */

mongoose
  .connect(connectionString)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('database connected')
    process.nextTick(createHttpServer)
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log('fails mongoose connection', error.message)
  })

const app = createApp()
// httpServer should be in global scope
// eslint-disable-next-line no-unused-vars
let httpServer // insecure server
const createHttpServer = () => {
  const serverAddress = `http://localhost:3000`
  const server = http
    .createServer(app.callback())
    .listen(3000, () => {
      // eslint-disable-next-line no-console
      console.log(serverAddress)
    })
    .on('clientError', err => {
      // eslint-disable-next-line no-console
      console.trace(err)
    })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  httpServer = server
}
