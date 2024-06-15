import ListItem from "@/components/admin/list-item";
import AdminLayout from "@/components/admin/admin-layout";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { UserApi } from "@/api/user.api";
import { FormulaireApi } from "@/api/formulaire.api";

function UserDetails() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUsers] = useState<any>({});
  const [formulaires, setFormulaires] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = Cookies.get("currentAdmin");
    if (currentUser) {
      const cookieData = JSON.parse(currentUser as string);
      const user_id: string = router.query.id as string;
      UserApi.getUserById(cookieData.token, user_id).then((res) => {
        if (res.ok) {
          const user = res.data.user;
          setUsers(user);
        }
      });
      FormulaireApi.getUserFormulairesAdmin(cookieData.token, user_id).then(res => {
        if (res.ok) {
          const formulaires = res.data.formulaires
          setFormulaires(formulaires)
        }
      })
      setLoading(false);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="flex flex-row gap-2 h-[800px]">
        <div className="flex-1 bg-[#F0EEF2] rounded-md p-4 flex flex-col gap-2">
          <div className="flex justify-center items-start">
            <Image
              src="/profile_image.svg"
              alt="image"
              width={64}
              height={64}
              className="w-48 aspect-square bg-white rounded-full"
            />
          </div>
          <div>
            <p className="w-full font-bold text-center">
              <span>{user.gender === "MALE" ? "M." : "Mlle."}</span>
              <span>{user.lastName + " " + user.firstName}</span>
            </p>
          </div>
          <div>
            <p className="font-semibold">Date de Naissance</p>
            <p>{user.birthDate}</p>
          </div>
          <div>
            <p className="font-semibold">Date de Diplôme</p>
            <p>{user.date_diplome}</p>
          </div>
          <div>
            <p className="font-semibold">Cycle</p>
            <p>{user.formation?.title}</p>
          </div>
          <div>
            <p className="font-semibold">Specialité</p>
            <p>{user.speciality?.title}</p>
          </div>
        </div>
        <div className="flex-1 h-full p-4 pt-0 text-white">
          <h3 className="font-bold text-lg text-[#FC9C64]">Formulaires</h3>
          <div className="w-full h-full overflow-y-scroll flex flex-col justify-start gap-4">
          {formulaires?.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UserDetails;
