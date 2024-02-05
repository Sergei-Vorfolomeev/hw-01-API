import {Request, Response, NextFunction} from "express";
import {fieldValidator} from "../utils/field-validator";
import {CreateVideoInputModel} from "../db/types";
import {HTTP_STATUS} from "../index";

export const videoValidator = (req: Request, res: Response, next: NextFunction) => {
    const {availableResolutions} = req.body
    const errors = fieldValidator<CreateVideoInputModel>(req.body)
        .requiredFields('title', 'author')
        .maxLength('title', 40)
        .maxLength('author', 20)
        .isBoolean('canBeDownloaded')
        .isNumber('minAgeRestriction')
        .minMax('minAgeRestriction', 1, 18)
        .isDate('createdAt')
        .isDate('publicationDate')
        .availableResolutions(availableResolutions)
        .getErrors()
    if (errors.errorsMessages.length) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).send(errors)
    } else {
        next()
    }
}
