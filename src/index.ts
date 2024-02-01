import express from 'express'
import {videosRouter} from "./routers/videos-router";
import {db} from "./db/db";
import {testRouter} from "./routers/test-router";

const PORT = 4200

export const PATHS = {
    videos: '/videos',
    __test__: '/testing/all-data'
}

export const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}

export const app = express()

app.use(express.json())
app.use(PATHS.__test__, testRouter(db))
app.use(PATHS.videos, videosRouter(db))

app.listen(PORT, () => {
    console.log(`App is starting on ${PORT}`)
})

