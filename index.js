import express from "express"

import dotenv from "dotenv"

import { router } from "./routers/router.js"

dotenv.config({ path: "./config.env" })

let app = express()

let port = process.env.port || 9870

app.use(express.json())

app.use(router)

app.listen(port, () => {

    console.log(`server is running port:${port} | http://127.0.0.1:${port}`)
    
})