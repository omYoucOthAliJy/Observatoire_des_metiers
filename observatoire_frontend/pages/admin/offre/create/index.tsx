import AdminLayout from "@/components/admin/admin-layout";
import Input from "@/components/form/input";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import schema from "@/validators/emploi";
import { Button } from "@/components/form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { EmploiApi } from "@/api/emploi.api";

function CreateOffre() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    const currentUser = Cookies.get("currentAdmin");
    if (currentUser) {
      const cookieData = JSON.parse(currentUser as string);
      setUser(cookieData.user);
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (loading) {
    return null;
  }

  const onSubmit = (data:any) => {
    const currentUser = Cookies.get("currentAdmin");
    const cookieData = JSON.parse(currentUser as string);
    EmploiApi.createEmploi(cookieData?.token!, data).then(() => router.push("/admin/offre"))
  }

  return (
    <AdminLayout>
      <div>
        <div className="w-full md:w-4/5 h-fit mx-auto my-10">
          <h1 className="text-[#FC9C64] text-2xl font-bold text-center md:text-start">
            Creation d&apos;offre d&apos;emploi
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-md grid grid-cols-2 gap-2 mt-4 p-2 md:p-4 shadow-lg border text-black bg-[#F0EEF2] bg-opacity-35 w-full"
            noValidate
          >
            <div className="col-span-1">
              <Input
                details="Titre"
                stretched
                {...register("titre")}
                error={errors.titre?.message as string}
              />
            </div>
            <div className="col-span-1">
              <Input
                details="Entreprise"
                stretched
                {...register("entreprise")}
                error={errors.description?.message as string}
              />
            </div>
            <div className="col-span-1">
              <Input
                details="Lieu"
                stretched
                {...register("lieu")}
                error={errors.lieu?.message as string}
              />
            </div>
            <div className="col-span-1">
              <Input
                details="Salaire"
                type="number"
                stretched
                {...register("salaire")}
                error={errors.salaire?.message as string}
              />
            </div>
            <div className="col-span-1">
              <Input
                details="Type contrat"
                stretched
                {...register("type_contrat")}
                error={errors.salaire?.message as string}
              />
            </div>
            <div className="col-span-1">
              <Input
                details="Contact email"
                stretched
                {...register("contact_email")}
                error={errors.contact_email?.message as string}
              />
            </div>
            <div className="col-span-1">
              <Input
                details="Contact telephone"
                stretched
                error={errors.contact_telephone?.message as string}
                {...register("contact_telephone")}
              />
            </div>
            <div className="col-span-2">
              <Input
                details="Description"
                stretched
                error={errors.description?.message as string}
                {...register("description")}
              />
            </div>
            <Button
              className="px-8 mx-auto col-span-2"
              type="submit"
              disabled={isSubmitting}
            >
              Confirmer
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateOffre;
