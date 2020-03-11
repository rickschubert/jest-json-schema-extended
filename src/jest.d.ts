// eslint-disable-next-line no-unused-vars
declare namespace jest {
    interface Matchers<R> {
        toMatchSchema: (schema: object) => void
    }
}
