import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../components/layout/OnboardingLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useOnboarding } from "../context/OnboardingContext";

const MOCK_OTP = "123456";

export function OtpVerificationScreen(): React.ReactElement {
  const navigate = useNavigate();
  const { draft, investorId } = useOnboarding();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!draft || !investorId) {
      navigate("/", { replace: true });
    }
  }, [draft, investorId, navigate]);

  if (!draft) {
    return <></>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsVerifying(true);
    setError(undefined);

    // Mock verification — no email service in assessment scope
    window.setTimeout(() => {
      if (otp.trim() === MOCK_OTP) {
        navigate("/confirmation");
      } else {
        setError("Invalid code. Use 123456 for this demo.");
      }
      setIsVerifying(false);
    }, 600);
  };

  const maskedEmail = draft.email.replace(
    /(.{2})(.*)(@.*)/,
    (_match, start: string, middle: string, domain: string) =>
      `${start}${"*".repeat(Math.min(middle.length, 6))}${domain}`
  );

  return (
    <OnboardingLayout
      title="Verify your email"
      subtitle="Screen 4 — Enter the one-time code (mock UI)"
      currentStep={2}
    >
      <p className="small text-muted">
        We sent a 6-digit code to <strong>{maskedEmail}</strong>. For this
        assessment, enter <code>123456</code>.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
            Verification code
          </label>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            className={`form-control form-control-lg text-center letter-spacing-2${
              error ? " is-invalid" : ""
            }`}
            value={otp}
            onChange={(event) => {
              setOtp(event.target.value.replace(/\D/g, ""));
              setError(undefined);
            }}
            placeholder="000000"
            required
            aria-invalid={Boolean(error)}
          />
          {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>

        <PrimaryButton type="submit" disabled={isVerifying || otp.length !== 6}>
          {isVerifying ? "Verifying…" : "Verify and continue"}
        </PrimaryButton>

        <button
          type="button"
          className="btn btn-link w-100 mt-2 small"
          onClick={() => setOtp("")}
        >
          Resend code (mock)
        </button>
      </form>
    </OnboardingLayout>
  );
}
