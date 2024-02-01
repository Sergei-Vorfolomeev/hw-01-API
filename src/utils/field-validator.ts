import {ErrorsType} from "../db/types";

export const fieldValidator = <T extends {}>(...args: string[]) => {
    const errors: ErrorsType = {
          errorsMessages: []
    }
    return (data: T) => {
        if (typeof data !== 'object') {
            errors.errorsMessages.push({
                message: `body required`,
                field: `title, author, availableResolutions`
            })
            return errors
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
}

