import {expectToMatchSchema} from ".."
import {errorMsgForIncorrectSchema} from "../errorHandlingForIncorrectSchemas"

describe("Errors on incorrect schema", () => {
    it("errors if an incorrect jSON schema is supplied", () => {
        const objectToMatch = {
            a: 1,
            b: true,
        }
        const notACorrectJsonSchema = {
            hello: "world",
        }

        let expectedError: Error
        try {
            expectToMatchSchema(objectToMatch, notACorrectJsonSchema as any)
        } catch (error) {
            expectedError = error
        }
        expect(expectedError).toBeDefined()
        expect(expectedError.message).toContain(errorMsgForIncorrectSchema)
    })
})
