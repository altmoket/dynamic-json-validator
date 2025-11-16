import { inferSchema, zodToSimple, validateData, simpleToZod } from '../src/shema';

describe('Schema utilities', () => {
    const sampleData = {
        name: "Leo",
        age: 30,
        active: true,
        tags: ["dev", "ts"]
    };

    test('inferSchema should create a Zod object', () => {
        const schema = inferSchema(sampleData);
        expect(schema).toHaveProperty('parse'); // Zod schema has parse method
    });

    test('zodToSimple should return simple types', () => {
        const schema = inferSchema(sampleData);
        const simple = zodToSimple(schema);
        expect(simple).toEqual({
            name: 'string',
            age: 'number',
            active: 'boolean',
            tags: ['string']
        });
    });

    test('validateData should detect invalid data', () => {
        const schema = inferSchema(sampleData);
        const result = validateData(schema, {
            ...sampleData,
            age: "30", // wrong type
            tags: ["dev", 1] // mixed types
        });
        expect(result.valid).toBe(false);
        expect(result.errors?.length).toBeGreaterThan(0);
    });

    test('simpleToZod should reconstruct a Zod schema', () => {
        const simple = {
            name: 'string',
            age: 'number',
            active: 'boolean',
            tags: ['string']
        };
        const zodSchema = simpleToZod(simple);
        const valid = zodSchema.safeParse(sampleData);
        expect(valid.success).toBe(true);
    });
});