import { exactly, expectToMatchSchema, objectWithRequiredProps } from ".."

describe("objectWithRequiredProps", () => {
    it("Succeeds if object has all required properties", () => {
        const objectToTest = {
            a: "1",
            b: "2",
            c: "3",
        }
        const schema = objectWithRequiredProps({
            a: exactly("1"),
            b: exactly("2"),
        })
        expectToMatchSchema(objectToTest, schema)
    })

    it("Fails if object doesn't have all required properties", () => {
        const objectToTest = {
            a: "1",
            c: "3",
        }
        const schema = objectWithRequiredProps({
            a: exactly("1"),
            b: exactly("2"),
        })

        let expectedError
        try {
            expectToMatchSchema(objectToTest, schema)
        } catch (error) {
            expectedError = error
        }
        expect(expectedError.message).toMatch(/should have required property 'b'/)
    })

    it("Accepts optional properties", () => {
        const objectToTest = {
            a: "1",
            c: "3",
        }
        const schema = objectWithRequiredProps({
            a: exactly("1"),
            b: exactly("2"),
        }, {
            optionalProps: ["b"],
        })
        expectToMatchSchema(objectToTest, schema)
    })
})
