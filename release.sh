set +x

removeLocalTags() {
    git tag -d $(git tag -l) > /dev/null
}

removeLocalTags
npm run lint
npm run build
npm version patch
git push --tags
npm publish
