import {app, HTTP_STATUS, PATHS} from "../src";

const request = require('supertest')

describe(PATHS.videos,  () => {

    beforeAll(async () => {
        await request(app)
            .delete(PATHS.__test__)
    })

    it('try to get videos and get []', async () => {
        await request(app)
            .get(PATHS.videos)
            .expect(HTTP_STATUS.OK_200, [])
    });

    it('try to create invalid video', async () => {
        const res = await request(app)
            .post(PATHS.videos)
            .send({
                title: '',
                author: ''
            })
            .expect(HTTP_STATUS.BAD_REQUEST_400, {
                errorsMessages: [
                    {
                        message: "title is required",
                        field: "title"
                    },
                    {
                        message: "author is required",
                        field: "author"
                    },
                ]
            })
    })

    it('get videos without invalid video', async () => {
        await request(app)
            .get(PATHS.videos)
            .expect(HTTP_STATUS.OK_200, [])
    });

    let createdVideo: any = null
    it('create new valid video', async () => {
        const res = await request(app)
            .post(PATHS.videos)
            .send({
                title: "newVideo",
                author: "S.V.",
                availableResolutions: ["P144"]
            })
            .expect(HTTP_STATUS.CREATED_201)

        createdVideo = res.body

        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: "newVideo",
            author: "S.V.",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ["P144"]
        })
    })

    it('get videos with created video', async () => {
        await request(app)
            .get(PATHS.videos)
            .expect(HTTP_STATUS.OK_200, [createdVideo])
    });

    it('get video by wrong id', async () => {
        await request(app)
            .get(`${PATHS.videos}/83458`)
            .expect(HTTP_STATUS.NOT_FOUND_404)
    });

    it('get created video by id', async () => {
        await request(app)
            .get(`${PATHS.videos}/${createdVideo.id}`)
            .expect(HTTP_STATUS.OK_200, createdVideo)
    });

    it('update video with wrong id', async () => {
        await request(app)
            .put(`${PATHS.videos}/758395`)
            .send({
                title: 'Updated Title',
                author: 'New Author',
            })
            .expect(HTTP_STATUS.NOT_FOUND_404)
    })

    it('update video with wrong input data', async () => {
        await request(app)
            .put(`${PATHS.videos}/${createdVideo.id}`)
            .send({
                author: 'New Author',
            })
            .expect(HTTP_STATUS.BAD_REQUEST_400, {
                errorsMessages: [
                    {
                        message: "title is required",
                        field: "title"
                    },
                ]
            })
    })

    it('update created video', async () => {
        await request(app)
            .put(`${PATHS.videos}/${createdVideo.id}`)
            .send({
                title: 'Updated Title',
                author: 'New Author',
            })
            .expect(HTTP_STATUS.NO_CONTENT_204)
    })

    it('get updated video by id', async () => {
       const res = await request(app)
            .get(`${PATHS.videos}/${createdVideo.id}`)
            .expect(HTTP_STATUS.OK_200)

        expect(res.body.title).toBe('Updated Title')
        expect(res.body.author).toBe('New Author')
    });

    it('try to delete video with wrong id', async () => {
        await request(app)
            .delete(`${PATHS.videos}/6437463`)
            .expect(HTTP_STATUS.NOT_FOUND_404)
    })

    it('delete created video', async () => {
        await request(app)
            .delete(`${PATHS.videos}/${createdVideo.id}`)
            .expect(HTTP_STATUS.NO_CONTENT_204)
    })

    it('get videos with deleted video', async () => {
        await request(app)
            .get(PATHS.videos)
            .expect(HTTP_STATUS.OK_200, [])
    });
})