import { z, ZodTypeAny, ZodArray, ZodObject, ZodAny, ZodError } from 'zod'

export const inferSchema = (data: any): any => {
    if (typeof data === 'string') return z.string()
    if (typeof data === 'number') return z.number()
    if (typeof data === 'boolean') return z.boolean()
    if (Array.isArray(data)) {
        return z.array(inferSchema(data[0]));
    }
    if (data !== null && typeof data === 'object') {
        const shape: any = {};
        for (const key in data) {
            shape[key] = inferSchema(data[key]);
        }
        return z.object(shape).strict()
    }
    return z.any();
}

export const zodToSimple = (obj: ZodTypeAny): any => {
    if (obj instanceof ZodObject) {
        const schema = obj as ZodObject<any>;
        const shape = (schema as any).shape ?? (schema as any)._def?.shape;
        const result: any = {};
        for (const key in shape) {
            result[key] = zodToSimple(shape[key]);
        }
        return result;
    }
    else if (obj instanceof ZodArray) {
        const arr = obj as ZodArray<any>;
        const element = (arr as any).element ?? (arr as any)._def?.type ?? (arr as any)._def?.schema;
        return [zodToSimple(element)];
    } else {
        const typeName = (obj as any)._def?.typeName || (obj as any).def?.type || 'any';
        return typeName.toLowerCase().replace('zod', '');
    }
}

export function simpleToZod(simple: any): ZodTypeAny {
    if (Array.isArray(simple)) {
        return z.array(simpleToZod(simple[0]));
    }

    if (typeof simple === 'object' && simple !== null) {
        const shape: any = {};
        for (const key in simple) {
            shape[key] = simpleToZod(simple[key]);
        }
        return z.object(shape).strict();
    }

    switch (simple) {
        case 'string': return z.string();
        case 'number': return z.number();
        case 'boolean': return z.boolean();
        default: return z.any();
    }
}

export const validateData = (schema: ZodTypeAny, data: any) => {
    const result = schema.safeParse(data);
    if (result.success) {
        return { valid: true, errors: null };
    } else {
        return { valid: false, errors: result.error.issues };
    }
};
