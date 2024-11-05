import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';
/*
// Getting an absolute and relative path
const getPath = (filePath) => path.resolve(process.cwd(), filePath)
// Reading the file by the received path
const read = (filePath) => readFileSync(getPath(filePath))
// Parsing of the received file
const parser = (path) => JSON.parse(path)

const gendiff = (filePath1, filePath2) => {
    const file1 = read(filePath1)
    const file2 = read(filePath2)

    const data1 = parser(file1)
    const data2 = parser(file2)
}
console.log(data1);
console.log(data2);
*/

const gendiff = (filePath1, filePath2) => {
  // Getting absolute file paths based on the current working directory
  const path1 = path.resolve(process.cwd(), filePath1);
  const path2 = path.resolve(process.cwd(), filePath2);
  // Reading the files by the received paths
  const file1 = readFileSync(path1, 'utf-8');
  const file2 = readFileSync(path2, 'utf-8');
  // JSON parsing
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  // console.log(data1);
  // console.log(data2);

  // Getting unique keys of objects from data
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = ['{'];
  for (const key of keys) {
    if (!Object.hasOwn(data2, key)) {
      result.push(` - ${key}: ${data1[key]}`);
    } else if (!Object.hasOwn(data1, key)) {
      result.push(` + ${key}: ${data2[key]}`);
    } else if (data1[key] === data2[key]) {
      result.push(`   ${key}: ${data2[key]}`);
    } else {
      result.push(` - ${key}: ${data1[key]}`);
      result.push(` + ${key}: ${data2[key]}`);
    }
  }
  result.push('}');
  return result.join('\n');
};

export default gendiff;
