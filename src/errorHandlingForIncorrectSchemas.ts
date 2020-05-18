import { isJsonSchema } from "."

export const errorMsgForIncorrectSchema = `The object you were passing is not a valid JSON schema. Are you sure you constructed it correctly? From experience, users can sometimes forget to also wrap the main parent object into a "strictObject()" function as well.`

export const throwErrorIfNotACorrectJsonSchema = (schema: any) => {
    const isSchema = isJsonSchema(schema)
    if (!isSchema) {
        throw new Error(errorMsgForIncorrectSchema)
    }
}
