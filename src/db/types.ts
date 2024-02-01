export type DBType = {
    videos: VideoType[]
}

export type VideoType = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction?: any;
    createdAt: string;
    publicationDate: string;
    availableResolutions: string[];
}

export enum Resolutions {
    P144 = 144,
    P240 = 240,
    P360 = 360,
    P480 = 480,
    P720 = 720,
    P1080 = 721,
    P1440 = 1440,
    P2160 = 2160,
}

export type GetVideosRequestBody = Pick<VideoType, 'title' | 'author' | 'availableResolutions'>

type ErrorsMessagesType = {
    message: string
    field: string
}
export type ErrorsType = {
    errorsMessages: ErrorsMessagesType[]
}
