import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type NavITemProps = {
  path: string;
  label: string;
  icon: (_selected: boolean) => string;
};

const itemStyle = {
  selected: "bg-white text-[#FC9C64]",
  default: "text-white",
};

const NavItem: FC<NavITemProps> = ({ path, label, icon }) => {
  const pathname = usePathname();
  const isSelected = path === pathname;
  const containerColors = isSelected ? itemStyle.selected : itemStyle.default;
  
  return (
    <Link href={path}>
      <div
        className={`ml-8 py-2 pl-4 flex gap-4 rounded-l-full ${containerColors}`}
      >
        <Image
          alt={label}
          src={icon(isSelected)}
          width="21"
          height="21"
        />
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default NavItem;
