
const checkIfSuppliedSchemaIsActuallyASchema = (schema: any): boolean => {
    const isAnObjectWithProperties = Object.keys(schema).length > 0
    const hasTypeProperty = typeof schema.type === "string"
    return isAnObjectWithProperties && hasTypeProperty
}

export const errorMsgForIncorrectSchema = `The object you were passing is not a valid JSON schema. Are you sure you constructed it correctly? From experience, users can sometimes forget to also wrap the main parent object into a "strictObject()" function as well.`

export const throwErrorIfNotACorrectJsonSchema = (schema: any) => {
    const isSchema = checkIfSuppliedSchemaIsActuallyASchema(schema)
    if (!isSchema) {
        throw new Error(errorMsgForIncorrectSchema)
    }
}
