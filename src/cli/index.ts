#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';
import { Command } from 'commander';
import { glob } from 'glob';
import { loadConfig } from '../config';
import { format } from '../core/formatter';
import { lint } from '../core/linter';

const version = '0.1.0'; // TODO: Read from package.json

const program = new Command();

program
  .name('tranquil')
  .description('A TypeScript-based SQL linter and formatter')
  .version(version);

program
  .command('lint <files...>')
  .description('Lint SQL files')
  .option('-c, --config <path>', 'path to config file', '.tranquilrc.json')
  .action(async (files: string[], options) => {
    try {
      const config = await loadConfig(options.config);
      const filePaths = await resolveFiles(files);

      let hasErrors = false;

      for (const filePath of filePaths) {
        const content = readFileSync(filePath, 'utf-8');
        const result = await lint(content, { ...config, file: filePath });

        if (result.errors.length > 0 || result.warnings.length > 0) {
          console.log(chalk.underline(filePath));

          result.errors.forEach((error) => {
            console.log(
              chalk.red(`  ${error.line}:${error.column} error ${error.message} ${error.rule}`),
            );
            hasErrors = true;
          });

          result.warnings.forEach((warning) => {
            console.log(
              chalk.yellow(
                `  ${warning.line}:${warning.column} warning ${warning.message} ${warning.rule}`,
              ),
            );
          });

          console.log();
        }
      }

      if (hasErrors) {
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

program
  .command('format <files...>')
  .description('Format SQL files')
  .option('-c, --config <path>', 'path to config file', '.tranquilrc.json')
  .option('-w, --write', 'write formatted output to file')
  .action(async (files: string[], options) => {
    try {
      const config = await loadConfig(options.config);
      const filePaths = await resolveFiles(files);

      for (const filePath of filePaths) {
        const content = readFileSync(filePath, 'utf-8');
        const formatted = await format(content, config.format);

        if (options.write) {
          writeFileSync(filePath, formatted);
          console.log(chalk.green('✓'), filePath);
        } else {
          console.log(formatted);
        }
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

program
  .command('fix <files...>')
  .description('Lint and fix SQL files')
  .option('-c, --config <path>', 'path to config file', '.tranquilrc.json')
  .action(async (files: string[], options) => {
    try {
      const config = await loadConfig(options.config);
      const filePaths = await resolveFiles(files);

      for (const filePath of filePaths) {
        const content = readFileSync(filePath, 'utf-8');
        const formatted = await format(content, config.format);
        writeFileSync(filePath, formatted);
        console.log(chalk.green('✓'), filePath);
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

async function resolveFiles(patterns: string[]): Promise<string[]> {
  const files: string[] = [];

  for (const pattern of patterns) {
    const matches = await glob(pattern, { nodir: true });
    files.push(...matches.map((file) => resolve(file)));
  }

  return [...new Set(files)];
}

program.parse();
