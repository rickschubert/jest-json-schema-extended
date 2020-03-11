const path = require("path")
const rootDir = path.join(__dirname, "./dist/tests")

const testMatch = ["**/*.spec.js"]
const ignoredTests = ["node_modules/"]

module.exports = {
    testMatch,
    testPathIgnorePatterns: ignoredTests,
    rootDir,
    setupFilesAfterEnv: [path.join(rootDir, "setup.js")],
    verbose: true,
    reporters: ["default"],
}
