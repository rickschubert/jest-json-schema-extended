import {matchersWithOptions} from "jest-json-schema"

export const setup = () => {
    expect.extend(
        matchersWithOptions({
            allErrors: true,
        })
    )
}
