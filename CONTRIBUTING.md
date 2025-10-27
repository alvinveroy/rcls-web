# Contributing to Rotary Club Website

Thank you for your interest in contributing to the Rotary Club Website project! This document provides guidelines and standards for contributing to this Next.js-based web application.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Standards](#commit-message-standards)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Directory Structure](#directory-structure)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

---

## Code of Conduct

This project adheres to professional standards of collaboration:

- **Be respectful** and inclusive in all communications
- **Be constructive** when providing feedback
- **Be collaborative** and help others learn and grow
- **Be professional** in all project interactions

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **pnpm**: v8.x or higher (package manager)
- **Git**: v2.x or higher
- **GitHub CLI** (`gh`): Latest version (for PR creation)

### Installation

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone git@github.com:YOUR_USERNAME/rcls-web.git
   cd rcls-web
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream git@github.com:alvinveroy/rcls-web.git
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

6. **Start development server**:
   ```bash
   pnpm dev
   ```

7. **Verify installation**:
   - Open [http://localhost:3000](http://localhost:3000)
   - Ensure the application loads correctly

---

## Development Workflow

### 1. Sync Your Fork

Always start with the latest code from upstream:

```bash
# Switch to main branch
git checkout main

# Pull latest changes from upstream
git pull --rebase upstream main

# Update your fork on GitHub
git push origin main
```

### 2. Create a Feature Branch

Create a new branch following our [naming conventions](#branch-naming-conventions):

```bash
git checkout -b <type>/<scope>/<description>
```

**Examples**:
```bash
git checkout -b feat/members/add-attendance-tracking
git checkout -b fix/ui/navbar-responsive-menu
git checkout -b docs/readme/update-installation
```

### 3. Make Your Changes

- Write clean, maintainable code following our [Code Standards](#code-standards)
- Follow the project's existing patterns and conventions
- Test your changes thoroughly
- Update documentation as needed

### 4. Commit Your Changes

Follow [Conventional Commits](#commit-message-standards) specification:

```bash
# Stage your changes
git add .

# Commit with proper message format
git commit -m "feat(members): add attendance tracking feature"
```

### 5. Push to Your Fork

```bash
git push origin <branch-name>
```

### 6. Create a Pull Request

Use GitHub CLI for streamlined PR creation:

```bash
gh pr create \
  --title "feat(members): add attendance tracking feature" \
  --body "## Description

Implements attendance tracking functionality for members.

## Changes
- Added attendance form component
- Created attendance API endpoint
- Updated member dashboard with attendance stats

## Testing
- [ ] Tested attendance form submission
- [ ] Verified data persistence
- [ ] Checked responsive design

## Screenshots
[Add screenshots if applicable]

Closes #123" \
  --base main \
  --head YOUR_USERNAME:feat/members/add-attendance-tracking
```

---

## Branch Naming Conventions

Branch names should follow this structure:

```
<type>/<scope>/<description>
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature or enhancement | `feat/auth/oauth-integration` |
| `fix` | Bug fix | `fix/ui/button-alignment` |
| `docs` | Documentation updates | `docs/api/endpoint-reference` |
| `style` | Code style changes (formatting, whitespace) | `style/components/consistent-spacing` |
| `refactor` | Code refactoring (no feature change) | `refactor/lib/optimize-utils` |
| `test` | Adding or updating tests | `test/components/button-tests` |
| `chore` | Maintenance tasks | `chore/deps/update-packages` |
| `perf` | Performance improvements | `perf/api/cache-optimization` |
| `ci` | CI/CD pipeline changes | `ci/github/add-test-workflow` |
| `build` | Build system changes | `build/webpack/optimize-config` |
| `revert` | Reverting previous changes | `revert/feat/remove-oauth` |

### Scopes

Use directory-based or feature-based scopes:

**Directory-based**:
- `app` - Application routes and pages
- `components` - React components
- `ui` - UI component library
- `hooks` - Custom React hooks
- `lib` - Utility functions and helpers
- `api` - API routes
- `config` - Configuration files
- `types` - TypeScript type definitions
- `styles` - Global styles

**Feature-based**:
- `auth` - Authentication and authorization
- `members` - Member management
- `events` - Event management
- `projects` - Project tracking
- `cms` - Content management
- `roster` - Member roster
- `attendance` - Attendance tracking
- `payments` - Payment processing

### Description

- Use **kebab-case** (lowercase with hyphens)
- Be **descriptive** but **concise**
- Use **imperative mood** (add, fix, update)
- Maximum **50 characters**

**Good examples**:
- `feat/auth/add-oauth-provider`
- `fix/ui/mobile-menu-overflow`
- `docs/contributing/update-guidelines`

**Bad examples**:
- `feat/new-feature` ❌ Too vague
- `fix/bug` ❌ Not descriptive
- `update-some-files` ❌ Missing type and scope

---

## Commit Message Standards

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Type

Use the same types as [branch naming](#types).

### Scope

Use the same scopes as [branch naming](#scopes).

### Description

- Use **imperative mood** ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Maximum **72 characters**

### Body (Optional)

- Explain **what** and **why** (not how)
- Wrap at **72 characters**
- Separate from description with blank line

### Footer (Optional)

- Reference issues: `Closes #123`, `Fixes #456`, `Refs #789`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

**Simple commit**:
```
feat(members): add attendance tracking
```

**Commit with body**:
```
feat(auth): implement OAuth2 authentication

Add OAuth2 authentication flow using NextAuth.js.
Supports Google and GitHub providers.
Includes session management and protected routes.

Closes #45
```

**Breaking change**:
```
feat(api): change authentication endpoint structure

BREAKING CHANGE: The /api/auth endpoint now requires
a token parameter. Update all API calls accordingly.

Migration guide: docs/migration/auth-v2.md
```

**Bug fix with details**:
```
fix(ui): resolve mobile menu overflow on small screens

The mobile navigation menu was overflowing on screens
smaller than 375px width. Adjusted max-width and added
horizontal scrolling as fallback.

Fixes #234
```

**Multiple issues**:
```
chore(deps): update dependencies to latest versions

Update Next.js, React, and Tailwind CSS to latest stable
versions. Includes security patches and performance improvements.

Closes #123, #124, #125
```

### Commit Message Checklist

Before committing, verify:

- [ ] Type is correct and follows conventions
- [ ] Scope accurately represents the changes
- [ ] Description is clear and concise
- [ ] Uses imperative mood
- [ ] Under 72 characters
- [ ] Body explains why (if needed)
- [ ] References relevant issues
- [ ] Breaking changes are documented

---

## Pull Request Process

### Before Creating a PR

1. **Ensure your branch is up to date**:
   ```bash
   git checkout main
   git pull --rebase upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run tests and linting**:
   ```bash
   pnpm lint
   pnpm build
   ```

3. **Review your changes**:
   ```bash
   git diff main...your-feature-branch
   ```

4. **Update documentation** if needed

### Creating a PR with GitHub CLI

#### Basic PR Creation

```bash
gh pr create --title "feat(scope): description" --body "PR description"
```

#### Comprehensive PR Creation

```bash
gh pr create \
  --title "feat(members): add attendance tracking feature" \
  --body "## Description

Brief description of changes and motivation.

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [x] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made

- Added attendance form component
- Created attendance API endpoint
- Updated member dashboard

## Testing

- [ ] Tested locally
- [ ] Verified responsive design
- [ ] Checked accessibility
- [ ] Updated tests

## Checklist

- [x] Code follows project style guidelines
- [x] Self-reviewed my code
- [x] Commented complex code sections
- [x] Updated documentation
- [x] Changes generate no new warnings
- [ ] Added tests for new features
- [x] All tests pass

## Screenshots

[Add screenshots if applicable]

## Related Issues

Closes #123
Refs #456" \
  --base main \
  --head YOUR_USERNAME:feat/members/add-attendance-tracking \
  --label "feature" \
  --label "needs-review" \
  --assignee "@me" \
  --draft
```

#### PR Creation Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--title` | PR title | `--title "feat(scope): description"` |
| `--body` | PR description | `--body "Detailed description"` |
| `--base` | Target branch | `--base main` |
| `--head` | Source branch | `--head username:branch` |
| `--draft` | Create as draft | `--draft` |
| `--label` | Add labels | `--label "bug"` |
| `--assignee` | Assign reviewers | `--assignee "@me"` |
| `--reviewer` | Request reviews | `--reviewer "username"` |
| `--milestone` | Set milestone | `--milestone "v1.0"` |

### PR Template

Your PR should include:

```markdown
## Description
Brief description of what this PR does and why.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Bullet point list of changes

## Testing
- [ ] Tested locally
- [ ] Verified responsive design
- [ ] Checked accessibility
- [ ] Updated tests

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex sections
- [ ] Updated documentation
- [ ] Tests pass

## Screenshots
[If applicable]

## Related Issues
Closes #123
```

### PR Review Process

1. **Automated checks** must pass (linting, build, tests)
2. **Code review** by at least one maintainer
3. **Address feedback** and push changes
4. **Approval** from maintainer(s)
5. **Merge** by maintainer (squash and merge preferred)

### After PR is Merged

1. **Delete your feature branch**:
   ```bash
   # Delete local branch
   git branch -d feat/members/add-attendance-tracking
   
   # Delete remote branch (if not auto-deleted)
   git push origin --delete feat/members/add-attendance-tracking
   ```

2. **Sync your fork**:
   ```bash
   git checkout main
   git pull --rebase upstream main
   git push origin main
   ```

---

## Code Standards

### TypeScript

- **Use explicit types** for function parameters and return values
- **Avoid `any`** type; use `unknown` if necessary
- **Define interfaces** for complex objects
- **Use type inference** where appropriate

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

function getUserProfile(userId: string): Promise<UserProfile> {
  // implementation
}

// ❌ Bad
function getUserProfile(userId: any): any {
  // implementation
}
```

### React Components

- **Use functional components** with TypeScript
- **Define prop types** with interfaces
- **Use Server Components** by default (Next.js 15)
- **Add `"use client"`** only when necessary

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
}

// ❌ Bad
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### File Naming

- **Components**: `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Hooks**: `use-kebab-case.ts` (e.g., `use-auth.ts`)
- **Utils**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `user.types.ts`)

### Import Order

```typescript
// 1. External dependencies
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Internal components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 3. Hooks
import { useAuth } from '@/hooks/use-auth';

// 4. Utils and types
import { formatDate } from '@/lib/utils';
import type { User } from '@/types/user';

// 5. Styles (if any)
import './styles.css';
```

### Styling with Tailwind

- **Use utility classes** for styling
- **Use `cn()` utility** for conditional classes
- **Avoid inline styles** unless necessary

```typescript
import { cn } from '@/lib/utils';

<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500 text-white",
  !isActive && "bg-gray-200 text-gray-700"
)}>
  Click me
</button>
```

### Code Quality

- **No console.log** in production code
- **Handle errors properly** with try-catch
- **Use async/await** over promises
- **Add comments** for complex logic only
- **Follow SOLID principles**
- **Keep functions small** and focused

---

## Directory Structure

### Current Structure

```
rcls-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── members/                 # Member portal
│       ├── layout.tsx           # Member layout
│       ├── page.tsx             # Dashboard
│       ├── attendance/          # Attendance tracking
│       ├── cms/                 # Content management
│       ├── contributions/       # Member contributions
│       ├── login/               # Authentication
│       ├── payments/            # Payment processing
│       └── roster/              # Member roster
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── members/                 # Member-specific components
│   │   ├── cms/                 # CMS components
│   │   ├── dashboard-overview.tsx
│   │   └── sidebar.tsx
│   ├── about.tsx                # Public components
│   ├── events.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   └── ...
│
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/                          # Utilities and helpers
│   ├── auth.ts                  # Authentication utilities
│   ├── mock-data.ts             # Mock data for development
│   └── utils.ts                 # General utilities
│
├── public/                       # Static assets
│   ├── images/
│   └── ...
│
├── scripts/                      # Database and utility scripts
│   └── 01-init-database.sql
│
├── styles/                       # Global styles
│   └── globals.css
│
├── .env.local                    # Environment variables (git-ignored)
├── .eslintrc.json               # ESLint configuration
├── components.json              # shadcn/ui configuration
├── CONSTITUTION.md              # Project guidelines for LLMs
├── CONTRIBUTING.md              # This file
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies
├── pnpm-lock.yaml              # Lock file
├── postcss.config.mjs          # PostCSS configuration
├── README.md                    # Project documentation
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

### Recommended Structure for New Features

When adding new features, follow this organization:

```
feature-name/
├── components/                   # Feature-specific components
│   ├── feature-card.tsx
│   └── feature-list.tsx
├── hooks/                        # Feature-specific hooks
│   └── use-feature.ts
├── lib/                          # Feature utilities
│   ├── api.ts                   # API functions
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Helper functions
└── page.tsx                     # Feature page
```

**Example**: New events management feature

```
app/events/
├── [id]/
│   ├── page.tsx                 # Event detail page
│   └── edit/
│       └── page.tsx             # Event edit page
├── new/
│   └── page.tsx                 # New event page
└── page.tsx                     # Events list page

components/events/
├── event-card.tsx
├── event-form.tsx
└── event-list.tsx

lib/events/
├── api.ts                       # Event API functions
├── types.ts                     # Event types
└── utils.ts                     # Event utilities
```

### Where to Place Files

| File Type | Location | Example |
|-----------|----------|---------|
| Pages/Routes | `app/` | `app/events/page.tsx` |
| Reusable UI components | `components/ui/` | `components/ui/button.tsx` |
| Feature components | `components/feature/` | `components/events/event-card.tsx` |
| Custom hooks | `hooks/` | `hooks/use-events.ts` |
| Utilities | `lib/` | `lib/format-date.ts` |
| Types | `lib/*.types.ts` | `lib/event.types.ts` |
| API routes | `app/api/` | `app/api/events/route.ts` |
| Static assets | `public/` | `public/images/logo.png` |
| Global styles | `styles/` | `styles/globals.css` |

---

## Testing Guidelines

### Running Tests

```bash
# Run all tests (when available)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- **Test user behavior**, not implementation
- **Use descriptive test names**
- **Follow AAA pattern**: Arrange, Act, Assert
- **Mock external dependencies**
- **Test edge cases and error states**

```typescript
describe('Button Component', () => {
  it('renders with correct label', () => {
    // Arrange
    const label = 'Click me';
    
    // Act
    render(<Button label={label} onClick={() => {}} />);
    
    // Assert
    expect(screen.getByText(label)).toBeInTheDocument();
  });
  
  it('calls onClick handler when clicked', () => {
    // Arrange
    const handleClick = jest.fn();
    
    // Act
    render(<Button label="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click'));
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Coverage Goals

- **Unit tests**: Core utilities and functions
- **Component tests**: UI components
- **Integration tests**: Feature workflows
- **E2E tests**: Critical user paths (when applicable)

---

## Documentation

### Code Comments

**DO** comment:
- Complex algorithms or logic
- Workarounds or hacks
- Why decisions were made (not what the code does)

```typescript
// Using debounce to prevent excessive API calls during rapid typing
const debouncedSearch = useDebounce(searchTerm, 300);
```

**DON'T** comment:
- Obvious code
- What the code does (let the code speak)

```typescript
// ❌ Set count to 0
const count = 0;
```

### Component Documentation

Use JSDoc for complex components:

```typescript
/**
 * UserProfile Component
 * 
 * Displays user information with avatar, name, and bio.
 * Supports edit mode for authenticated users.
 * 
 * @param user - User object with id, name, avatar, and bio
 * @param isEditable - Whether the profile can be edited
 * @param onSave - Callback function when profile is saved
 * 
 * @example
 * <UserProfile 
 *   user={currentUser} 
 *   isEditable={true} 
 *   onSave={handleSave} 
 * />
 */
export function UserProfile({ user, isEditable, onSave }: UserProfileProps) {
  // implementation
}
```

### README Updates

Update README.md when:
- Adding new features
- Changing installation steps
- Modifying environment variables
- Adding new scripts

---

## GitHub CLI Commands Reference

### Installation

```bash
# macOS
brew install gh

# Windows
scoop install gh

# Linux
sudo apt install gh
```

### Authentication

```bash
# Login to GitHub
gh auth login

# Check authentication status
gh auth status
```

### Repository Operations

```bash
# Clone repository
gh repo clone alvinveroy/rcls-web

# Fork repository
gh repo fork alvinveroy/rcls-web --clone

# View repository info
gh repo view

# Create new repository
gh repo create my-new-repo --public
```

### Pull Request Commands

```bash
# Create PR
gh pr create

# Create PR with details
gh pr create --title "Title" --body "Description"

# Create draft PR
gh pr create --draft

# List PRs
gh pr list

# View PR details
gh pr view 123

# Check PR status
gh pr status

# Checkout PR locally
gh pr checkout 123

# Review PR
gh pr review 123 --approve
gh pr review 123 --request-changes --body "Comments"

# Merge PR
gh pr merge 123 --squash
gh pr merge 123 --merge
gh pr merge 123 --rebase

# Close PR
gh pr close 123

# Reopen PR
gh pr reopen 123
```

### Issue Commands

```bash
# Create issue
gh issue create

# List issues
gh issue list

# View issue
gh issue view 123

# Close issue
gh issue close 123
```

### Workflow Commands

```bash
# List workflows
gh workflow list

# View workflow
gh workflow view

# Run workflow
gh workflow run workflow-name

# View workflow runs
gh run list

# View run details
gh run view 123
```

---

## Questions or Issues?

If you have questions or encounter issues:

1. **Check existing documentation**:
   - README.md
   - CONSTITUTION.md (for LLM agents)
   - This CONTRIBUTING.md

2. **Search existing issues**:
   ```bash
   gh issue list --search "your search term"
   ```

3. **Create a new issue**:
   ```bash
   gh issue create --title "Question: ..." --body "Details..."
   ```

4. **Contact maintainers**:
   - Open an issue with the `question` label
   - Reach out via project communication channels

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## Acknowledgments

Thank you for contributing to the Rotary Club Website project! Your efforts help build a better platform for the community.

---

**Last Updated**: 2025-10-27
**Version**: 1.0.0
