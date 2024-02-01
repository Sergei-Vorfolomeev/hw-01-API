import {DBType} from "../db/types";
import {Router, Request, Response} from "express";
import {HTTP_STATUS, PATHS} from "../index";

export const testRouter = (db: DBType) => {
    const router = Router()

    router.delete('/', (req: Request, res: Response) => {
        db.videos = []
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    })

    return router
}