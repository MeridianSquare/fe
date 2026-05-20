import type { ReactNode } from "react";
import { StepIndicator } from "../ui/StepIndicator";

interface OnboardingLayoutProps {
  title: string;
  subtitle: string;
  currentStep: 1 | 2 | 3;
  children: ReactNode;
}

export function OnboardingLayout({
  title,
  subtitle,
  currentStep,
  children,
}: OnboardingLayoutProps): React.ReactElement {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="ms-brand-header py-4 mb-4">
        <div className="container">
          <h1 className="h4 mb-0">Meridian Square</h1>
          <p className="mb-0 opacity-75 small">
            Regulated real-world asset tokenization
          </p>
        </div>
      </header>

      <main className="container flex-grow-1 pb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card ms-card">
              <div className="card-body p-4">
                <StepIndicator currentStep={currentStep} />
                <h2 className="h5 mb-1">{title}</h2>
                <p className="text-muted small mb-4">{subtitle}</p>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
