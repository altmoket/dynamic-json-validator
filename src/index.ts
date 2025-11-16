import { inferSchema, validateData, zodToSimple } from "./shema";

const schema = {
    "name": "Leo",
    "age": 30,
    "active": true,
    "tags": ["dev", "ts"]
};

const inferredSchema = inferSchema(schema);
console.log("Inferred Schema:", inferredSchema);

const schemaToSimple = zodToSimple(inferredSchema);
console.log("Schema to Simple:", schemaToSimple);

const isValid = validateData(inferredSchema, {
    "name": "Leo",
    "age": "30",
    "active": true,
    "aaaa": 8,
    "tags": [4, "dev", "ts", 6]
});
console.log("Is Valid:", isValid);