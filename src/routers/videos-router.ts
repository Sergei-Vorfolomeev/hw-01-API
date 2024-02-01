import {Request, Response, Router} from "express";
import {DBType, ErrorsType, GetVideosRequestBody, VideoType} from "../db/types";
import {HTTP_STATUS} from "../index";
import {fieldValidator} from "../utils/field-validator";

export const videosRouter = (db: DBType) => {
    const router = Router()

    router.get('/', (req: Request, res: Response) => {
        return res.send(db.videos)
    })

    router.get('/:id', (req: Request, res: Response) => {
        const videoId = +req.params.id
        const video = db.videos.find(v => v.id === videoId)
        if (video) {
            res.status(HTTP_STATUS.OK_200).send(video)
        } else {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }
    })

    router.post('/', (req: Request<any, VideoType, GetVideosRequestBody>, res: Response<VideoType | ErrorsType>) => {
        const errors = fieldValidator<GetVideosRequestBody>(req.body, 'title', 'author', 'availableResolutions')
            if (errors.errorsMessages.length) {
                res.status(HTTP_STATUS.BAD_REQUEST_400).send(errors)
            } else {
                const newVideo = {
                    id: Date.now(),
                    title: req.body.title,
                    author: req.body.author,
                    canBeDownloaded: true,
                    minAgeRestriction: null,
                    createdAt: new Date().toISOString(),
                    publicationDate: new Date().toISOString(),
                    availableResolutions: req.body.availableResolutions,
                }
                db.videos.push(newVideo)
                res.status(HTTP_STATUS.CREATED_201).send(newVideo)
            }
    })

    router.delete('/:id', (req: Request, res: Response) => {
        const videoId = +req.params.id
        const index = db.videos.findIndex(v => v.id === videoId)
        if (index > -1) {
            db.videos.splice(index, 1)
            res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
        } else {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }
    })

    return router
}