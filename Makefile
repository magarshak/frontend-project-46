install:
	npm ci

publish:
	npm publish --dry-run

display:
	cat __fixtures__/file1.json __fixtures__/file2.json

gendiff:
	node bin/gendiff.js

run:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

