# 🚀 Build Your Own Company (BYOC)

**Don't just hire an agency. Build your company.**

Build Your Own Company (BYOC) is a futuristic, gamified web experience that reimagines the process of hiring a software agency. Instead of filling out boring contact forms, users "build" their company by stacking 3D modules into a glass container.

## ✨ Features

- **Immersive Introduction**: "Warp Speed" landing page effect.
- **Interactive Tutorial**: "Holo-Deck" style onboarding with AI guidance.
- **3D Configurator**: Drag-and-drop or click-to-select interface where choices stack visually as 3D bricks.
- **Real-Time Physics**: "Snappy" springing animations using Framer Motion.
- **Dynamic Pricing**: Instant quote calculation based on selected modules.
- **Detailed Specs**: Hover tooltips reveal technical deliverables for every option.
- **Blueprint Summary**: A generated "Checkout" invoice with timeline and cost breakdown.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom "Obsidian" & "Cyber Cyan" Theme)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Layout ID & Springs)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RahulBonala/Build-your-Own-Company.git
   cd Build-your-Own-Company
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx            # Landing Page (Warp Effect)
│   ├── tutorial/           # Onboarding (AI Guide)
│   ├── configurator/       # Main App (3D Box + Supply Dock)
│   └── checkout/           # Summary & Payment Stub
├── components/
│   ├── ThreeDBox.tsx       # Visual Stacking Container
│   ├── Brick.tsx           # Individual 3D Module
│   └── SupplyDock.tsx      # Sidebar Selection Menu
├── store/
│   └── builderStore.ts     # Global State (Zustand)
└── utils/
    └── PricingLogic.js     # Pricing Data & Calculator
```

## 🎨 Design System

- **Colors**:
  - `bg-obsidian` (#0B0C10) - Deep Space Black
  - `text-cyber-cyan` (#66FCF1) - Neon Accent
  - `text-silver` (#C5C6C7) - Secondary Text
- **Typography**:
  - Headings: *Space Grotesk*
  - Body: *Inter*

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
