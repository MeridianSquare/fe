import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CreateInvestorPayload, Investor } from "../types/investor";

interface OnboardingState {
  investorId: string | null;
  draft: CreateInvestorPayload | null;
  investor: Investor | null;
}

interface OnboardingContextValue extends OnboardingState {
  setDraft: (draft: CreateInvestorPayload) => void;
  setInvestor: (investor: Investor) => void;
  clear: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined
);

const initialState: OnboardingState = {
  investorId: null,
  draft: null,
  investor: null,
};

export function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [state, setState] = useState<OnboardingState>(initialState);

  const setDraft = useCallback((draft: CreateInvestorPayload) => {
    setState((prev) => ({ ...prev, draft }));
  }, []);

  const setInvestor = useCallback((investor: Investor) => {
    setState({
      investorId: investor.id,
      draft: {
        fullName: investor.fullName,
        email: investor.email,
        dateOfBirth: investor.dateOfBirth,
        country: investor.country,
      },
      investor,
    });
  }, []);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setDraft,
      setInvestor,
      clear,
    }),
    [state, setDraft, setInvestor, clear]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
