import { dateTime, expectToMatchSchema, uuidType } from ".."

describe("Format types", () => {
    it("UUID type", () => {
        expectToMatchSchema("54a341de-c108-46b2-929e-06d4dbbcd9db", uuidType)
    })

    it("Date Time type", () => {
        expectToMatchSchema("2021-04-20T10:13:01.529Z", dateTime)
    })
})
