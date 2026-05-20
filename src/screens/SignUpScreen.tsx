import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInvestor } from "../api/investors";
import { OnboardingLayout } from "../components/layout/OnboardingLayout";
import { FormField } from "../components/ui/FormField";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useOnboarding } from "../context/OnboardingContext";
import type { CreateInvestorPayload } from "../types/investor";

const COUNTRIES = [
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Singapore",
  "India",
  "Germany",
  "France",
  "Canada",
  "Australia",
  "Saudi Arabia",
] as const;

interface FormErrors {
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
  country?: string;
  form?: string;
}

function validateClient(payload: CreateInvestorPayload): FormErrors {
  const errors: FormErrors = {};

  if (payload.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.dateOfBirth)) {
    errors.dateOfBirth = "Please enter a valid date of birth";
  }

  if (!payload.country) {
    errors.country = "Please select your country";
  }

  return errors;
}

export function SignUpScreen(): React.ReactElement {
  const navigate = useNavigate();
  const { setDraft, setInvestor } = useOnboarding();
  const [form, setForm] = useState<CreateInvestorPayload>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    country: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof CreateInvestorPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clientErrors = validateClient(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload: CreateInvestorPayload = {
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        dateOfBirth: form.dateOfBirth,
        country: form.country,
      };

      const investor = await createInvestor(payload);
      setDraft(payload);
      setInvestor(investor);
      navigate("/verify");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unable to create account";
      setErrors({ form: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingLayout
      title="Create your investor account"
      subtitle="Screen 3 — Sign up with your personal details"
      currentStep={1}
    >
      <form onSubmit={handleSubmit} noValidate>
        {errors.form && (
          <div className="alert alert-danger" role="alert">
            {errors.form}
          </div>
        )}

        <FormField
          id="fullName"
          label="Full name"
          value={form.fullName}
          onChange={(value) => updateField("fullName", value)}
          error={errors.fullName}
          required
          placeholder="Jane Doe"
        />

        <FormField
          id="email"
          label="Email address"
          type="email"
          value={form.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
          required
          placeholder="jane@example.com"
        />

        <FormField
          id="dateOfBirth"
          label="Date of birth"
          type="date"
          value={form.dateOfBirth}
          onChange={(value) => updateField("dateOfBirth", value)}
          error={errors.dateOfBirth}
          required
        />

        <FormField
          id="country"
          label="Country"
          as="select"
          options={COUNTRIES}
          value={form.country}
          onChange={(value) => updateField("country", value)}
          error={errors.country}
          required
        />

        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Continue to verification"}
        </PrimaryButton>
      </form>
    </OnboardingLayout>
  );
}
