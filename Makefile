.PHONY: check lint test build

check: lint test build

lint:
	cd ts && npx tsc --noEmit

test:
	cd ts && npm run test

build:
	cd ts && npm run build
