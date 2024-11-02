

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { api } from "@/lib/axios";

interface FormData {
  name: string;
  email: string;
  username: string;
  phone: string;
  gender: string;
  birthPlace: string;        
  birthDate: string;         
  bank: string;
  bankAccount: string;        
  status: string;
  address: string;            
}

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone: "",
      gender: "",
      birthPlace: "",
      birthDate: "",
      bank: "",
      bankAccount: "",
      status: "",
      address: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await api.post("/users", data);
      if (response.status === 201) {
        alert("User successfully added");
        reset();
        router.push("/");
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while adding user");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Data User</h1>
        <Button
          href="/"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Cancel
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row mt-6">
        <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6 mr-0 lg:mr-4 mb-4 lg:mb-0 border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: "Nama wajib diisi" })}
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Nama"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email wajib diisi",
                    validate: (value) => {
                      if (!value.includes("@")) {
                        return "Email harus mengandung '@'";
                      }
                      return true;
                    },
                  })}
                  type="email"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="example@tonjo.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Username<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("username", {
                    required: "Username wajib diisi",
                  })}
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                   {...register("phone", {  
                    required: "Phone wajib diisi",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone harus berisi angka saja",
                    }, 
                  })}
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Gender<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("gender", { required: "Gender wajib dipilih" })}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                >
                  <option value="">Pilih Gender</option>
                  <option value="male">Laki Laki</option>
                  <option value="female">Perempuan</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Tempat Lahir
                </label>
                <input
                  {...register("birthPlace")}
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border  rounded-md`}
                  placeholder="Tempat Lahir"
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Tanggal Lahir
                </label>
                <input
                  {...register("birthDate")}
                  type="date"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank
                </label>
                <select
                  {...register("bank")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih Bank</option>
                  <option value="1">BNI</option>
                  <option value="2">BCA</option>
                  <option value="3">Mandiri</option>
                  <option value="4">BSI</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  No Rekening
                </label>
                <input
                  {...register("bankAccount")}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="No Rekening"
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Alamat
                </label>
                <textarea
                  {...register("address")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </form>
        </div>

        <div
          className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6 border border-gray-300 flex flex-col justify-between"
          style={{ height: "33%" }}
        >
          <div>
            <h2 className="text-xl font-semibold mb-4">Aksi</h2>
            <hr className="border-b mb-4" />
          </div>
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

