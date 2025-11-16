import { Router } from 'express';
import { inferSchema, simpleToZod, validateData, zodToSimple } from './shema'
import { generateTypes } from './type-generator';

export const router = Router();

router.post('/infer-schema', (req, res) => {
    const data = req.body;
    const schema = inferSchema(data);
    const simpleSchema = zodToSimple(schema)
    res.json({ schema: simpleSchema });
});

router.post('/validate', (req, res) => {
    const { schema, object } = req.body;
    const zodSchema = simpleToZod(schema)
    const result = validateData(zodSchema, object);
    res.json({ valid: result.valid, errors: result.errors });
});

router.post('/types', (req, res) => {
    const data = req.body;
    const inferredSchema = inferSchema(data);
    const simpleSchema = zodToSimple(inferredSchema);
    const tsTypes = generateTypes('MyType', simpleSchema);
    res.send(tsTypes);
});