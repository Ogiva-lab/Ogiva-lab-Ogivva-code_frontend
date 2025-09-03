import GiftIcon from "./images/GiftIcon.svg";
import ReceiveIcon from "./images/ReceiveIcon.svg";
import VendorIcon from "./images/VendorIcon.svg";

interface Role {
  role: string;
  icon: string;
  title: string;
  description: string;
}

interface RoleCardProps {
  onSelect: (role: string) => void;
  selectedRole: string | null;
  onContinue: () => void;
}

const roles: Role[] = [
  {
    role: "gifter",
    icon: GiftIcon,
    title: "Gifter",
    description:
      "Share joy with someone you know — or a stranger who needs it.",
  },
  {
    role: "receiver",
    icon: ReceiveIcon,
    title: "Receiver",
    description: "Lucky you! Claim your gift and see what surprises await.",
  },
  {
    role: "vendor",
    icon: VendorIcon,
    title: "Vendor",
    description:
      "Reach new customers, fulfill meaningful orders, and grow your impact.",
  },
];

const RoleCardList: React.FC<RoleCardProps> = ({
  onSelect,
  selectedRole,
  onContinue,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      {roles.map(({ role, icon, title, description }) => {
        const isSelected = selectedRole === role;

        return (
          <div
            key={role}
            onClick={() => onSelect(role)}
            className={`rounded-lg py-4 px-5 cursor-pointer flex items-center border transition-all
              ${
                isSelected
                  ? "bg-[#E4FFED] border-2 border-[#31BB5E]"
                  : "border-[#E4E4E4] hover:border-[#31BB5E]"
              }`}
          >
            <div className="flex items-start gap-4">
              <img src={icon} alt={`${title} Icon`} className="w-8" />
              <div className="max-w-[352px]">
                <h2 className="mb-1 text-[#101010] text-sm font-semibold">
                  {title}
                </h2>
                <p className="text-[#818080] text-xs w-[300px] font-medium">
                  {description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={onContinue}
        disabled={!selectedRole}
        className={`mt-3 w-full py-2.5 font-semibold rounded-[12px] text-center transition-all flex justify-center items-center gap-2
          ${
            selectedRole
              ? "bg-[#31BB5E] text-white hover:bg-green-700 hover:cursor-pointer"
              : "bg-[#F1F1F1] text-[#818080] cursor-not-allowed"
          }`}
      >
        Continue
      </button>
    </div>
  );
};

export default RoleCardList;
