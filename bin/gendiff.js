#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .parse();

// console.log('Welcome to the Diff Tool!');
