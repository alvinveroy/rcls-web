# Rotary Club of Lucena South Website

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.9-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **Service Above Self - Building Community Through Action**

Official website for the Rotary Club of Lucena South, showcasing our community service projects, events, impact stories, and member portal for club management.

## 🌟 Features

### Public Website
- **Modern Landing Page**: Engaging hero section with club highlights
- **About Section**: Information about Rotary Club of Lucena South and our mission
- **Impact Statistics**: Real-time display of community impact metrics
- **Projects Showcase**: Detailed information about ongoing and completed projects
- **Events Calendar**: Upcoming events, meetings, and activities
- **Blog/News**: Latest updates, impact stories, and community news
- **History Page**: Comprehensive history of the club since founding
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices

### Member Portal
- **Dashboard**: Overview of club activities and personal contributions
- **Attendance Tracking**: Check-in system for meetings and events
- **Payment Management**: Track dues, donations, and payment history
- **Member Roster**: Directory of all active members with contact information
- **Content Management System (CMS)**: 
  - Create and manage blog posts
  - Submit project reports
  - Publish community updates
- **Contribution Tracking**: Log volunteer hours and service activities

## 🚀 Tech Stack

### Framework & Runtime
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library built on Radix UI
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Form Handling & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Analytics & Monitoring
- **[Vercel Analytics](https://vercel.com/analytics)** - Real-time website analytics

### Additional Libraries
- **[date-fns](https://date-fns.org/)** - Date utility library
- **[Recharts](https://recharts.org/)** - Charting library for data visualization
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notification system
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **pnpm**: v8.x or higher (Package manager)
  ```bash
  npm install -g pnpm
  ```
- **Git**: v2.x or higher ([Download](https://git-scm.com/))

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone git@github.com:rotaryclub-rcls/rcls-web.git

# Navigate to project directory
cd rcls-web
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=https://api.example.com
# DATABASE_URL=your_database_url
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure

```
rcls-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── about/                   # About page
│   ├── blog/                    # Blog listing page
│   ├── events/                  # Events page
│   ├── history/                 # Club history page
│   ├── login/                   # Authentication page
│   └── members/                 # Member portal (protected)
│       ├── layout.tsx           # Member area layout
│       ├── page.tsx             # Dashboard
│       ├── attendance/          # Attendance tracking
│       ├── cms/                 # Content management
│       ├── contributions/       # Contribution logging
│       ├── payments/            # Payment management
│       └── roster/              # Member directory
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   └── ...                  # Other UI primitives
│   ├── members/                 # Member portal components
│   │   ├── cms/                 # CMS-specific components
│   │   ├── dashboard-overview.tsx
│   │   ├── sidebar.tsx
│   │   └── ...
│   ├── about.tsx                # Public components
│   ├── events.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   └── ...
│
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts              # Authentication hook
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
│
├── lib/                          # Utilities and helpers
│   ├── auth.ts                  # Authentication utilities
│   ├── mock-data.ts             # Mock data for development
│   └── utils.ts                 # General utilities (cn, etc.)
│
├── public/                       # Static assets
│   └── images/                  # Images and media files
│
├── styles/                       # Global styles
│   └── globals.css              # Global CSS with Tailwind directives
│
├── .eslintrc.json               # ESLint configuration
├── components.json              # shadcn/ui configuration
├── CONTRIBUTING.md              # Contribution guidelines
├── CONSTITUTION.md              # Project guidelines for LLMs
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies
├── pnpm-lock.yaml              # Lock file
├── postcss.config.mjs          # PostCSS configuration
├── README.md                    # This file
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎨 Design System

### Colors

The website uses the official Rotary color palette:

- **Primary Blue**: `#01579B` - Official Rotary Blue
- **Gold**: `#F7A81B` - Rotary Gold
- **Dark Blue**: `#003E73` - Darker shade for accents

### Typography

- **Font**: System fonts (sans-serif) via Tailwind CSS defaults
- **Headings**: Bold weights for clear hierarchy
- **Body**: Regular weight for optimal readability

### Components

All UI components are built using:
- **shadcn/ui**: Accessible, customizable component library
- **Radix UI**: Unstyled, accessible primitives
- **Tailwind CSS**: Utility-first styling

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server (http://localhost:3000)

# Production Build
pnpm build        # Build optimized production bundle
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint to check code quality
```

## 🔐 Authentication

The member portal uses a simple authentication system. In production, this should be replaced with a proper authentication provider (e.g., NextAuth.js, Supabase Auth, Clerk).

**Current Implementation:**
- Basic login form in `/app/login`
- Mock authentication in `lib/auth.ts`
- Protected routes in `/app/members/*`

**TODO for Production:**
- Implement OAuth2/OIDC authentication
- Add proper session management
- Integrate with user database
- Add role-based access control (RBAC)

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/):

1. **Connect Repository**:
   - Sign in to Vercel
   - Import your Git repository
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables**:
   - Add all variables from `.env.local`
   - Update any production-specific values

3. **Deploy**:
   - Vercel will automatically deploy on push to main branch
   - Preview deployments for pull requests

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rotaryclub-rcls/rcls-web)

### Other Platforms

The application can also be deployed to:
- **[Netlify](https://www.netlify.com/)**
- **[AWS Amplify](https://aws.amazon.com/amplify/)**
- **[Cloudflare Pages](https://pages.cloudflare.com/)**
- **Self-hosted** with Docker

## 🤝 Contributing

We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Development workflow guidelines
- Branch naming conventions
- Commit message standards
- Pull request process
- Code style guidelines

### Quick Start for Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch**: `git checkout -b feat/your-feature`
4. **Make your changes** following our code standards
5. **Commit with conventional commits**: `git commit -m "feat(scope): description"`
6. **Push to your fork**: `git push origin feat/your-feature`
7. **Create a pull request** on GitHub

## 📖 Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines for developers
- **[CONSTITUTION.md](CONSTITUTION.md)** - Project principles and guidelines for LLM agents
- **[shadcn/ui Docs](https://ui.shadcn.com/)** - Component documentation
- **[Next.js Docs](https://nextjs.org/docs)** - Framework documentation
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** - Styling documentation

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue on GitHub:

1. **Search existing issues** to avoid duplicates
2. **Use issue templates** when available
3. **Provide detailed information**:
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots or screen recordings
   - Environment details (browser, OS, etc.)

[Report a Bug](https://github.com/rotaryclub-rcls/rcls-web/issues/new?labels=bug) | [Request a Feature](https://github.com/rotaryclub-rcls/rcls-web/issues/new?labels=enhancement)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- **Rotary International** - For the mission and values that drive our work
- **shadcn/ui** - For the excellent component library
- **Vercel** - For Next.js and hosting platform
- **Contributors** - Thank you to all who have contributed to this project

## 📞 Contact

**Rotary Club of Lucena South**
- Website: [https://rotaryclub-rcls.org](https://rotaryclub-rcls.org)
- Email: info@rotaryclub-rcls.org
- Facebook: [@RotaryClubLucenaSouth](https://facebook.com/RotaryClubLucenaSouth)

**For Technical Issues:**
- GitHub Issues: [Report an issue](https://github.com/rotaryclub-rcls/rcls-web/issues)
- Project Maintainers: See [CONTRIBUTING.md](CONTRIBUTING.md)

---

<div align="center">
  <p><strong>Service Above Self</strong></p>
  <p>Made with ❤️ by Rotary Club of Lucena South</p>
  <p>© 2025 Rotary Club of Lucena South. All rights reserved.</p>
</div>
