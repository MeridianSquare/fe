interface PrimaryButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PrimaryButton({
  children,
  type = "button",
  disabled = false,
  onClick,
  className = "",
}: PrimaryButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      className={`btn btn-primary w-100 ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
