# Build Your Own Company (BYOC)

**Don't just hire an agency. Build your company.**

Build Your Own Company (BYOC) is a futuristic, gamified web experience that reimagines the process of hiring a software agency. Instead of filling out boring contact forms, users "build" their company by stacking 3D modules into a glass container, chat with an AI product architect, and generate a live demo website.

## Features

- **Immersive Introduction** -- "Warp Speed" landing page effect
- **Interactive Tutorial** -- "Holo-Deck" style onboarding with AI guidance
- **3D Configurator** -- Click-to-select interface where choices stack visually as 3D bricks
- **AI Demo Generator** -- Chat with Pixel AI, then generate a live landing page preview
- **Real-Time Physics** -- Springing animations using Framer Motion
- **Dynamic Pricing** -- Instant quote calculation based on selected modules
- **Blueprint Summary** -- Generated "Checkout" invoice with timeline and cost breakdown
- **Founder's Dashboard** -- Post-purchase cockpit with pipeline, telemetry, and financials

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) (with persist middleware) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| AI | Google Gemini API |
| Validation | [Zod](https://zod.dev/) |

## Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- npm 9+

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RahulBonala/Build-your-Own-Company.git
   cd Build-your-Own-Company
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Then add your Gemini API key to `.env.local`. Get one at [Google AI Studio](https://aistudio.google.com/apikey).

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** at [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI features |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-demo/   # AI website generation endpoint
│   │   ├── health/          # Health check endpoint
│   │   └── pixel/           # AI chat assistant endpoint
│   ├── checkout/            # Blueprint summary & payment
│   ├── configurator/        # 3D module configurator
│   ├── dashboard/           # Founder's cockpit
│   ├── demo/                # AI chat + live preview
│   ├── tutorial/            # Onboarding sequence
│   ├── error.tsx            # Error boundary
│   ├── global-error.tsx     # Root error boundary
│   ├── layout.tsx           # Root layout
│   ├── loading.tsx          # Loading skeleton
│   ├── not-found.tsx        # 404 page
│   └── page.tsx             # Landing page
├── components/
│   ├── dashboard/           # Dashboard widget components
│   ├── Brick.tsx            # Individual 3D module brick
│   ├── ThreeDBox.tsx        # Visual stacking container
│   └── SupplyDock.tsx       # Sidebar selection menu
├── lib/
│   ├── env.ts               # Environment variable validation
│   ├── logger.ts            # Structured logging utility
│   ├── rateLimit.ts         # API rate limiter
│   └── utils.ts             # Utility functions (cn)
├── store/
│   └── builderStore.ts      # Global state (Zustand)
└── utils/
    └── PricingData.ts       # Pricing data & calculations
```

## Design System

- **Colors**: Obsidian (#0f172a), Cyber Cyan (#22d3ee), Silver (#e2e8f0)
- **Typography**: Space Grotesk (headings), Inter (body)

## Deployment

This project is optimized for [Vercel](https://vercel.com). Push to your repository and connect it to Vercel for automatic deployments.

```bash
npm run build   # Verify build succeeds locally first
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run checks: `npm run lint && npm run type-check && npm run format:check`
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request
