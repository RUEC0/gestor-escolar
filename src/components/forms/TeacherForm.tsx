"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(5, { message: "El nombre de usuario debe contener por lo menos 5 caracteres" })
    .max(10, { message: "El nombre de usuario no puede contener más de 10 caracteres" }),
  email: z.string().email({ message: "La dirección de correo electrónico no es válida" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe contener 8 caracteres mínimo" }),
  firstName: z.string().min(1, { message: "Debes ingresar el nombre" }),
  lastName: z.string().min(1, { message: "Ingresa el apellido" }),
  phone: z.string().min(1, { message: "Ingresa el número telefónico" }),
  address: z.string().min(1, { message: "Ingresa una dirección" }),
  bloodType: z.
  string().min(11, { message: "El NSS debe contener 11 caracteres" })
  .max(11, { message: "El NSS no puede contener más de 11 caracteres" }),
  curp: z.
  string().min(18, { message: "La CURP debe contener 18 caracteres" })
  .max(18, { message: "La CURP contiene más de 18 caracteres" }),
  birthday: z.date({ message: "Ingresa la fecha de nacimiento" }),
  sex: z.enum(["male", "female"], { message: "Ingresa el sexo" }),
  img: z.instanceof(File, { message: "Sube una imagen" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Agregar docente</h1>
      <span className="text-xs text-gray-400 font-medium">
        Información de acceso
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Usuario"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Información personal
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Apellido"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="CURP"
          name="curp"
          defaultValue={data?.curp}
          register={register}
          error={errors.curp}
        />
        <InputField
          label="Teléfono"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Dirección"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Número de Seguro Social"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Fecha de nacimiento"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sexo</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Subir una foto</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-verde-300 text-white p-2 rounded-md">
        {type === "create" ? "Agregar" : "Actualizar"}
      </button>
    </form>
  );
};

export default TeacherForm;
