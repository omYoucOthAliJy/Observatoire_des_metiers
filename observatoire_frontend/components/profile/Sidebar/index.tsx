import Image from "next/image";
import Link from "next/link";
import { Button } from "../../form";
import NavItem from "./nav-item";

const menu = [
  {
    key: "home",
    label: "Home",
    path: "/admin",
    icon: (selected: boolean) => selected ? "/admin_home_orange.svg" : "/admin_home_white.svg" 
  },
  {
    key: "diplome",
    label: "Diplomés",
    path: "/admin/diplome",
    icon: (selected: boolean) => selected ? "/admin_home_orange.svg" : "/admin_home_white.svg" 
  },
  {
    key: "offre",
    label: "Offre d'emploi",
    path: "/admin/offre",
    icon: (selected: boolean) => selected ? "/admin_home_orange.svg" : "/admin_home_white.svg" 
  }
]

const itemStyle = {
  selected: "bg-white text-[#FC9C64]",
  default: "text-white"
}

export default function SideBar() {
  return (
    <div className="w-64 bg-[#FC9C64] flex flex-col">
      <div className="p-4 mb-16">
        <Image
          alt="logo"
          src="/sup_galilee_white.svg"
          className="w-full"
          width="30"
          height="30"
        />
      </div>
      <div className="flex flex-col gap-4">
        {menu.map((item) => (
          <NavItem {...item} />
        ))}
      </div>
      <div className="mt-auto p-4 flex justify-center">
        <Button className="bg-white text-[#FC9C64] px-10">Deconnexion</Button>
      </div>
    </div>
  );
}
