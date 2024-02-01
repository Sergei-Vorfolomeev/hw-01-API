import {ErrorsType} from "../db/types";

export const fieldValidator = <T extends {}>(data: T, ...args: string[]) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }
    for (const arg of args) {
        // @ts-ignore
        if (!data[arg]) {
            errors.errorsMessages.push({
                message: `${arg} is required`,
                field: `${arg}`
            })
        }
    }
    return errors
}

