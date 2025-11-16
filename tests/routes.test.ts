import request from 'supertest';
import express from 'express';
import { router } from '../src/routes';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use('/api', router);

describe('API endpoints', () => {
    test('/infer-schema returns a readable schema', async () => {
        const res = await request(app)
            .post('/api/infer-schema')
            .send({ name: "Leo", age: 30 });

        expect(res.status).toBe(200);
        expect(res.body.schema).toHaveProperty('name');
        expect(res.body.schema.name).toBe('string');
    });

    test('/validate returns errors for invalid data', async () => {
        const res = await request(app)
            .post('/api/validate')
            .send({
                schema: { name: 'string', age: 'number' },
                object: { name: "Leo", age: "30" }
            });

        expect(res.status).toBe(200);
        expect(res.body.valid).toBe(false);
        expect(res.body.errors.length).toBeGreaterThan(0);
    });
});