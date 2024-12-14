import path from 'node:path';
import gendiff from '../src/index.js';
import result from '../__fixtures__/result.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('check json plain', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(result);
});

test('check yaml plain', () => {
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(result);
});

test('check yml plain', () => {
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(result);
});
