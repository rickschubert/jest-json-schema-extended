const {
    dateTime, strictObject, uuidType, numberType, booleanType, arrayOfItems,
    exactly, stringType, stringTypeCanBeEmpty, expectToMatchSchema, objectWithRequiredProps,
} = require("../index")

describe("Basic example", () => {
    it("Readme test", () => {
        const objectToTest = {
            id: "47bddd19-e142-45ee-8679-463be8763022",
            enabled: false,
            created: "2019-06-12T15:08:40.292Z",
            requestors: [],
            owners: [
                {
                    id: 1,
                    lastName: "Robson",
                    firstName: "",
                    additionalInfo: {
                        favouriteTvShow: "The Simpsons",
                        goodAtCooking: false,
                    },
                },
                {
                    id: 2,
                    lastName: "Haroldson",
                    firstName: "Doris",
                    additionalInfo: {
                        favouriteTvShow: "Parks & Recreation",
                        married: true,
                    },
                },
            ],
        }

        const schema = strictObject({
            id: uuidType,
            enabled: booleanType,
            created: dateTime,
            requestors: exactly([]),
            owners: arrayOfItems(strictObject({
                id: numberType,
                lastName: stringType,
                firstName: stringTypeCanBeEmpty,
                additionalInfo: objectWithRequiredProps({
                    favouriteTvShow: stringType,
                }),
            })),
        })

        expectToMatchSchema(objectToTest, schema)
    })
})
