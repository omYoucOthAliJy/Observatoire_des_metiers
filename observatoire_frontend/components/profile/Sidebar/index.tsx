import Image from "next/image";
import { Button } from "../../form";
import NavItem from "./nav-item";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
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
    icon: (selected: boolean) => selected ? "/diplome_orange.svg" : "/diplome_white.svg" 
  },
  {
    key: "offre",
    label: "Offre d'emploi",
    path: "/admin/offre",
    icon: (selected: boolean) => selected ? "/offre_orange.svg" : "/offre_white.svg" 
  }
]

const itemStyle = {
  selected: "bg-white text-[#FC9C64]",
  default: "text-white"
}

export default function SideBar() {
  const router = useRouter()
  const logout = () => {
    Cookies.remove("currentAdmin")
    router.push("/admin/login")
  }
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
          <NavItem {...item} key={item.key}/>
        ))}
      </div>
      <div className="mt-auto p-4 flex justify-center">
        <Button className="bg-white text-[#FC9C64] px-10" onClick={logout}>Deconnexion</Button>
      </div>
    </div>
  );
}
