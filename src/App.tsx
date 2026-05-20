import { Navigate, Route, Routes } from "react-router-dom";
import { OnboardingProvider } from "./context/OnboardingContext";
import { ConfirmationScreen } from "./screens/ConfirmationScreen";
import { OtpVerificationScreen } from "./screens/OtpVerificationScreen";
import { SignUpScreen } from "./screens/SignUpScreen";

export function App(): React.ReactElement {
  return (
    <OnboardingProvider>
      <Routes>
        <Route path="/" element={<SignUpScreen />} />
        <Route path="/verify" element={<OtpVerificationScreen />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </OnboardingProvider>
  );
}
