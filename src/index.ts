import {prettyPrintObject} from "./general"

export interface Json4Schema {
    type: string | string[]
    required?: string[]
    properties?: object
    additionalProperties?: boolean
    minLength?: number
    minItems?: number
    maxItems?: number
    format?: "date-time" | "uuid"
    pattern?: string
    items?: Json4Schema
    minimum?: number
    maximum?: number
}

/**
 * Assert that an object matches a JSON schema. Prints out errors if mismatches found.
 * @param {Object} object The JSON object to test.
 * @param {Object} schema The JSON schema to test the object against.
 */
export const expectToMatchSchema = (object: object, schema: Json4Schema) => {
    try {
        expect(object).toMatchSchema(schema)
    } catch (error) {
        error.message = `${
            error.message
        }\nSchema mismatch. Actual result:\n${prettyPrintObject(object)}\n`
        throw error
    }
}

/**
 * Asserts that the object contains all the properties specified - additonal properties are not allowed.
 * @param {Object} properties Asserts for any key on the object that the property exists. Example: `{propOne: stringType, propTwo: numberType}`
 * @param {Object} [options] Accepts a property `optionalProps` hich can be a list of optional properties that don't need to be present.
 */
export const strictObject = (
    properties: object,
    options: {
        optionalProps?: string[]
    } = {}
): Json4Schema => {
    const required = options.optionalProps
        ? Object.keys(properties).filter((objProp) => {
            return !options.optionalProps.includes(objProp)
        })
        : Object.keys(properties)
    return {
        type: "object",
        properties,
        additionalProperties: false,
        required,
    }
}

/**
 * Asserts that the object contains all the properties specified - additional properties are allowed.
 * @param {Object} properties Asserts for any key on the object that the property exists. Example: `{propOne: stringType, propTwo: numberType}`
 */
export const objectWithRequiredProps = (properties: object): Json4Schema => {
    return {
        type: "object",
        properties,
        additionalProperties: true,
        required: Object.keys(properties),
    }
}

/**
 * Assert a JSON schema against each array item.
 * @param itemSchema
 * @param {Object} options Accepts an option property `minItems` which can be used to check that the array contains at least x amount of items.
 */
export const arrayOfItems = (
    itemSchema: Json4Schema,
    options: {
        minItems?: number
    } = {}
): Json4Schema => {
    const minItems = options.minItems !== undefined ? options.minItems : 1
    return {
        type: "array",
        items: itemSchema,
        minItems,
    }
}

/**
 * Asserts that the property is an object.
 */
export const objectType: Json4Schema = {
    type: "object",
}

/**
 * Asserts that the property is a string. The string is not allowed to be empty - use stringTypeCanBeEmpty instead if emptiness is needed.
 */
export const stringType: Json4Schema = {
    type: "string",
    minLength: 1,
}

/**
 * Asserts that the property is a string. Allows the string to be empty.
 */
export const stringTypeCanBeEmpty: Json4Schema = {
    type: "string",
}

/**
 * Asserts that the property is a string matching the regular expression provided.
 * @param {RegExp} regex
 */
export const stringTypeMatching = (regex: string): Json4Schema => ({
    type: "string",
    minLength: 1,
    pattern: regex,
})

/**
 * Asserts that the property is a string looking like an URL.
 */
export const urlType: Json4Schema = stringTypeMatching("^http(s)?://.+..+")

/**
 * Asserts that the property is a string in date-time format.
 */
export const dateTime: Json4Schema = {
    type: "string",
    format: "date-time",
}

/**
 * Asserts that the property is a string looking like a UUID.
 */
export const uuidType: Json4Schema = {
    type: "string",
    format: "uuid",
}

/**
 * Asserts that the property is exactly the string as specified.
 * @param {String} expStr
 */
export const stringTypeExact = (expStr: string): Json4Schema => ({
    type: "string",
    pattern: `^${expStr}$`,
})

/**
 * Asserts that the property is a string looking like a UNIX path.
 */
export const stringTypePath: Json4Schema = {
    type: "string",
    pattern: "^(.*)/(.*)$",
}

/**
 * Asserts that the property is either a string (with at least 1 character) or `null`.
 */
export const stringTypeOrNull: Json4Schema = {
    type: ["string", "null"],
    minLength: 1,
}

/**
 * Asserts that the property is a number.
 */
export const numberType: Json4Schema = {
    type: "number",
}

/**
 * Asserts that the property is a number greater than the given number.
 * @param {Number} minimum
 */
export const numberTypeGreaterThan = (minimum: number): Json4Schema => ({
    type: "number",
    minimum,
})

/**
 * Asserts that the property is a number less than the given number.
 * @param {Number} maximum
 */
export const numberTypeLessThan = (maximum: number): Json4Schema => ({
    type: "number",
    maximum,
})

/**
 * Asserts that the property holds the value `null`.
 */
export const nullType: Json4Schema = {
    type: "null",
}

/**
 * Asserts that the property is a boolean.
 */
export const booleanType: Json4Schema = {
    type: "boolean",
}

/**
 * Asserts that the property received is one of the values given in the array.
 * @param {Array<any>} valuesExpected
 */
export const oneOf = (valuesExpected: any[]) => ({
    enum: valuesExpected,
})

/**
 * Asserts that the property is an array.
 */
export const arrayType: Json4Schema = {
    type: "array",
}

/**
 * Asserts that the property is an array of the exactly specified length.
 * @param {Number} length
 */
export const arrayTypeOfLength = (length: number): Json4Schema => ({
    type: "array",
    minItems: length,
    maxItems: length,
})

/**
 * Asserts that the property is exactly the value as specified. Can be anything - an object, an array, a string, a boolean, ...
 * @param {any} valueExpected
 */
export const exactly = (valueExpected: any) => ({
    enum: [valueExpected],
})

/**
 * Loosely asserts that the property is an array of objects.
 */
export const arrayOfObjectsType: Json4Schema = {
    type: "array",
    items: {
        type: "object",
    },
}

type IJsonSchemaOrObject = Json4Schema | object

/**
 * Helper function to check whether the passed in object is a JSON schema or a plain object.
 * @param {Object} toBeDetermined
 */
export const isJsonSchema = (
    toBeDetermined: IJsonSchemaOrObject
): toBeDetermined is Json4Schema => {
    if ((toBeDetermined as Json4Schema).type) {
        return true
    }
    return false
}

export {setup} from "./setup"
