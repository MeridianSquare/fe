import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvestorById } from "../api/investors";
import { OnboardingLayout } from "../components/layout/OnboardingLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useOnboarding } from "../context/OnboardingContext";
import type { Investor } from "../types/investor";

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ConfirmationScreen(): React.ReactElement {
  const navigate = useNavigate();
  const { investorId, clear } = useOnboarding();
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!investorId) {
      navigate("/", { replace: true });
      return;
    }

    const loadInvestor = async () => {
      try {
        const record = await getInvestorById(investorId);
        setInvestor(record);
      } catch (loadError: unknown) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Failed to load investor details";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadInvestor();
  }, [investorId, navigate]);

  if (!investorId) {
    return <></>;
  }

  const handleStartOver = () => {
    clear();
    navigate("/");
  };

  return (
    <OnboardingLayout
      title="You're all set"
      subtitle="Screen 5 — Post-verification confirmation"
      currentStep={3}
    >
      {isLoading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading…</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && investor && (
        <>
          <div className="alert alert-success" role="status">
            Email verified. Your investor profile has been created.
          </div>

          <dl className="row mb-4">
            <dt className="col-sm-4 text-muted">Full name</dt>
            <dd className="col-sm-8">{investor.fullName}</dd>

            <dt className="col-sm-4 text-muted">Email</dt>
            <dd className="col-sm-8">{investor.email}</dd>

            <dt className="col-sm-4 text-muted">Date of birth</dt>
            <dd className="col-sm-8">{formatDate(investor.dateOfBirth)}</dd>

            <dt className="col-sm-4 text-muted">Country</dt>
            <dd className="col-sm-8">{investor.country}</dd>

            <dt className="col-sm-4 text-muted">Investor ID</dt>
            <dd className="col-sm-8">
              <code className="small">{investor.id}</code>
            </dd>
          </dl>

          <PrimaryButton onClick={handleStartOver}>
            Start new onboarding (demo)
          </PrimaryButton>
        </>
      )}
    </OnboardingLayout>
  );
}
