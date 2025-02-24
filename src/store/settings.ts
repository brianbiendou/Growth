import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';
import { languages } from '../i18n';

export const currencies = {
  EUR: { symbol: '€', name: 'Euro', rate: 0.92 },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.79 },
  INR: { symbol: '₹', name: 'Indian Rupee', rate: 82.85 },
  RUB: { symbol: '₽', name: 'Russian Ruble', rate: 92.50 },
  TRY: { symbol: '₺', name: 'Turkish Lira', rate: 31.20 },
  USD: { symbol: '$', name: 'US Dollar', rate: 1 },
  XOF: { symbol: 'CFA', name: 'West African CFA', rate: 603.50 },
} as const;

export type CurrencyCode = keyof typeof currencies;

interface SettingsState {
  language: string;
  direction: 'ltr' | 'rtl';
  currency: CurrencyCode;
  theme: 'dark' | 'light';
  showSettings: boolean;
  setLanguage: (language: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  toggleTheme: () => void;
  resetSettings: () => void;
  hideSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      direction: 'ltr',
      currency: 'USD',
      theme: 'dark',
      showSettings: true,
      setLanguage: (language) => {
        const dir = languages[language]?.dir || 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
        i18n.changeLanguage(language);
        set({ language, direction: dir });
      },
      setCurrency: (currency) => {
        set({ currency });
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.classList.toggle('light-mode');
          return { theme: newTheme };
        });
      },
      resetSettings: () => {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        document.documentElement.classList.remove('light-mode');
        i18n.changeLanguage('en');
        set({ language: 'en', direction: 'ltr', currency: 'USD', theme: 'dark', showSettings: true });
      },
      hideSettings: () => set({ showSettings: false })
    }),
    {
      name: 'settings-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.dir = state.direction;
          document.documentElement.lang = state.language;
          if (state.theme === 'light') {
            document.documentElement.classList.add('light-mode');
          }
          i18n.changeLanguage(state.language);
        }
      }
    }
  )
);