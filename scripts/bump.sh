#!/bin/bash

set -e

if [ "$CI" != "true" ]; then
    echo "Not running in CI, skipping commit"
    exit 0
fi

VERSION="${1}"
if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 0.6.0"
    exit 1
fi

CURRENT=$(node -p "require('./package.json').version")
if [ "$CURRENT" = "$VERSION" ]; then
    echo "package.json is already at version $VERSION, skipping bump"
    exit 0
fi

pnpm version "$VERSION" --no-git-tag-version || {
    echo "Failed to update version in package.json"
    exit 1
}

ACTUAL=$(node -p "require('./package.json').version")
if [ "$ACTUAL" != "$VERSION" ]; then
    echo "Version mismatch: expected $VERSION but package.json contains $ACTUAL"
    exit 1
fi
