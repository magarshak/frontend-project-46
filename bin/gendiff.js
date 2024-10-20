#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .version('0.8.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filePath1> <filePath2>')
  .parse();

// console.log('Welcome to the Diff Tool!');
