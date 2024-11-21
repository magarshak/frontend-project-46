import gendiff from '../src/index.js';
import result from '../__fixtures__/result.js';
import path from 'node:path';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('check json plain', () => {
   expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(result);
});

/*
test('check json plain', () => {
   expect(gendiff('file1.json', 'file2.json')).toEqual(result);
});
*/
