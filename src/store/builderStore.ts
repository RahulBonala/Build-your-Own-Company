import { create } from 'zustand';
import { calculateQuote, PRICING_DATA } from '@/utils/PricingData';

interface BuilderState {
    idea: string;
    selections: {
        design: string | null;
        database: string | null;
        testing: string | null;
        marketing: string | null;
    };
    quote: {
        oneTimeCost: number;
        monthlyCost: number;
        timelineWeeks: number;
    };
    setIdea: (idea: string) => void;
    setSelection: (category: 'design' | 'database' | 'testing' | 'marketing', value: string) => void;
}

import { persist } from 'zustand/middleware';

export const useBuilderStore = create<BuilderState>()(
    persist(
        (set) => ({
            idea: '',
            selections: {
                design: null,
                database: null,
                testing: null,
                marketing: null,
            },
            quote: {
                oneTimeCost: 0,
                monthlyCost: 0,
                timelineWeeks: 0,
            },
            setIdea: (idea) => set({ idea }),
            setSelection: (category, value) =>
                set((state) => {
                    const newSelections = { ...state.selections, [category]: value };
                    const newQuote = calculateQuote(newSelections);
                    return { selections: newSelections, quote: newQuote };
                }),
        }),
        {
            name: 'builder-storage',
        }
    )
);
