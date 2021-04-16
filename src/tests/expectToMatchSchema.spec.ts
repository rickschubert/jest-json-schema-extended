import { booleanType, expectToMatchSchema, nullType, numberType, strictObject, stringType } from ".."

describe("expectToMatchSchema", () => {
    describe("Passing object", () => {
        it("Passes if object is passed that matches schema", () => {
            const objectToTest = {
                hello: "world",
                a: 1,
                b: false,
                c: null,
            }
            expectToMatchSchema(objectToTest, strictObject({
                hello: stringType,
                a: numberType,
                b: booleanType,
                c: nullType,
            }))
        })

        it("Fails if object is passed that does not match schema", () => {
            let expectedError
            const objectToTest = {
                hello: "world",
                a: 1,
                b: false,
                c: null,
            }
            try {
                expectToMatchSchema(objectToTest, strictObject({
                    hello: stringType,
                    a: stringType,
                    b: booleanType,
                    c: nullType,
                }))
            } catch (error) {
                expectedError = error
            }
            expect(expectedError.message).toContain(".a should be string")
        })
    })
    describe("Passing other primitive value", () => {
        it("Passes if primitive value is passed that matches schema", () => {
            expectToMatchSchema(false, booleanType)
        })
        it("Fails if primitive value is passed that does not match schema", () => {
            let expectedError
            try {
                expectToMatchSchema(false, stringType)
            } catch (error) {
                expectedError = error
            }
            expect(expectedError.message).toContain("should be string")
        })
    })
})
