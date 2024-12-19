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

display-json:
	cat __fixtures__/file1.json __fixtures__/file2.json

display-yaml:
	cat __fixtures__/file1.yaml __fixtures__/file2.yaml

display-yml:
	cat __fixtures__/file1.yml __fixtures__/file2.yml

gendiff:
	node bin/gendiff.js

run-json:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

run-json-stylish:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json --format stylish

run-json-plain:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json --format plain

run-json-structured:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json --format json

run-yaml:
	node bin/gendiff __fixtures__/file1.yaml __fixtures__/file2.yaml

run-yml:
	node bin/gendiff __fixtures__/file1.yml __fixtures__/file2.yml
