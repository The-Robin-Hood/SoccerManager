import cn from "@lib/utils";

import Logo from "@assets/logo.svg";

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
    <nav className='h-full w-[60px] bg-[#111111] px-4 py-5' aria-label='navbar'>
      <img src={Logo} alt='React logo' />
      <div className='mt-11 flex flex-col justify-center gap-9'>
        {navIcons.map((icon, index) => (
          <button
            aria-label='nav-icon'
            key={index}
            className={cn("group relative flex h-6 w-6 items-center justify-center", {
              "text-[#FEA013]": currentActiveNav === index,
              "text-[#69563A]": currentActiveNav !== index,
            })}
            onClick={() => setCurrentActiveNav(index)}>
            <div
              className={cn("absolute -left-2 h-1 w-1 rounded-full bg-[#FEA013]", {
                hidden: currentActiveNav !== index,
              })}></div>
            <FontAwesomeIcon icon={icon} />
            <div className='invisible absolute left-8 w-4 transform bg-transparent text-xs text-white opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100'>
              {tooltips[index]}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
