# WatchParty Project Constitution

**Version**: 1.1.0  
**Last Updated**: October 25, 2025  
**Purpose**: Define rules, principles, and guidelines for LLM agents working on the WatchParty project.

---

## Table of Contents

- [Core Principles](#core-principles)
- [Project Context](#project-context)
- [Next.js SSR Best Practices](#nextjs-ssr-best-practices)
- [Mandatory Workflow](#mandatory-workflow)
- [Code Standards](#code-standards)
- [Industry Standards & Best Practices](#industry-standards--best-practices)
- [File Operations](#file-operations)
- [Git Operations](#git-operations)
- [Communication Guidelines](#communication-guidelines)
- [Error Handling](#error-handling)
- [Security Requirements](#security-requirements)
- [Testing Requirements](#testing-requirements)
- [Performance & Optimization](#performance--optimization)
- [Documentation Standards](#documentation-standards)
- [Decision Making Framework](#decision-making-framework)
- [Prohibited Actions](#prohibited-actions)

---

## Core Principles

### 1. Context-First Approach
- **NEVER** make assumptions about the codebase
- **ALWAYS** gather full context before proposing changes
- Use semantic search and file inspection tools extensively
- Understand the impact of changes across the entire codebase

### 2. Consistency Over Cleverness
- Follow existing patterns in the codebase
- Match the project's style, even if you prefer alternatives
- Maintain consistency in naming, structure, and design

### 3. Incremental and Reversible
- Make small, focused changes
- Each change should be independently reviewable
- Changes must be easily reversible

### 4. Documentation as Code
- Code should be self-documenting
- Add comments only for complex logic or "why" not "what"
- Keep documentation in sync with code changes

---

## Project Context

### Technology Stack
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5+
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.1.9
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Package Manager**: pnpm
- **Form Handling**: React Hook Form + Zod
- **Theme**: next-themes
- **Icons**: Lucide React

### Project Structure
```
app/          - Next.js App Router (pages, layouts, routes)
components/   - React components
  ui/         - shadcn/ui reusable components
hooks/        - Custom React hooks
lib/          - Utilities and helper functions
public/       - Static assets
styles/       - Global styles
```

### Key Dependencies
- Radix UI for accessible component primitives
- Tailwind CSS for styling
- TypeScript for type safety
- React Hook Form for form management
- Zod for schema validation

---

## Next.js SSR Best Practices

### Server Components by Default

```typescript
// ✅ DO: Use Server Components by default (no "use client")
export default async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// ❌ DON'T: Use Client Components unnecessarily
"use client";
export default function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  // Unnecessary client-side fetching
}
```

### Client Components Only When Necessary

Use Client Components only for:
- Interactivity (onClick, onChange, etc.)
- Browser APIs (window, document, localStorage)
- React hooks (useState, useEffect, useContext)
- Event handlers

```typescript
// ✅ DO: Separate client and server logic
// Server Component
import { UserButton } from './user-button';

export default function Header() {
  return (
    <header>
      <h1>My App</h1>
      <UserButton /> {/* Client Component for interactivity */}
    </header>
  );
}

// Client Component (user-button.tsx)
"use client";
export function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  return <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>;
}
```

### Server-Side Data Fetching Patterns

```typescript
// ✅ DO: Fetch data directly in Server Components
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // or 'no-store' for dynamic
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}

// ❌ DON'T: Fetch data in useEffect unless necessary
"use client";
function PostsPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('/api/posts').then(res => res.json()).then(setPosts);
  }, []);
}
```

### Proper Use of Async/Await in Server Components

```typescript
// ✅ DO: Use async/await properly
export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const author = await getAuthor(post.authorId);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {author.name}</p>
    </article>
  );
}

// ✅ DO: Use Promise.all for parallel data fetching
export default async function Page({ params }: { params: { id: string } }) {
  const [post, author] = await Promise.all([
    getPost(params.id),
    getAuthor(post.authorId),
  ]);
}
```

### Streaming and Suspense Boundaries

```typescript
// ✅ DO: Use Suspense for loading states
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <Analytics />
      </Suspense>
    </div>
  );
}

async function Posts() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}
```

### Metadata API for SEO

```typescript
// ✅ DO: Use Metadata API for SEO
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'Page description for SEO',
  openGraph: {
    title: 'My Page Title',
    description: 'Page description for SEO',
    images: ['/og-image.jpg'],
  },
};

export default function Page() {
  return <div>Page content</div>;
}

// ✅ DO: Generate dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

### Route Handlers for API Endpoints

```typescript
// ✅ DO: Use Route Handlers for API endpoints
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const post = await createPost(body);
  return NextResponse.json(post, { status: 201 });
}
```

### Dynamic vs Static Rendering

```typescript
// ✅ DO: Use static rendering when possible
// Static at build time
export const dynamic = 'force-static';
export default async function StaticPage() {
  const data = await fetchData(); // Cached at build time
  return <div>{data}</div>;
}

// ✅ DO: Use dynamic rendering when needed
// Dynamic on each request
export const dynamic = 'force-dynamic';
export default async function DynamicPage() {
  const data = await fetchData(); // Fetched on each request
  return <div>{data}</div>;
}

// ✅ DO: Use revalidation for ISR
export const revalidate = 3600; // Revalidate every hour
export default async function ISRPage() {
  const data = await fetchData(); // Revalidated periodically
  return <div>{data}</div>;
}
```

---

## Mandatory Workflow

### Before Every Task

1. **Search Memory System**
   ```
   - Query Byterover memory for related implementations
   - Review previous solutions and patterns
   - Identify reusable code and approaches
   ```

2. **Understand Full Context**
   ```
   - Use semantic_search to find related files
   - Read relevant files completely
   - Map dependencies and relationships
   - Identify all files that need changes
   ```

3. **Create TODO List**
   ```
   - Break task into specific, measurable steps
   - Use todo---set_items to track progress
   - Include all file changes and verification steps
   ```

4. **Verify Git State**
   ```
   - Check current branch
   - Ensure main branch is synced
   - Create appropriate feature branch
   ```

### During Implementation

1. **Follow Established Patterns**
   - Match existing code style
   - Use existing utility functions
   - Follow component structure conventions

2. **Incremental Progress**
   - Make one logical change at a time
   - Update TODO list after each step
   - Verify each change works before proceeding

3. **Type Safety**
   - Define proper TypeScript types
   - Avoid `any` type
   - Use type inference where appropriate

### After Implementation

1. **Verify Changes**
   ```bash
   # Run linting
   pnpm lint
   
   # Type check
   pnpm build
   
   # Run tests (when available)
   pnpm test
   ```

2. **Update Documentation**
   - Update README if needed
   - Add/update comments for complex logic
   - Update relevant documentation files

3. **Store Knowledge**
   - Use byterover-mcp to store implementation details
   - Document patterns, decisions, and learnings
   - Include file paths, commit info, and rationale

4. **Complete TODO**
   - Mark all tasks as completed
   - Verify nothing was missed

---

## Code Standards

### TypeScript

```typescript
// ✅ DO: Use explicit types for function parameters and return values
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ DON'T: Use 'any' or implicit types
function calculateTotal(items): any {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### React Components

```typescript
// ✅ DO: Use functional components with TypeScript
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

// ❌ DON'T: Use class components or unclear prop types
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

// 5. Styles
import './styles.css';
```

### Styling with Tailwind

```typescript
// ✅ DO: Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold">Title</h2>
</div>

// ✅ DO: Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500 text-white",
  !isActive && "bg-gray-200 text-gray-700"
)}>
  Click me
</button>

// ❌ DON'T: Write inline styles or custom CSS unless necessary
<div style={{ display: 'flex', padding: '16px' }}>
  <h2 style={{ fontSize: '20px' }}>Title</h2>
</div>
```

---

## Industry Standards & Best Practices

### SOLID Principles Application

```typescript
// ✅ DO: Single Responsibility Principle
// Each component has one reason to change
interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ src, alt, size = 'md' }: UserAvatarProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`avatar-${size}`}
    />
  );
}

// ❌ DON'T: Multiple responsibilities in one component
export function UserCard({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  // Handles avatar display, editing, and API calls - too many responsibilities
}
```

### DRY (Don't Repeat Yourself) Principle

```typescript
// ✅ DO: Extract reusable logic
const useApiCall = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, execute };
};

// ❌ DON'T: Repeat the same logic in multiple components
function UserProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // ... same logic repeated
}
```

### KISS (Keep It Simple, Stupid) Principle

```typescript
// ✅ DO: Simple, readable code
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// ❌ DON'T: Overly complex solutions
function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', /* ... */];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const suffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
  return `${month} ${day}${suffix}, ${year}`;
}
```

### Separation of Concerns

```typescript
// ✅ DO: Separate data logic from UI
// Data layer
export const userService = {
  async getUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  },
  
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// UI layer
export function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useApiCall(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <UserDisplay user={user} />;
}
```

### Single Responsibility for Components

```typescript
// ✅ DO: Components with single responsibility
export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="search-input"
    />
  );
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  return (
    <ul className="search-results">
      {results.map((result) => (
        <li key={result.id}>
          <button onClick={() => onSelect(result)}>
            {result.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

// ❌ DON'T: Components doing too much
export function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // Handles input, API calls, result display, selection logic
}
```

### Proper Prop Drilling vs Context Usage

```typescript
// ✅ DO: Use Context for global state
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ DO: Use prop drilling for local component communication
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

// ❌ DON'T: Prop drill through many levels for rarely used data
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} setUser={setUser} />;
}
function Layout({ user, setUser }) {
  return <Header user={user} setUser={setUser} />;
}
// ... continues through many levels
```

### Code Reusability Patterns

```typescript
// ✅ DO: Create reusable component patterns
// Base button component
export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Specialized buttons using the base
export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <Button variant="ghost" size="sm" {...props}>
      {children}
    </Button>
  );
}

// ✅ DO: Use composition over inheritance
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('card', className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, ...props }: CardHeaderProps) {
  return <div className="card-header" {...props}>{children}</div>;
}

export function CardContent({ children, ...props }: CardContentProps) {
  return <div className="card-content" {...props}>{children}</div>;
}
```

### Performance Best Practices

```typescript
// ✅ DO: Use React.memo for expensive components
export const ExpensiveComponent = React.memo(function ExpensiveComponent({ 
  data 
}: { data: ComplexData }) {
  const processedData = useMemo(() => {
    return heavyComputation(data);
  }, [data]);
  
  return <div>{/* Render processed data */}</div>;
});

// ✅ DO: Use useCallback for stable function references
export function ParentComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    // Function reference stays stable
    console.log('Clicked');
  }, []);
  
  return <ChildComponent onClick={handleClick} />;
}

// ✅ DO: Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// ❌ DON'T: Unnecessary re-renders
function Parent() {
  const [state, setState] = useState({});
  
  return (
    <div>
      {state.items.map(item => (
        <Child 
          key={item.id}
          data={item}
          onUpdate={(newData) => {
            // New function on every render
            setState(prev => ({ ...prev, items: prev.items.map(/* ... */) }));
          }}
        />
      ))}
    </div>
  );
}
```

### Accessibility Standards (WCAG 2.1 AA Compliance)

```typescript
// ✅ DO: Use semantic HTML
export function Form() {
  return (
    <form>
      <fieldset>
        <legend>Contact Information</legend>
        
        <label htmlFor="name">
          Name <span aria-label="required">*</span>
        </label>
        <input 
          id="name" 
          type="text" 
          required 
          aria-describedby="name-error"
        />
        <div id="name-error" className="error" role="alert"></div>
        
        <label htmlFor="email">Email</label>
        <input id="email" type="email" required />
      </fieldset>
      
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ DO: Provide keyboard navigation
export function Dropdown({ items, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          onSelect(items[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };
  
  return (
    <div onKeyDown={handleKeyDown}>
      <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        Options
      </button>
      {isOpen && (
        <ul role="menu">
          {items.map((item, index) => (
            <li 
              key={item.id}
              role="menuitem"
              tabIndex={index === focusedIndex ? 0 : -1}
              onClick={() => onSelect(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ❌ DON'T: Ignore accessibility
export function BadButton() {
  return <div onClick={handleClick}>Click me</div>; // Not focusable
}

export function BadForm() {
  return (
    <div>
      Name: <input /> {/* No label */}
      <button>Submit</button> {/* No form association */}
    </div>
  );
}
```

### Semantic HTML Usage

```typescript
// ✅ DO: Use semantic HTML elements
export function ArticlePage({ article }: { article: Article }) {
  return (
    <article>
      <header>
        <h1>{article.title}</h1>
        <time dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </header>
      
      <nav aria-label="Table of contents">
        <h2>Table of Contents</h2>
        <ol>
          {article.sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </nav>
      
      <main>
        {article.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </section>
        ))}
      </main>
      
      <aside>
        <h3>Related Articles</h3>
        <ul>
          {article.related.map((related) => (
            <li key={related.id}>
              <a href={related.url}>{related.title}</a>
            </li>
          ))}
        </ul>
      </aside>
      
      <footer>
        <p>Written by {article.author.name}</p>
      </footer>
    </article>
  );
}

// ❌ DON'T: Use divs for everything
export function BadArticlePage({ article }: { article: Article }) {
  return (
    <div className="article">
      <div className="header">
        <div className="title">{article.title}</div>
        <div className="date">{article.publishedAt}</div>
      </div>
      <div className="content">
        {/* All content in generic divs */}
      </div>
    </div>
  );
}
```

---

## File Operations

### Reading Files

```typescript
// ALWAYS read files before modifying them
// Use power---file_read to inspect content
```

### Creating Files

```typescript
// Use power---file_write with mode: 'create_only'
// Verify file doesn't exist first
// Follow project structure conventions
```

### Modifying Files

```typescript
// Prefer aider---run_prompt for code changes
// Use power---file_edit only for simple text replacements
// Include sufficient context in search terms
// Verify changes with file_read after editing
```

### Deleting Files

```typescript
// Get explicit user confirmation
// Check for dependencies first
// Update imports in other files
// Remove from git if necessary
```

---

## Git Operations

### Branch Management

```bash
# ALWAYS start from updated main
git checkout main
git pull --rebase origin main

# Create feature branch with conventional naming
git checkout -b <type>/<scope>/<description>

# Examples:
# feat/auth/add-oauth
# fix/ui/button-hover
# docs/readme/update-setup
```

### Commit Messages

```bash
# Format: <type>(<scope>): <description>
git commit -m "feat(auth): add OAuth2 authentication flow"
git commit -m "fix(ui/button): resolve hover state bug"
git commit -m "docs(readme): update installation steps"

# For breaking changes:
git commit -m "feat(api): change auth endpoint structure

BREAKING CHANGE: The /auth endpoint now requires a token parameter"
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance
- `perf`: Performance
- `ci`: CI/CD

### Commit Scope
Use directory-based scopes: `app`, `components`, `ui`, `hooks`, `lib`, `config`, `api`, `types`, etc.

### Before Pushing

```bash
# Verify no uncommitted changes
git status

# Review commits
git log --oneline -5

# Push to remote
git push origin <branch-name>
```

---

## Communication Guidelines

### Response Style

**DO:**
- Be concise and direct
- Use structured formats (lists, code blocks)
- Provide actionable information
- Explain "why" for important decisions

**DON'T:**
- Add unnecessary greetings or closings
- Repeat information already provided
- Be overly verbose
- Make assumptions without stating them

### Progress Updates

```markdown
✅ Completed: Created authentication hook
🔄 In Progress: Updating user profile component
⏳ Pending: Add tests for auth flow
```

### Asking for Clarification

```markdown
Need clarification on:
1. Should the button use primary or secondary variant?
2. Where should error messages be displayed?

Current assumption: Using primary variant and toast notifications.
Proceeding unless you specify otherwise.
```

---

## Error Handling

### Before Proceeding After Errors

1. **Analyze the error message completely**
2. **Check for related issues in the codebase**
3. **Search memory for similar past errors**
4. **Propose solution with explanation**

### Error Response Format

```markdown
❌ Error encountered: [Error description]

Root cause: [Analysis]

Proposed solution:
1. [Step 1]
2. [Step 2]

Proceeding with fix...
```

### Common Error Patterns

```typescript
// ✅ DO: Handle errors explicitly
try {
  const data = await fetchData();
  return { success: true, data };
} catch (error) {
  console.error('Failed to fetch data:', error);
  return { success: false, error: 'Failed to fetch data' };
}

// ❌ DON'T: Ignore errors or use generic catch-all
try {
  const data = await fetchData();
  return data;
} catch (error) {
  // Silent failure
}
```

---

## Security Requirements

### Environment Variables

```typescript
// ✅ DO: Use environment variables for secrets
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// ❌ DON'T: Hardcode secrets
const apiKey = 'sk_live_abc123xyz'; // NEVER DO THIS
```

### API Routes

```typescript
// ✅ DO: Validate input and authenticate
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const body = await request.json();
  const validated = schema.parse(body); // Use Zod validation
  
  // Process request...
}

// ❌ DON'T: Trust user input
export async function POST(request: Request) {
  const body = await request.json();
  // Directly use body without validation
}
```

### OWASP Top 10 Considerations

```typescript
// ✅ DO: Prevent SQL Injection (when using databases)
import { sql } from '@vercel/postgres';

export async function getUser(id: string) {
  // Parameterized queries prevent SQL injection
  const result = await sql`
    SELECT * FROM users WHERE id = ${id}
  `;
  return result.rows[0];
}

// ❌ DON'T: Concatenate SQL queries
export async function getUserBad(id: string) {
  // Vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE id = '${id}'`;
  const result = await sql.query(query);
  return result.rows[0];
}
```

### XSS Prevention Techniques

```typescript
// ✅ DO: Use React's built-in XSS protection
export function UserComment({ comment }: { comment: Comment }) {
  // React automatically escapes content
  return <p>{comment.text}</p>;
}

// ✅ DO: Sanitize HTML when necessary
import DOMPurify from 'dompurify';

export function RichTextContent({ html }: { html: string }) {
  const cleanHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}

// ❌ DON'T: Render unsanitized HTML
export function BadRichText({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### CSRF Protection Patterns

```typescript
// ✅ DO: Use CSRF tokens for state-changing requests
export async function POST(request: Request) {
  const token = request.headers.get('X-CSRF-Token');
  const sessionToken = request.cookies.get('session')?.value;
  
  if (!validateCSRFToken(token, sessionToken)) {
    return new Response('Invalid CSRF token', { status: 403 });
  }
  
  // Process request...
}

// ✅ DO: Use SameSite cookies
export const sessionConfig = {
  cookies: {
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
};
```

### Rate Limiting for API Routes

```typescript
// ✅ DO: Implement rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  
  if (await isRateLimited(ip)) {
    return new Response('Rate limit exceeded', { status: 429 });
  }
  
  // Process request...
}

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate_limit:${ip}`;
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, 900); // 15 minutes
  }
  
  return current > 100;
}
```

### Input Validation and Sanitization

```typescript
// ✅ DO: Validate input with Zod
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = CreateUserSchema.parse(body);
    
    // Process validated data...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    throw error;
  }
}

// ✅ DO: Sanitize file uploads
export async function uploadFile(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return new Response('No file provided', { status: 400 });
  }
  
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return new Response('Invalid file type', { status: 400 });
  }
  
  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    return new Response('File too large', { status: 400 });
  }
  
  // Process file...
}
```

### Secure Headers Configuration

```typescript
// ✅ DO: Set security headers in middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}
```

### Authentication Best Practices

```typescript
// ✅ DO: Use secure password handling
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateJWT(userId: string): string {
  return jwt.sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );
}

export function verifyJWT(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch {
    return null;
  }
}

// ✅ DO: Implement secure session management
export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  
  await redis.setex(`session:${sessionId}`, 604800, JSON.stringify({
    userId,
    expiresAt: expiresAt.toISOString(),
  }));
  
  return sessionId;
}
```

### Authorization Patterns

```typescript
// ✅ DO: Implement role-based access control
type UserRole = 'admin' | 'moderator' | 'user';

interface User {
  id: string;
  role: UserRole;
}

export function hasPermission(user: User, resource: string, action: string): boolean {
  const permissions = {
    admin: ['*'], // All permissions
    moderator: ['posts:read', 'posts:edit', 'users:read'],
    user: ['posts:read', 'posts:create'],
  };
  
  const userPermissions = permissions[user.role];
  
  return userPermissions.includes('*') || 
         userPermissions.includes(`${resource}:${action}`);
}

export function requireAuth(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    const payload = verifyJWT(token);
    if (!payload) {
      return new Response('Invalid token', { status: 401 });
    }
    
    const user = await getUser(payload.userId);
    if (!user) {
      return new Response('User not found', { status: 401 });
    }
    
    return handler(request, user, ...args);
  };
}

export function requireRole(role: UserRole) {
  return (handler: Function) => {
    return async (request: Request, user: User, ...args: any[]) => {
      if (user.role !== role && user.role !== 'admin') {
        return new Response('Insufficient permissions', { status: 403 });
      }
      
      return handler(request, user, ...args);
    };
  };
}

// Usage
export const GET = requireAuth(
  requireRole('admin')(async (request: Request, user: User) => {
    // Admin-only logic
  })
);
```

### Secrets Management

```typescript
// ✅ DO: Use environment variables for secrets
const config = {
  database: {
    url: process.env.DATABASE_URL!,
    ssl: process.env.NODE_ENV === 'production',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET!,
    sessionSecret: process.env.SESSION_SECRET!,
  },
  external: {
    apiKey: process.env.EXTERNAL_API_KEY!,
    webhookSecret: process.env.WEBHOOK_SECRET!,
  },
};

// ✅ DO: Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'SESSION_SECRET',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// ❌ DON'T: Hardcode secrets
const badConfig = {
  apiKey: 'sk_live_abc123xyz', // NEVER DO THIS
  databasePassword: 'password123',
};
```

### Content Security Policy (CSP)

```typescript
// ✅ DO: Implement strict CSP
export function getCSP(nonce?: string): string {
  const directives = [
    "default-src 'self'",
    nonce ? `script-src 'self' 'nonce-${nonce}'` : "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  
  return directives.join('; ');
}

// ✅ DO: Use nonce for inline scripts
export function ScriptWithNonce({ children }: { children: string }) {
  const nonce = crypto.randomUUID();
  
  return (
    <script nonce={nonce} dangerouslySetInnerHTML={{ __html: children }} />
  );
}
```

### Client-Side Security

```typescript
// ✅ DO: Sanitize user input
import DOMPurify from 'dompurify';

const cleanInput = DOMPurify.sanitize(userInput);

// ✅ DO: Use secure storage
export function secureStorage() {
  return {
    setItem(key: string, value: string) {
      if (typeof window !== 'undefined') {
        // Use sessionStorage for sensitive data
        sessionStorage.setItem(key, value);
      }
    },
    
    getItem(key: string) {
      if (typeof window !== 'undefined') {
        return sessionStorage.getItem(key);
      }
      return null;
    },
    
    removeItem(key: string) {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key);
      }
    },
  };
}

// ❌ DON'T: Store sensitive data in localStorage
export function badStorage() {
  localStorage.setItem('token', 'sensitive-token'); // Vulnerable to XSS
}

// ❌ DON'T: Render unsanitized user content
export function BadComponent({ userInput }: { userInput: string }) {
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}
```

---

## Testing Requirements

### Component Testing

```typescript
// When adding new components, consider test coverage
// Test user interactions, edge cases, and error states

// Example structure:
describe('Button', () => {
  it('renders with correct label', () => {
    // Test implementation
  });
  
  it('calls onClick handler when clicked', () => {
    // Test implementation
  });
  
  it('applies correct variant styles', () => {
    // Test implementation
  });
});
```

### Testing Checklist

- [ ] Component renders correctly
- [ ] User interactions work as expected
- [ ] Error states are handled
- [ ] Loading states display properly
- [ ] Accessibility requirements met
- [ ] Edge cases covered

---

## Performance & Optimization

### Core Web Vitals Optimization

```typescript
// ✅ DO: Optimize for Largest Contentful Paint (LCP)
export function OptimizedPage() {
  return (
    <div>
      {/* Prioritize above-the-fold content */}
      <HeroImage 
        src="/hero.jpg"
        alt="Hero"
        priority // Next.js will preload this image
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      
      {/* Lazy load below-the-fold content */}
      <Suspense fallback={<div>Loading content...</div>}>
        <LazyContent />
      </Suspense>
    </div>
  );
}

// ✅ DO: Optimize for First Input Delay (FID)
export function OptimizedButton() {
  const [isPending, startTransition] = useTransition();
  
  const handleClick = () => {
    startTransition(() => {
      // Non-urgent updates
      setCount(count + 1);
    });
  };
  
  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? 'Processing...' : 'Click me'}
    </button>
  );
}

// ✅ DO: Optimize for Cumulative Layout Shift (CLS)
export function OptimizedCard({ title, image }: CardProps) {
  return (
    <div className="card">
      {/* Reserve space for images to prevent layout shift */}
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3>{title}</h3>
    </div>
  );
}
```

### Image Optimization

```typescript
// ✅ DO: Use next/image for all images
import Image from 'next/image';

export function ProductImage({ product }: { product: Product }) {
  return (
    <div className="relative w-full h-96">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={product.isFeatured}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
        className="object-cover rounded-lg"
      />
    </div>
  );
}

// ✅ DO: Use responsive images with proper sizes
export function ResponsiveImage() {
  return (
    <Image
      src="/banner.jpg"
      alt="Banner"
      width={1200}
      height={600}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
}

// ❌ DON'T: Use regular img tags for optimization
export function BadImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} />; // No optimization
}
```

### Font Optimization

```typescript
// ✅ DO: Use next/font for font optimization
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Prevents invisible text during font loading
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '700'],
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={`font-sans ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}

// ✅ DO: Use font-display: swap for custom fonts
import './globals.css';

// globals.css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-display: swap; /* Prevents FOIT */
}
```

### Code Splitting and Lazy Loading

```typescript
// ✅ DO: Lazy load route components
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('./admin-dashboard'), {
  loading: () => <div>Loading admin dashboard...</div>,
  ssr: false, // Client-side only for admin features
});

export function AdminPage() {
  return <AdminDashboard />;
}

// ✅ DO: Lazy load heavy components
const ChartComponent = dynamic(() => import('./chart-component'), {
  loading: () => <div>Loading chart...</div>,
});

export function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <ChartComponent data={analyticsData} />
    </div>
  );
}

// ✅ DO: Use React.lazy for client components
import { lazy, Suspense } from 'react';

const Modal = lazy(() => import('./modal'));

export function Page() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      
      {showModal && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <Modal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
}
```

### Bundle Size Monitoring

```typescript
// ✅ DO: Use webpack-bundle-analyzer
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
});

// ✅ DO: Import only what you need
// Good: Tree-shakable imports
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Bad: Import entire library
import * as UI from '@/components/ui';
import dateFns from 'date-fns';

// ✅ DO: Use dynamic imports for large libraries
const loadChart = () => import('chart.js').then((mod) => mod.default);

export async function renderChart() {
  const Chart = await loadChart();
  // Use Chart...
}
```

### Caching Strategies

```typescript
// ✅ DO: Use ISR for frequently updated content
export const revalidate = 3600; // Revalidate every hour

export async function getStaticProps() {
  const posts = await getPosts();
  
  return {
    props: { posts },
    revalidate: 3600, // 1 hour
  };
}

// ✅ DO: Use SSG for static content
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ DO: Use on-demand revalidation
export async function POST(request: Request) {
  const body = await request.json();
  
  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }
  
  try {
    await revalidateTag('posts');
    await revalidatePath('/blog/[slug]');
    
    return new Response('Revalidated', { status: 200 });
  } catch (err) {
    return new Response('Error revalidating', { status: 500 });
  }
}

// ✅ DO: Implement client-side caching
const useCachedData = <T>(key: string, fetcher: () => Promise<T>, ttl = 5 * 60 * 1000) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const cached = localStorage.getItem(key);
    const cachedTime = localStorage.getItem(`${key}_time`);
    
    if (cached && cachedTime) {
      const age = Date.now() - parseInt(cachedTime);
      if (age < ttl) {
        setData(JSON.parse(cached));
        return;
      }
    }
    
    setLoading(true);
    fetcher().then((result) => {
      setData(result);
      localStorage.setItem(key, JSON.stringify(result));
      localStorage.setItem(`${key}_time`, Date.now().toString());
    }).finally(() => {
      setLoading(false);
    });
  }, [key, fetcher, ttl]);
  
  return { data, loading };
};
```

### Database Query Optimization

```typescript
// ✅ DO: Use efficient database queries
import { sql } from '@vercel/postgres';

// Good: Select only needed columns
export async function getUserProfile(userId: string) {
  const result = await sql`
    SELECT id, name, email, avatar_url
    FROM users 
    WHERE id = ${userId}
  `;
  return result.rows[0];
}

// Good: Use pagination
export async function getPosts(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  
  const result = await sql`
    SELECT p.id, p.title, p.created_at, u.name as author_name
    FROM posts p
    JOIN users u ON p.author_id = u.id
    ORDER BY p.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  
  return result.rows;
}

// Good: Use indexes effectively
export async function searchPosts(query: string) {
  const result = await sql`
    SELECT id, title, snippet
    FROM posts 
    WHERE search_vector @@ plainto_tsquery('english', ${query})
    ORDER BY ts_rank(search_vector, plainto_tsquery('english', ${query})) DESC
    LIMIT 20
  `;
  
  return result.rows;
}

// ❌ DON'T: Use N+1 queries
export async function getBadPosts() {
  const posts = await sql`SELECT * FROM posts`;
  
  // This creates N+1 queries
  const postsWithAuthors = await Promise.all(
    posts.rows.map(async (post) => {
      const author = await sql`SELECT * FROM users WHERE id = ${post.author_id}`;
      return { ...post, author: author.rows[0] };
    })
  );
  
  return postsWithAuthors;
}
```

### API Response Optimization

```typescript
// ✅ DO: Use compression and efficient responses
import { gzip, deflate } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);
const deflateAsync = promisify(deflate);

export async function GET(request: Request) {
  const data = await getLargeDataSet();
  
  // Check client's accepted encoding
  const acceptEncoding = request.headers.get('accept-encoding') || '';
  
  let compressedData;
  let contentEncoding;
  
  if (acceptEncoding.includes('gzip')) {
    compressedData = await gzipAsync(JSON.stringify(data));
    contentEncoding = 'gzip';
  } else if (acceptEncoding.includes('deflate')) {
    compressedData = await deflateAsync(JSON.stringify(data));
    contentEncoding = 'deflate';
  } else {
    compressedData = JSON.stringify(data);
    contentEncoding = 'identity';
  }
  
  return new Response(compressedData, {
    headers: {
      'Content-Encoding': contentEncoding,
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

// ✅ DO: Implement response streaming
export async function GET(request: Request) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of getDataStream()) {
          controller.enqueue(encoder.encode(JSON.stringify(chunk) + '\n'));
        }
      } finally {
        controller.close();
      }
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Transfer-Encoding': 'chunked',
    },
  });
}

// ✅ DO: Use field selection for API responses
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fields = searchParams.get('fields')?.split(',') || ['id', 'name'];
  
  // Validate fields
  const allowedFields = ['id', 'name', 'email', 'created_at'];
  const selectedFields = fields.filter(field => allowedFields.includes(field));
  
  const query = sql`
    SELECT ${sql.join(selectedFields.map(sql.identifier), ', ')}
    FROM users
  `;
  
  const result = await query;
  return Response.json(result.rows);
}
```

### Lighthouse Score Targets

```typescript
// ✅ DO: Monitor and optimize for Lighthouse scores
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

// ✅ DO: Implement performance monitoring
export function reportWebVitals(metric: any) {
  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        url: window.location.href,
      }),
    });
  }
}

// Target scores:
// Performance: 90+
// Accessibility: 95+
// Best Practices: 90+
// SEO: 90+
```

### Performance Monitoring Tools

```typescript
// ✅ DO: Implement performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  fetch('/api/vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric),
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// ✅ DO: Use React DevTools Profiler
export function ProfilerWrapper({ children }: { children: React.ReactNode }) {
  return (
    <React.Profiler
      id="App"
      onRender={(id, phase, actualDuration) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`${id} ${phase} took ${actualDuration}ms`);
        }
      }}
    >
      {children}
    </React.Profiler>
  );
}

// ✅ DO: Monitor bundle size in CI
// .github/workflows/performance.yml
name: Performance Check
on: [push, pull_request]

jobs:
  bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: preactjs/compressed-size-action@v2
        with:
          repo-token: '${{ secrets.GITHUB_TOKEN }}'
          pattern: './.next/static/chunks/*.js'
```

---

## Next.js SSR and Hydration Best Practices

### Hydration Error Prevention

**Hydration errors occur when server-rendered HTML doesn't match client-rendered output.**

#### Common Causes and Solutions:

1. **Browser-Only APIs**: Never access `window`, `document`, `localStorage` during initial render
   - Solution: Use `useEffect` hook to defer browser-specific logic to client-side only
   - Solution: Use `dynamic` import with `{ ssr: false }` for components requiring browser APIs
   
2. **Time-Dependent Values**: Avoid `Date.now()`, `Math.random()` in render
   - Solution: Move to `useEffect` or event handlers
   - Solution: Wrap in `<Suspense>` boundary with fallback
   
3. **Client-Server State Mismatch**: Initial state must be identical
   - Solution: Pass server state as props to client components
   - Solution: Use `suppressHydrationWarning` only when truly necessary (rare cases)

4. **Async Context Issues**: `cookies()`, `headers()` must be called in correct context
   - Solution: Call these functions before any `setTimeout`, `Promise`, or async boundaries
   - Solution: Never call inside `useEffect` or event handlers

### Cookie-Based Authentication Pattern

Following Next.js official recommendations for session management:

```typescript
// Server-side session creation (Server Action)
import { cookies } from 'next/headers'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()
  
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

// Server-side session verification with React cache
import { cache } from 'react'

export const verifySession = cache(async (resourceId: string) => {
  const cookieStore = await cookies()
  const session = await decrypt(cookieStore.get('session')?.value)
  
  if (!session || session.resourceId !== resourceId) {
    return { isValid: false }
  }
  
  return { isValid: true, ...session }
})
```

### Server Component to Client Component Pattern

**Avoid hydration errors by passing server state as props:**

```typescript
// ❌ Bad: Client component fetching causes mismatch
'use client'
export function BadComponent() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData)
  }, [])
  return <div>{data?.value}</div>
}

// ✅ Good: Server fetches, client receives
// Server Component
export default async function Page() {
  const data = await fetchData()
  return <ClientComponent initialData={data} />
}

// Client Component
'use client'
export function ClientComponent({ initialData }) {
  const [data] = useState(initialData)
  return <div>{data.value}</div>
}
```

### useEffect for Client-Only Logic

```typescript
'use client'
import { useState, useEffect } from 'react'

export function ClientOnlyComponent() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    // Runs only on client after hydration
    setIsClient(true)
  }, [])
  
  return <div>{isClient ? 'Client rendered' : 'Server rendered'}</div>
}
```

### Suspense Boundaries for Dynamic Content

```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DynamicComponent />
    </Suspense>
  )
}
```

### Key Principles

1. **Server and client must render identical initial HTML**
2. **Defer client-only logic to `useEffect` or event handlers**
3. **Use server components for data fetching, pass as props**
4. **Never use `suppressHydrationWarning` unless absolutely necessary**
5. **Wrap dynamic/time-based components in Suspense**
6. **Call `cookies()` and `headers()` in the original async context**

---

## Documentation Standards

### Code Comments

```typescript
// ✅ DO: Comment complex logic or "why"
// Using debounce to prevent excessive API calls during typing
const debouncedSearch = useDebounce(searchTerm, 300);

// ❌ DON'T: Comment obvious code
// Set the count to 0
const count = 0;
```

### README Updates

Update README.md when:
- Adding new features
- Changing setup/installation steps
- Modifying environment variables
- Adding new scripts or commands

### Component Documentation

```typescript
/**
 * UserProfile Component
 * 
 * Displays user information with avatar, name, and bio.
 * Supports edit mode for authenticated users.
 * 
 * @param user - User object with id, name, avatar, and bio
 * @param isEditable - Whether the profile can be edited
 * @param onSave - Callback when profile is saved
 */
```

---

## Decision Making Framework

### When to Ask for User Input

**ASK when:**
- Multiple valid approaches exist
- Breaking changes are required
- UX/design decisions needed
- Uncertain about requirements

**DON'T ASK when:**
- Following established patterns
- Making minor style adjustments
- Fixing obvious bugs
- Standard implementations

### Architecture Decisions

**Consider:**
1. Existing patterns in the codebase
2. Performance implications
3. Maintainability
4. Type safety
5. Developer experience

**Document:**
- Store significant decisions in Byterover memory
- Include rationale and alternatives considered
- Note any trade-offs made

---

## Prohibited Actions

### ❌ NEVER

1. **Modify files without reading them first**
2. **Make changes directly on main branch**
3. **Commit without proper message format**
4. **Hardcode secrets or API keys**
5. **Use `any` type without justification**
6. **Skip error handling**
7. **Delete files without verification**
8. **Ignore TypeScript errors**
9. **Override user's explicit instructions**
10. **Proceed with incomplete context**

### ⚠️ REQUIRE APPROVAL

1. **Breaking changes to public APIs**
2. **Major refactoring across multiple files**
3. **Dependency version upgrades**
4. **Database schema changes**
5. **Authentication/security modifications**
6. **Build configuration changes**

---

## Version History

### v1.1.0 (2025-10-25)
- Added Next.js SSR best practices
- Added industry standards and best practices
- Enhanced security requirements with OWASP guidelines
- Added performance and optimization standards

### v1.0.0 (2025-10-25)
- Initial constitution
- Defined core principles and workflows
- Established code standards
- Added security and testing requirements

---

## Amendment Process

This constitution can be updated when:
- Project requirements change
- New best practices emerge
- Team consensus is reached
- Technology stack evolves

All amendments must be:
1. Documented with version number
2. Communicated to all LLM agents
3. Reflected in Byterover memory
4. Reviewed for consistency

---

**Remember**: This constitution exists to maintain quality, consistency, and security. When in doubt, refer back to the Core Principles and ask for clarification.
