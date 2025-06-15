# Tranquil

A TypeScript-based SQL linter and formatter that brings tranquility to your SQL code.

## Features

- **SQL Linting**: Detect syntax errors, style violations, and potential issues in SQL queries
- **SQL Formatting**: Automatically format SQL queries according to configurable style rules
- **TypeScript-based**: Built with TypeScript for type safety and modern development experience
- **Extensible**: Easy to add new rules and formatting options
- **CLI & API**: Use as a command-line tool or integrate into your applications

## Installation

```bash
npm install -g tranquil
```

## Usage

### CLI

```bash
# Lint a SQL file
tranquil lint query.sql

# Format a SQL file
tranquil format query.sql

# Lint and format (fix issues)
tranquil fix query.sql

# Process multiple files
tranquil fix *.sql
```

### API

```typescript
import { lint, format } from 'tranquil';

// Lint SQL
const lintResults = lint('SELECT * FROM users WHERE id = 1');

// Format SQL
const formatted = format('SELECT * FROM users WHERE id = 1');
```

## Configuration

Create a `.tranquilrc.json` file in your project root:

```json
{
  "rules": {
    "keyword-case": "upper",
    "indent-size": 2,
    "max-line-length": 80
  },
  "dialect": "postgresql"
}
```

## Supported SQL Dialects

- PostgreSQL
- MySQL
- SQLite
- BigQuery

## Development

See [CLAUDE.md](./CLAUDE.md) for development setup and contribution guidelines.

## License

MIT
