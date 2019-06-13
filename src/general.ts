export const prettyPrintObject = (object: object): string => {
    return JSON.stringify(object, undefined, 2)
}
