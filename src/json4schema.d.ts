/* eslint-disable no-unused-vars */
declare namespace json4 {
    interface schema {
        type: string | string[]
        required?: string[]
        properties?: object
        additionalProperties?: boolean
        minLength?: number
        minItems?: number
        maxItems?: number
        format?: "date-time" | "uuid"
        pattern?: string
        items?: schema
    }
}

declare const expect: any
