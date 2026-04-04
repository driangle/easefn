---
title: "Add release automation"
id: "01kncz30z"
status: pending
priority: medium
type: feature
tags: ["ci", "release"]
created: "2026-04-04"
---

# Add release automation

## Objective

Automate version bumping and npm publishing. Currently versions are bumped manually in `package.json` and publishing requires manual `npm publish`. Add tooling (e.g. changesets, release-please, or a simple release script) to streamline this.

## Tasks

- [ ] Evaluate release tooling options (changesets vs release-please vs custom script)
- [ ] Set up chosen tool and configure for the `ts/` package
- [ ] Add a GitHub Actions workflow for automated npm publishing on release/tag
- [ ] Document the release process in README or a RELEASING.md

## Acceptance Criteria

- Releases can be triggered with minimal manual steps
- npm package is published automatically when a release is created
- Version in `package.json` stays in sync with git tags
- Changelog is generated from commit history or changeset entries
