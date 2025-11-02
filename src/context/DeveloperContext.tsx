import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { INGREDIENTS, getIngredientAvailabilityMap, syncIngredientOverrides } from '../data/ingredients';

type DeveloperContextValue = {
  isDeveloper: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isIngredientEnabled: (id: string) => boolean;
  setIngredientEnabled: (id: string, enabled: boolean) => void;
  ingredientOverrides: Record<string, boolean>;
  resetIngredientAvailability: () => void;
};

const DeveloperContext = createContext<DeveloperContextValue | undefined>(undefined);

const DEV_STORAGE_KEY = '2hlabs:developer-mode';

const getStoredDevFlag = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEV_STORAGE_KEY) === 'true';
};

const getDefaultPassword = () => import.meta.env.VITE_DEV_PASSWORD ?? '2HLABS_DEV';

export const DeveloperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDeveloper, setIsDeveloper] = useState<boolean>(() => getStoredDevFlag());
  const [ingredientOverrides, setIngredientOverridesState] = useState<Record<string, boolean>>(() => getIngredientAvailabilityMap());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEV_STORAGE_KEY, isDeveloper ? 'true' : 'false');
    }
  }, [isDeveloper]);

  const login = (password: string) => {
    const expected = getDefaultPassword();
    if (password.trim() === expected) {
      setIsDeveloper(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsDeveloper(false);

  const isIngredientEnabled = (id: string) => {
    if (Object.prototype.hasOwnProperty.call(ingredientOverrides, id)) {
      return ingredientOverrides[id];
    }
    const ingredient = INGREDIENTS.find(ing => ing.id === id);
    if (!ingredient) return false;
    return ingredient.enabled !== false;
  };

  const setIngredientEnabled = (id: string, enabled: boolean) => {
    setIngredientOverridesState(prev => {
      const next = { ...prev, [id]: enabled };
      const ingredient = INGREDIENTS.find(ing => ing.id === id);
      if (ingredient && (ingredient.enabled !== false) === enabled) {
        delete next[id];
      }
      syncIngredientOverrides(next);
      return next;
    });
  };

  const resetIngredientAvailability = () => {
    syncIngredientOverrides({});
    setIngredientOverridesState({});
  };

  const value = useMemo<DeveloperContextValue>(
    () => ({
      isDeveloper,
      login,
      logout,
      isIngredientEnabled,
      setIngredientEnabled,
      ingredientOverrides,
      resetIngredientAvailability,
    }),
    [ingredientOverrides, isDeveloper],
  );

  return (
    <DeveloperContext.Provider value={value}>
      {children}
    </DeveloperContext.Provider>
  );
};

export const useDeveloper = () => {
  const context = useContext(DeveloperContext);
  if (!context) {
    throw new Error('useDeveloper must be used within a DeveloperProvider');
  }
  return context;
};
