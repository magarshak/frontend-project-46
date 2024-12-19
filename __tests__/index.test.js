import path from 'node:path';
import gendiff from '../src/index.js';
import resultStylish from '../__fixtures__/resultStylish.js';
import resultPlain from '../__fixtures__/resultPlain.js';
import resultJSON from '../__fixtures__/resultJSON.js';
import stylishDiff from '../src/formatters/stylish.js';
import { iter } from '../src/formatters/plain.js';

const supportedFormats = [
  'json',
  'yml',
];

const resolvePath = (filePath) => path.resolve(process.cwd(), `__fixtures__/${filePath}`);

describe('gendiff', () => {
  supportedFormats.forEach((format) => {
    const filePath1 = resolvePath(`file1.${format}`);
    const filePath2 = resolvePath(`file2.${format}`);

    test(`compares ${format} files with different formatters`, () => {
      expect(gendiff(filePath1, filePath2)).toEqual(resultStylish);
      expect(gendiff(filePath1, filePath2, 'stylish')).toEqual(resultStylish);
      expect(gendiff(filePath1, filePath2, 'plain')).toEqual(resultPlain);
      expect(gendiff(filePath1, filePath2, 'json')).toEqual(resultJSON);
    });
  });

  test('throws error for unsupported data in stylish formatter', () => {
    const invalidData = [{
      type: 'unknownType',
    }];

    expect(() => stylishDiff(invalidData)).toThrow(Error('Unsupported data'));
  });

  test('throws error for unsupported data in plain formatter', () => {
    const unsupportedFixture = [{ type: 'unsupported' }];
    expect(() => iter(unsupportedFixture, []))
      .toThrow(new Error('Unsupported data'));
  });
});
