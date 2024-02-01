import {Request, Response, Router} from "express";
import {DBType, ErrorsType, GetVideosRequestBody, VideoType} from "../db/types";
import {HTTP_STATUS} from "../index";
import {fieldValidator} from "../utils/field-validator";

export const videosRouter = (db: DBType) => {
    const router = Router()

    router.get('/', (req: Request, res: Response) => {
        return res.send(db.videos)
    })

    router.post('/', (req: Request<any, VideoType, GetVideosRequestBody>, res: Response<VideoType | ErrorsType>) => {
        const validator = fieldValidator<GetVideosRequestBody>('title', 'author', 'availableResolutions')
        const errors = validator(req.body)
            if (errors.errorsMessages.length) {
                res.status(HTTP_STATUS.BAD_REQUEST_400).send(errors)
            } else {
                const newVideo = {
                    id: +Date.now(),
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

    return router
}