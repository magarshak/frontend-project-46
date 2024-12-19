import { readFileSync } from 'node:fs';
import path from 'node:path';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import getDiffTree from './buildAST.js';

// Take a relative file path and return an absolute path based on the current working directory
const resolvePath = (filePath) => path.resolve(process.cwd(), filePath);
// Get file extension (‘json’, ‘yaml/yml’)
const getExtension = (filename) => path.extname(filename).slice(1);
// Read the file at path and parse its contents, passing the file content and its extension
const getData = (filePath) => parser(readFileSync(filePath, 'utf-8'), getExtension(filePath));

const gendiff = (filePath1, filePath2, format = 'stylish') => {
  // Getting absolute file paths based on the current working directory
  const path1 = resolvePath(filePath1);
  const path2 = resolvePath(filePath2);
  // Parsing of the received data
  const data1 = getData(path1);
  const data2 = getData(path2);
  // Build a difference tree between two datasets
  // Then format the result using the formatter function, passing it the selected format
  return formatter(getDiffTree(data1, data2), format);
};

export default gendiff;
