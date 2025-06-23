import type { LintOptions, LintResult } from '../types';

export async function lint(_sql: string, options?: LintOptions): Promise<LintResult> {
  // TODO: Implement linting logic
  return {
    file: options?.file,
    errors: [],
    warnings: [],
  };
}
