const request = require('supertest');
const server = require('../routes/index');

describe('IMAGE APIS', () => {
    describe('UPLOAD IMAGE API', () => {
        const filePath =
            '/home/chetand/Pictures/Screenshot from 2022-09-19 13-02-37.png';

        it('should upload the test image file', () => {
            return request(server)
                .post('/v1/images/upload')
                .attach('image_file', filePath)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty('message');
                })
                .catch((err) => console.log(err));
        });
    });

    describe('SEARCH IMAGE API', () => {
        it('get images between date range', () => {
            return request(server)
                .get(
                    '/v1/images/search/0/100?from_date=10-09-2022&to_date=21-09-2022'
                )
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toBeTruthy();
                })
                .catch((err) => console.log(err));
        });
    });

    describe('SEARCH IMAGE API', () => {
        it('get images by file_name', () => {
            return request(server)
                .get(
                    '/v1/images/search/0/100?file_name=Screenshot_from_2022-09-19_13-02-37_1663654836767.png'
                )
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toBeTruthy();
                })
                .catch((err) => console.log(err));
        });
    });
});
