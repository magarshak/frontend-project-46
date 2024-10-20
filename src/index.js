import { readFileSync } from 'node:fs';
import path from 'node:path';

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
    
    console.log(data1);
    console.log(data2);
    //console.log(typeof data1);
}

export default gendiff;