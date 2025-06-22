export type SQLDialect = 'postgresql' | 'mysql' | 'sqlite' | 'bigquery';

export interface LintResult {
  file?: string;
  errors: LintError[];
  warnings: LintWarning[];
}

export interface LintError {
  line: number;
  column: number;
  message: string;
  rule: string;
  severity: 'error';
}

export interface LintWarning {
  line: number;
  column: number;
  message: string;
  rule: string;
  severity: 'warning';
}

export interface FormatOptions {
  dialect?: SQLDialect;
  indent?: number;
  keywordCase?: 'upper' | 'lower' | 'capitalize';
  linesBetweenQueries?: number;
  maxLineLength?: number;
}

export interface LintOptions {
  dialect?: SQLDialect;
  rules?: Record<string, any>;
  file?: string;
}

export interface TranquilConfig {
  dialect: SQLDialect;
  rules: Record<string, any>;
  format: FormatOptions;
}
