import http  from 'http'
import { createApp } from './app'

const app = createApp()
// httpServer should be in global scope
let httpServer // insecure server
const createHttpServer = () => {
    const serverAddress = `http://localhost:3000`
    const server = http.createServer(app.callback())
        .listen(3000, () => {
            console.log(serverAddress)
        })
        .on('clientError', (err) => {
            console.log('Ahh something went wrong')
            console.log('==============')
            console.log(err)
        })

    httpServer = server
}

createHttpServer()
