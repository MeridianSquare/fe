const STEPS = ["Sign up", "Verify email", "Confirmation"] as const;

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export function StepIndicator({
  currentStep,
}: StepIndicatorProps): React.ReactElement {
  return (
    <ol className="d-flex list-unstyled justify-content-between mb-4 gap-2">
      {STEPS.map((label, index) => {
        const stepNumber = (index + 1) as 1 | 2 | 3;
        const isActive = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;

        let badgeClass = "bg-light text-muted";
        if (isActive) {
          badgeClass = "ms-step-active";
        } else if (isComplete) {
          badgeClass = "ms-step-complete";
        }

        return (
          <li key={label} className="flex-fill text-center">
            <span
              className={`badge rounded-pill ${badgeClass} mb-1`}
              aria-current={isActive ? "step" : undefined}
            >
              {stepNumber}
            </span>
            <small className="d-block text-muted">{label}</small>
          </li>
        );
      })}
    </ol>
  );
}
