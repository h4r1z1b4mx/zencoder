# Contributing to ZenCoder

Thank you for your interest in contributing to ZenCoder! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project follows a standard code of conduct. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/zencoder.git
   cd zencoder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```
   This will start TypeScript in watch mode, automatically recompiling when you make changes.

4. **Build the Project**
   ```bash
   npm run build
   ```

5. **Test Your Changes**
   ```bash
   npm test
   npm start
   ```

## Project Structure

```
zencoder/
├── source/                 # Source code
│   ├── app.tsx            # Main app component
│   ├── cli.tsx            # CLI entry point
│   ├── app/               # App-specific components and hooks
│   ├── components/        # Reusable UI components
│   ├── config/            # Configuration files
│   ├── hooks/             # Custom React hooks
│   ├── mcp/               # Model Context Protocol integration
│   ├── tools/             # Tool implementations
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── dist/                  # Compiled output (generated)
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md             # Project documentation
```

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/add-new-tool` - for new features
- `fix/terminal-width-bug` - for bug fixes
- `docs/update-readme` - for documentation
- `refactor/mcp-client` - for refactoring

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm run test
   npm run build
   npm start  # Test the CLI manually
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

## Coding Standards

### TypeScript

- Use TypeScript strict mode (already configured)
- Provide explicit types where inference isn't clear
- Use interfaces for object shapes
- Use enums for constants with multiple values

### React/Ink Components

- Use functional components with hooks
- Follow React hooks rules
- Use descriptive component names
- Keep components focused and single-purpose

### File Organization

- Group related functionality in appropriate directories
- Use kebab-case for file names
- Add proper file extensions (.tsx, .ts)
- Export components and functions explicitly

### Code Style

The project uses automated formatting and linting:

```bash
npm run test  # Runs prettier, xo (ESLint), and ava tests
```

Key style guidelines:
- Use tabs for indentation (configured in prettier)
- Use semicolons
- Use single quotes for strings
- Use trailing commas in multiline structures

## Testing

### Running Tests

```bash
npm test          # Run all tests (prettier, linting, unit tests)
npm run build     # Ensure the project builds successfully
```

### Writing Tests

- Add unit tests for new utilities and functions
- Test React components using appropriate testing libraries
- Test CLI functionality end-to-end when possible
- Place test files near the code they test or in a `__tests__` directory

### Manual Testing

Always test the CLI manually:

```bash
npm run build
npm start
```

Test different scenarios:
- Different terminal sizes
- Various input combinations
- Error conditions
- MCP tool interactions

## Submitting Changes

### Issue Guidelines

Before creating an issue:
1. Check if a similar issue already exists
2. Use the issue templates when available
3. Provide clear reproduction steps for bugs
4. Include system information (OS, Node version, terminal)

### Pull Request Process

1. **Ensure Your PR**:
   - Has a clear, descriptive title
   - References any related issues
   - Includes tests for new functionality
   - Updates documentation if needed
   - Passes all automated checks

2. **PR Description Should Include**:
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Any breaking changes
   - Screenshots/demos for UI changes

3. **Before Submitting**:
   ```bash
   npm test          # All tests pass
   npm run build     # Project builds successfully
   git push origin your-branch-name
   ```

4. **Review Process**:
   - PRs require review before merging
   - Address reviewer feedback promptly
   - Keep PRs focused and reasonably sized
   - Rebase or merge as requested by maintainers

## Areas for Contribution

### High Priority
- Bug fixes and stability improvements
- Performance optimizations
- Better error handling and user feedback
- Documentation improvements

### Feature Ideas
- New MCP tools and integrations
- Enhanced terminal UI components
- Configuration and customization options
- Cross-platform compatibility improvements

### Good First Issues
- Documentation updates
- Simple bug fixes
- Code style improvements
- Test coverage improvements

## Development Tips

### Debugging

- Use console.log for simple debugging (remove before committing)
- Use Chrome DevTools for complex debugging (Ink supports this)
- Test in different terminal environments

### Working with Ink

- Ink uses React paradigms but for terminal UI
- Components render to terminal instead of DOM
- Use Ink's built-in components for terminal-specific functionality
- Test UI changes in different terminal sizes

### MCP Integration

- Follow MCP protocol specifications
- Test with different MCP servers
- Handle connection errors gracefully
- Document new tool interfaces

## Getting Help

- Check existing documentation first
- Look at similar implementations in the codebase
- Ask questions in issues or discussions
- Provide context and examples when asking for help

## Recognition

Contributors will be recognized in:
- Git commit history
- Release notes for significant contributions
- Project documentation

Thank you for contributing to ZenCoder! 🚀
