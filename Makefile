install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

display:
	cat __fixtures__/file1.json __fixtures__/file2.json

gendiff:
	node bin/gendiff.js

run:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

