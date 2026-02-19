export type OptionType = {
    id: string;
    label: string;
    description: string;
    details: string[];
    price: number;
    monthly?: number;
    setup?: number;
    time?: number;
    color: string;
};

export type PricingDataType = {
    design: Record<string, OptionType>;
    database: Record<string, OptionType>;
    testing: Record<string, OptionType>;
    marketing: Record<string, OptionType>;
};

export const PRICING_DATA: PricingDataType = {
    design: {
        minimal: {
            id: 'minimal',
            label: "Minimal",
            description: "Premium Template Adaptation",
            details: [
                "Premium Template Adaptation",
                "5 Pages (Home/About/Contact)",
                "Mobile Responsive",
                "Basic SEO"
            ],
            price: 40000,
            time: 1,
            color: "from-cyan-500 to-blue-500"
        },
        mid: {
            id: 'mid',
            label: "Mid-Range",
            description: "Custom Figma Design",
            details: [
                "Custom Figma Design",
                "React/Next.js",
                "Framer Motion Interactions",
                "CMS Integration",
                "Dark Mode"
            ],
            price: 150000,
            time: 3,
            color: "from-cyan-500 to-blue-500"
        },
        high: {
            id: 'high',
            label: "Luxury",
            description: "Award-Winning Awwwards Aesthetic",
            details: [
                "Award-Winning Awwwards Aesthetic",
                "WebGL/Three.js 3D Elements",
                "Immersive Audio",
                "Global CDN",
                "Scrollytelling"
            ],
            price: 400000,
            time: 7,
            color: "from-cyan-500 to-blue-500"
        }
    },
    database: {
        small: {
            id: 'small',
            label: "Starter",
            description: "Firebase/Supabase (Serverless)",
            details: [
                "Firebase/Supabase (Serverless)",
                "Real-time DB",
                "Google Auth",
                "Daily Auto-Backups",
                "Shared Infrastructure"
            ],
            price: 0,
            setup: 20000,
            monthly: 2000,
            color: "from-emerald-400 to-green-600"
        },
        medium: {
            id: 'medium',
            label: "Growth",
            description: "AWS RDS (Managed Postgres)",
            details: [
                "AWS RDS (Managed Postgres)",
                "Redis Caching for Speed",
                "Dedicated Compute",
                "Point-in-Time Recovery"
            ],
            price: 0,
            setup: 80000,
            monthly: 10000,
            color: "from-emerald-400 to-green-600"
        },
        large: {
            id: 'large',
            label: "Enterprise",
            description: "Kubernetes Cluster",
            details: [
                "Kubernetes Cluster",
                "Multi-Region Replication",
                "Auto-Scaling",
                "99.99% Uptime SLA",
                "SOC2 Compliance"
            ],
            price: 0,
            setup: 250000,
            monthly: 50000,
            color: "from-emerald-400 to-green-600"
        }
    },
    testing: {
        basic: {
            id: 'basic',
            label: "Happy Path",
            description: "Manual Verification",
            details: [
                "Manual Verification",
                "Main User Flows (Signup/Pay)",
                "Mobile Responsiveness Check",
                "Bug Report"
            ],
            price: 15000,
            color: "from-amber-300 to-orange-500"
        },
        standard: {
            id: 'standard',
            label: "Integration",
            description: "Automated Jest/Cypress Suites",
            details: [
                "Automated Jest/Cypress Suites",
                "API Endpoint Testing",
                "Cross-Browser (Safari/Firefox)",
                "Regression Tests"
            ],
            price: 60000,
            color: "from-amber-300 to-orange-500"
        },
        extreme: {
            id: 'extreme',
            label: "Chaos/Security",
            description: "Chaos Engineering & Security",
            details: [
                "Load Testing (50k+ Users)",
                "Penetration Testing (OWASP)",
                "Chaos Engineering (Server Failure Drills)"
            ],
            price: 150000,
            color: "from-amber-300 to-orange-500"
        }
    },
    marketing: {
        launch: {
            id: 'launch',
            label: "Launch Pad",
            description: "Digital Presence",
            details: [
                "Google Business Profile",
                "Basic Social Setup (Insta/LinkedIn)",
                "GA4 Analytics Setup",
                "2 Blog Posts"
            ],
            price: 40000,
            color: "from-fuchsia-500 to-pink-600"
        },
        growth: {
            id: 'growth',
            label: "Growth Strategy",
            description: "Acquisition Machine",
            details: [
                "Meta/Google Ads Setup",
                "Pixel Tracking",
                "5 Micro-Influencer Shoutouts",
                "Email Drip Campaigns"
            ],
            price: 150000,
            color: "from-fuchsia-500 to-pink-600"
        },
        dominance: {
            id: 'dominance',
            label: "Market Dominance",
            description: "Brand Ubiquity",
            details: [
                "Omnichannel PR Strategy",
                "Viral Video Production",
                "Community Management",
                "Brand Book & Asset Kit"
            ],
            price: 500000,
            color: "from-fuchsia-500 to-pink-600"
        }
    }
};

export const calculateQuote = (selections: { design: string | null; database: string | null; testing: string | null; marketing: string | null; }) => {
    let oneTimeCost = 0;
    let monthlyCost = 0;
    let timelineWeeks = 0;

    if (selections.design && PRICING_DATA.design[selections.design]) {
        const item = PRICING_DATA.design[selections.design];
        oneTimeCost += item.price;
        if (item.time) timelineWeeks += item.time;
    }

    if (selections.database && PRICING_DATA.database[selections.database]) {
        const item = PRICING_DATA.database[selections.database];
        if (item.setup) oneTimeCost += item.setup;
        if (item.monthly) monthlyCost += item.monthly;
    }

    if (selections.testing && PRICING_DATA.testing[selections.testing]) {
        const item = PRICING_DATA.testing[selections.testing];
        oneTimeCost += item.price;
    }

    if (selections.marketing && PRICING_DATA.marketing[selections.marketing]) {
        const item = PRICING_DATA.marketing[selections.marketing];
        oneTimeCost += item.price;
    }

    return { oneTimeCost, monthlyCost, timelineWeeks };
};
