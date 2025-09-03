import { Routes, Route } from "react-router-dom";
import "./App.css";
import Onboarding from "./pages/Auth/Onboarding.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import VerifyEmail from "./pages/Auth/VerifyEmail.tsx";
import EmailVerified from "./pages/Auth/EmailVerified.tsx";
import SignIn from "./pages/Auth/SignIn.tsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.tsx";
import VerifyCode from "./pages/Auth/VerifyCode.tsx";
import ResetPassword from "./pages/Auth/ResetPassword.tsx";
import PasswordResetSuccess from "./pages/Auth/PasswordResetSuccess.tsx";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<div>Landing Page</div>} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/signup/vendor" element={<div>Vendor Registration Page</div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-successful"
          element={<PasswordResetSuccess />}
        />
      </Routes>
    </div>
  );
}

export default App;
