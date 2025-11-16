export function generateTypes(typeName: string, schema: any): string {
    let ts = `export interface ${typeName} {\n`;
    for (const key in schema) {
        const value = schema[key];
        if (Array.isArray(value)) {
            ts += `  ${key}: Array<${value[0]}>;\n`;
        } else {
            ts += `  ${key}: ${value};\n`;
        }
    }
    ts += `}\n`;
    return ts;
}