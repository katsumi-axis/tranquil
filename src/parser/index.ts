import { Parser } from 'node-sql-parser';
import type { SQLDialect } from '../types';

const parser = new Parser();

export function parse(sql: string, dialect: SQLDialect = 'postgresql') {
  const dialectMap = {
    postgresql: 'PostgresQL',
    mysql: 'MySQL',
    sqlite: 'SQLite',
    bigquery: 'BigQuery',
  };

  return parser.astify(sql, { database: dialectMap[dialect] });
}
