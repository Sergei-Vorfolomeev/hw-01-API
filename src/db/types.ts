export type DBType = {
    videos: VideoType[]
}

export type VideoType = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded?: boolean;
    minAgeRestriction?: any;
    createdAt?: string;
    publicationDate?: string;
    availableResolutions?: string[];
}

export type CreateVideoInputModel = {
    title: string
    author: string
    availableResolutions?: string[]
    canBeDownloaded?: boolean
    minAgeRestriction? : number
}

export type UpdateVideoInputModel = {
	title: string;
	author: string;
	availableResolutions?: string[];
	canBeDownloaded?: boolean;
	minAgeRestriction?: number;
	publicationDate?: string;
}

type ErrorsMessagesType = {
    message: string
    field: string
}
export type ErrorsType = {
    errorsMessages: ErrorsMessagesType[]
}
