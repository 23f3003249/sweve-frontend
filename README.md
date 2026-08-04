<p align="center">
  <img width="207" height="207" alt="sweve" src="https://github.com/user-attachments/assets/bf838d3c-3287-4d80-9fef-416ac8f64ed3" />
</p>

<h1 align="center">Sweve</h1>
<p align="center"><strong>An event platform for hosting and managing events</strong></p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#available-scripts">Scripts</a> •
  <a href="#environment-variables">Environment</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## Features

- **Authentication System** — Complete auth flow with sign up, sign in, password reset, email verification, and two-factor authentication
- **Modern UI Components** — Reusable, accessible components built with Radix UI primitives and Tailwind CSS
- **Event Management** — Create, host, and manage events (WIP)
- **Responsive Design** — Mobile-first approach with dark mode support
- **Type Safety** — Full TypeScript coverage with strict mode

## Tech Stack

| Category          | Technology                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------- |
| Framework         | [Next.js 15](https://nextjs.org/) (App Router)                                              |
| Language          | [TypeScript](https://www.typescriptlang.org/)                                               |
| Styling           | [Tailwind CSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/)                  |
| UI Primitives     | [Radix UI](https://www.radix-ui.com/)                                                       |
| Package Manager   | [pnpm](https://pnpm.io/)                                                                    |
| Linting           | [ESLint](https://eslint.org/) with Next.js config                                           |
| Font Optimization | [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Geist) |

## Project Structure

```
sweve-frontend/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles & Tailwind imports
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Landing page
├── components/
│   ├── auth/               # Authentication components
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   ├── forgot-password.tsx
│   │   ├── reset-password.tsx
│   │   ├── verify-email.tsx
│   │   ├── two-factor methods
│   │   └── provider buttons (OAuth)
│   └── ui/                 # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── toast (sonner)
│       └── ... (30+ components)
├── lib/
│   ├── utils.ts            # Shared utilities (cn, etc.)
│   └── auth/               # Auth helpers & hooks
├── public/                 # Static assets
├── eslint.config.mjs       # ESLint flat config
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript config (strict)
└── pnpm-workspace.yaml     # pnpm workspace config
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm))
- pnpm 8+ (`corepack enable && corepack prepare pnpm@latest --activate`)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sweve-frontend

# Install dependencies
pnpm install

# Set up environment variables (see below)
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Start development server with Turbopack   |
| `pnpm build`     | Build for production                      |
| `pnpm start`     | Start production server                   |
| `pnpm lint`      | Run ESLint                                |
| `pnpm typecheck` | Run TypeScript compiler check             |
| `pnpm format`    | Format code with Prettier (if configured) |

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Authentication (example - adjust to your auth provider)
NEXT_PUBLIC_AUTH_URL=http://localhost:3000
AUTH_SECRET=your-secret-key-here

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Database / Backend API (if applicable)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

> **Note**: Never commit `.env.local` or any file containing secrets. Use `.env.example` as a template.

## Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

Enable `output: 'standalone'` in `next.config.ts` for Docker deployments.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request to `dev` branch of main repo

### Code Style

- Run `pnpm lint` before committing
- Follow existing component patterns in `components/ui/` and `components/auth/`
- Use the `cn()` utility from `lib/utils.ts` for className composition
- Keep components small and focused

---

<p align="center">Built with ❤️ using Next.js</p>
