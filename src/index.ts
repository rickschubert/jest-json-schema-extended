import {prettyPrintObject} from "./general"

/**
 * Assert that an object matches a JSON schema. Prints out errors if mismatches found.
 * @param {Object} object The JSON object to test.
 * @param {Object} schema The JSON schema to test the object against.
 */
export const expectToMatchSchema = (object: object, schema: json4.schema) => {
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
): json4.schema => {
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
export const objectWithRequiredProps = (properties: object): json4.schema => {
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
    itemSchema: json4.schema,
    options: {
        minItems?: number
    } = {}
): json4.schema => {
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
export const objectType: json4.schema = {
    type: "object",
}

/**
 * Asserts that the property is a string. The string is not allowed to be empty - use stringTypeCanBeEmpty instead if emptiness is needed.
 */
export const stringType: json4.schema = {
    type: "string",
    minLength: 1,
}

/**
 * Asserts that the property is a string. Allows the string to be empty.
 */
export const stringTypeCanBeEmpty: json4.schema = {
    type: "string",
}

/**
 * Asserts that the property is a string matching the regular expression provided.
 * @param {RegExp} regex
 */
export const stringTypeMatching = (regex: string): json4.schema => ({
    type: "string",
    minLength: 1,
    pattern: regex,
})

/**
 * Asserts that the property is a string looking like an URL.
 */
export const urlType: json4.schema = stringTypeMatching("^http(s)?://.+..+")

/**
 * Asserts that the property is a string in date-time format.
 */
export const dateTime: json4.schema = {
    type: "string",
    format: "date-time",
}

/**
 * Asserts that the property is a string looking like a UUID.
 */
export const uuidType: json4.schema = {
    type: "string",
    format: "uuid",
}

/**
 * Asserts that the property is exactly the string as specified.
 * @param {String} expStr
 */
export const stringTypeExact = (expStr: string): json4.schema => ({
    type: "string",
    pattern: `^${expStr}$`,
})

/**
 * Asserts that the property is a string looking like a UNIX path.
 */
export const stringTypePath: json4.schema = {
    type: "string",
    pattern: "^(.*)/(.*)$",
}

/**
 * Asserts that the property is either a string (with at least 1 character) or `null`.
 */
export const stringTypeOrNull: json4.schema = {
    type: ["string", "null"],
    minLength: 1,
}

/**
 * Asserts that the property is a number.
 */
export const numberType: json4.schema = {
    type: "number",
}

/**
 * Asserts that the property is a number greater than the given number.
 * @param {Number} minimum
 */
export const numberTypeGreaterThan = (minimum: number): json4.schema => ({
    type: "number",
    minimum,
})

/**
 * Asserts that the property is a number less than the given number.
 * @param {Number} maximum
 */
export const numberTypeLessThan = (maximum: number): json4.schema => ({
    type: "number",
    maximum,
})

/**
 * Asserts that the property holds the value `null`.
 */
export const nullType: json4.schema = {
    type: "null",
}

/**
 * Asserts that the property is a boolean.
 */
export const booleanType: json4.schema = {
    type: "boolean",
}

/**
 * Asserts that the property is exactly the value as specified. Can be anything - an object, an array, a string, a boolean, ...
 * @param {any} valueExpected
 */
export const exactly = (valueExpected: any) => ({
    enum: [valueExpected],
})

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
export const arrayType: json4.schema = {
    type: "array",
}

/**
 * Asserts that the property is an array of the exactly specified length.
 * @param {Number} length
 */
export const arrayTypeOfLength = (length: number): json4.schema => ({
    type: "array",
    minItems: length,
    maxItems: length,
})

/**
 * Loosely asserts that the property is an array of objects.
 */
export const arrayOfObjectsType: json4.schema = {
    type: "array",
    items: {
        type: "object",
    },
}

type IJsonSchemaOrObject = json4.schema | object

/**
 * Helper function to check whether the passed in object is a JSON schema or a plain object.
 * @param {Object} toBeDetermined
 */
export const isJsonSchema = (
    toBeDetermined: IJsonSchemaOrObject
): toBeDetermined is json4.schema => {
    if ((toBeDetermined as json4.schema).type) {
        return true
    }
    return false
}

export {setup} from "./setup"
