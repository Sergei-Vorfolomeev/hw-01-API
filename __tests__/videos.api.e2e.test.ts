import {app, PATHS} from "../src";

const request = require('supertest')


describe(PATHS.videos,  () => {

    beforeAll(async () => {
        await request(app)
            .delete(PATHS.__test__)
    })

    it('get videos', async () => {
        await request(app)
            .get(PATHS.videos)
            .expect(200, [])
    });
})