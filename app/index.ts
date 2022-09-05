import webpush from './config/webpush';
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import database from './config/database';
import initializeRoutes from './routes';

const app = express()
const port = 8080

app.use(express.static(path.join(__dirname, '../client')))
app.use(bodyParser.json())
database();
webpush()
initializeRoutes(app)
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})