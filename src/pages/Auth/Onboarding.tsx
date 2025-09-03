import { useNavigate } from "react-router-dom";
import GivvaIcon from "../images/GivvaLogo.svg";
import PhotoSlider from "../../components/Auth/PhotoSliderComp/PhotoSlider.tsx";
import RoleCardList from "../../components/Auth/RoleCardComp/SelectRoleCard.tsx";
import { useAuthStore } from "../../store/authStore.tsx";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { selectedRole, setRole } = useAuthStore();

  const handleSelectRole = (role: string) => {
    console.log("Selected role:", role);
    setRole(role as never);
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    console.log("Continue with role:", selectedRole);

    // Navigate based on selected role
    if (selectedRole === "vendor") {
      navigate("/signup/vendor");
    } else {
      navigate("/signup");
    }
  };

  return (
    <main className="grid grid-cols-1 lg:grid lg:grid-cols-[40%_60%]">
      <div className="px-8 md:px-25 py-5 flex flex-col lg:px-4">
        <img
          src={GivvaIcon}
          alt="Givva Logo"
          className="mt-8 mb-5 w-27 mx-auto"
        />
        <h1 className="text-[22px] text-center font-semibold text-[#101010] mb-2 tracking-tight">
          Let’s get you started
        </h1>
        <p className="text-[#818080] text-sm mb-6 text-center font-medium">
          Tell us what you’d like to do on GIVVA. You can always switch roles
          later.
        </p>

        <RoleCardList
          onSelect={handleSelectRole}
          selectedRole={selectedRole}
          onContinue={handleContinue}
        />

        <p className="text-[#818080] text-sm mt-5 font-medium text-center">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-[#31BB5E] hover:underline font-semibold"
          >
            Sign In
          </a>
        </p>
      </div>

      <div className="">
        <PhotoSlider />
      </div>
    </main>
  );
}
