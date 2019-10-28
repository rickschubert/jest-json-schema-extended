jest-json-schema-extended
=========================

An extension of the popular [jest-json-schema](https://www.npmjs.com/package/jest-json-schema) package - JSON schema matching for jest.

# Example
```js
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
                favouriteTvShow: "The Simpsons"
                goodAtCooking: false,
            }
        },
        {
            id: 2,
            lastName: "Haroldson",
            firstName: "Doris",
            additionalInfo: {
                favouriteTvShow: "Parks & Recreation",
                married: true
            }
        },
    ]
}

const {
    dateTime, strictObject, uuidType, numberType, booleanType, arrayOfItems,
    exactly, stringType, stringTypeCanBeEmpty, expectToMatchSchema
} = require("jest-json-schema-extended")

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
        })
    }))
})

expectToMatchSchema(objectToTest, schema)
```

# Install
`npm i --save-dev jest-json-schema-extended`

# Usage
- In order to be able to use `expectToMatchSchema` inside jest, you need to call the following inside your test file (or you place it inside a [test framework setup file](https://jestjs.io/docs/en/configuration#setupfiles-array)):

```js
const {setup} = require("jest-json-schema-extended");
setup()
```

# Content

<a name="objectType"></a>

## objectType
Asserts that the property is an object.


<a name="stringType"></a>

## stringType
Asserts that the property is a string. The string is not allowed to be empty - use stringTypeCanBeEmpty instead if emptiness is needed.


<a name="stringTypeCanBeEmpty"></a>

## stringTypeCanBeEmpty
Asserts that the property is a string. Allows the string to be empty.


<a name="urlType"></a>

## urlType
Asserts that the property is a string looking like an URL.


<a name="dateTime"></a>

## dateTime
Asserts that the property is a string in date-time format.


<a name="uuidType"></a>

## uuidType
Asserts that the property is a string looking like a UUID.


<a name="stringTypePath"></a>

## stringTypePath
Asserts that the property is a string looking like a UNIX path.


<a name="stringTypeOrNull"></a>

## stringTypeOrNull
Asserts that the property is either a string (with at least 1 character) or `null`.


<a name="numberType"></a>

## numberType
Asserts that the property is a number.


<a name="nullType"></a>

## nullType
Asserts that the property holds the value `null`.


<a name="booleanType"></a>

## booleanType
Asserts that the property is a boolean.


<a name="arrayType"></a>

## arrayType
Asserts that the property is an array.


<a name="arrayOfObjectsType"></a>

## arrayOfObjectsType
Loosely asserts that the property is an array of objects.


<a name="expectToMatchSchema"></a>

## expectToMatchSchema(object, schema)
Assert that an object matches a JSON schema. Prints out errors if mismatches found.



| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The JSON object to test. |
| schema | <code>Object</code> | The JSON schema to test the object against. |

<a name="strictObject"></a>

## strictObject(properties, [options])
Asserts that the object contains all the properties specified - additonal properties are not allowed.



| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | Asserts for any key on the object that the property exists. Example: `{propOne: stringType, propTwo: numberType}` |
| [options] | <code>Object</code> | Accepts a property `optionalProps` hich can be a list of optional properties that don't need to be present. |

<a name="objectWithRequiredProps"></a>

## objectWithRequiredProps(properties)
Asserts that the object contains all the properties specified - additional properties are allowed.



| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | Asserts for any key on the object that the property exists. Example: `{propOne: stringType, propTwo: numberType}` |

<a name="arrayOfItems"></a>

## arrayOfItems(itemSchema, options)
Assert a JSON schema against each array item.



| Param | Type | Description |
| --- | --- | --- |
| itemSchema |  |  |
| options | <code>Object</code> | Accepts an option property `minItems` which can be used to check that the array contains at least x amount of items. |

<a name="stringTypeMatching"></a>

## stringTypeMatching(regex)
Asserts that the property is a string matching the regular expression provided.



| Param | Type |
| --- | --- |
| regex | <code>RegExp</code> |

<a name="stringTypeExact"></a>

## stringTypeExact(expStr)
Asserts that the property is exactly the string as specified.



| Param | Type |
| --- | --- |
| expStr | <code>String</code> |

<a name="numberTypeGreaterThan"></a>

## numberTypeGreaterThan(minimum)
Asserts that the property is a number greater than the given number.



| Param | Type |
| --- | --- |
| minimum | <code>Number</code> |

<a name="numberTypeLessThan"></a>

## numberTypeLessThan(maximum)
Asserts that the property is a number less than the given number.



| Param | Type |
| --- | --- |
| maximum | <code>Number</code> |

<a name="exactly"></a>

## exactly(valueExpected)
Asserts that the property is exactly the value as specified. Can be anything - an object, an array, a string, a boolean, ...



| Param | Type |
| --- | --- |
| valueExpected | <code>any</code> |

<a name="oneOf"></a>

## oneOf(valuesExpected)
Asserts that the property received is one of the values given in the array.



| Param | Type |
| --- | --- |
| valuesExpected | <code>Array.&lt;any&gt;</code> |

<a name="arrayTypeOfLength"></a>

## arrayTypeOfLength(length)
Asserts that the property is an array of the exactly specified length.



| Param | Type |
| --- | --- |
| length | <code>Number</code> |

<a name="isJsonSchema"></a>

## isJsonSchema(toBeDetermined)
Helper function to check whether the passed in object is a JSON schema or a plain object.



| Param | Type |
| --- | --- |
| toBeDetermined | <code>Object</code> |
