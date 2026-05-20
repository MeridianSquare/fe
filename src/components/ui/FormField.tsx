interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "date";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "select";
  options?: readonly string[];
}

export function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  as = "input",
  options = [],
}: FormFieldProps): React.ReactElement {
  const inputClassName = `form-control${error ? " is-invalid" : ""}`;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      {as === "select" ? (
        <select
          id={id}
          className={inputClassName}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="">Select country</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className={inputClassName}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <div id={`${id}-error`} className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}
