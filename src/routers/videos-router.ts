import {Request, Response, Router} from "express";
import {DBType} from "../db/types";

export const videosRouter = (db: DBType) => {
    const router = Router()

    router.get('/', (req: Request, res: Response) => {
        res.send(db.videos)
    })

    return router
}