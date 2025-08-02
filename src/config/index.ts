import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { TranquilConfig } from '../types';

const defaultConfig: TranquilConfig = {
  dialect: 'postgresql',
  rules: {
    'keyword-case': 'upper',
    'indent-size': 2,
    'max-line-length': 80,
  },
  format: {
    dialect: 'postgresql',
    indent: 2,
    keywordCase: 'upper',
    linesBetweenQueries: 1,
    maxLineLength: 80,
  },
};

export async function loadConfig(configPath: string): Promise<TranquilConfig> {
  try {
    const absolutePath = resolve(process.cwd(), configPath);
    const configContent = readFileSync(absolutePath, 'utf-8');
    const userConfig = JSON.parse(configContent) as Partial<TranquilConfig>;

    return {
      ...defaultConfig,
      ...userConfig,
      rules: {
        ...defaultConfig.rules,
        ...userConfig.rules,
      },
      format: {
        ...defaultConfig.format,
        ...userConfig.format,
      },
    };
  } catch {
    // Return default config if config file not found
    return defaultConfig;
  }
}
