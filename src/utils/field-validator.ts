import {ErrorsType} from "../db/types";

export function fieldValidator<T extends object>(body: T) {
    const errors: ErrorsType = {
        errorsMessages: []
    }
    const methods = {
        isBoolean: (key: string) => {
            const valueType = typeof body[key as keyof T]
            const value = body[key as keyof T]
            if (value) {
                if (valueType !== 'boolean') {
                    errors.errorsMessages.push({message: `${key} must be boolean type`, field: key})
                }
            }

            return methods
        },

        isNumber: (key: string) => {
            const valueType = typeof body[key as keyof T]
            const value = body[key as keyof T]
            if (value) {
                if (valueType !== 'number') {
                    errors.errorsMessages.push({message: `${key} must be number type`, field: key})
                }
            }
            return methods
        },

        minMax: (key: string, min: number, max: number) => {
            const valueType = typeof body[key as keyof T]
            const value = body[key as keyof T]
            if (value) {
                if (valueType === 'number') {
                    const value = body[key as keyof T]
                    if (+value < min || +value > max) {
                        errors.errorsMessages.push({message: `${key} must be from ${min} to ${max}`, field: key})
                    }
                }
            }
            return methods
        },

        maxLength: (key: string, max: number) => {
            const valueType = typeof body[key as keyof T]
            const value = body[key as keyof T]
            if (value && valueType === 'string') {
                if (value.toString().length > max) {
                    errors.errorsMessages.push({message: `${key} must be no longer ${max}`, field: key})
                }
            }
            return methods
        },

        isDate: (key: string) => {
            const valueType = typeof body[key as keyof T]
            const value = body[key as keyof T]
            if (valueType !== 'string') {
                if(value) {
                    errors.errorsMessages.push({message: `${key} must be string`, field: key})
                }
            }
            return methods
        },

        requiredFields: (...args: string[]) => {
            for (const arg of args) {
                if (!body[arg as keyof T]) {
                    errors.errorsMessages.push({
                        message: `${arg} is required`,
                        field: `${arg}`
                    })
                }
            }
            return methods
        },

        availableResolutions: (passedResolutions: string[] | undefined) => {
            const resolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
            if (passedResolutions) {
                for (let el of passedResolutions) {
                    if (!resolution.includes(el)) {
                        errors.errorsMessages.push({
                            message: `availableResolutions are incorrect`,
                            field: 'availableResolutions'
                        })
                    }
                }
            }
            return methods
        },

        getErrors: (): ErrorsType => {
            return errors
        }
    }
    return methods
}

