import Logo from "@assets/logo.svg";
import cn from "@lib/utils";
import { FontAwesomeIcon, IconDefinition } from "@components/common/Icons";
const Navbar = ({
  currentActiveNav,
  setCurrentActiveNav,
  navIcons,
  tooltips,
}: {
  currentActiveNav: number;
  setCurrentActiveNav: (index: number) => void;
  navIcons: IconDefinition[];
  tooltips: string[];
}) => {
  return (
    <nav className="w-[60px] bg-[#111111] h-full px-4 py-5" aria-label="navbar">
      <img src={Logo} alt="React logo" />
      <div className="mt-11 flex flex-col justify-center gap-9">
        {navIcons.map((icon, index) => (
          <button
            aria-label="nav-icon"
            key={index}
            className={cn(
              "group relative w-6 h-6 flex items-center justify-center",
              {
                "text-[#FEA013]": currentActiveNav === index,
                "text-[#69563A]": currentActiveNav !== index,
              }
            )}
            onClick={() => setCurrentActiveNav(index)}
          >
            <div
              className={cn(
                "w-1 h-1 rounded-full bg-[#FEA013] absolute -left-2",
                {
                  hidden: currentActiveNav !== index,
                }
              )}
            ></div>
            <FontAwesomeIcon icon={icon} />
            <div className="absolute left-8 text-xs w-4 transform opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 bg-transparent text-white">
              {tooltips[index]}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
