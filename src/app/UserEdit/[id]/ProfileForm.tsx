
'use client';

import { useFormContext } from 'react-hook-form';


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
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 border border-gray-300"> 
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile</h2> 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className='space-y-4'>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama<span className="text-red-500">*</span></label>
          <input
            {...register("name", { required: "Nama wajib diisi" })}
            type="text"
            className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            placeholder="Nama"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

     
        <div>
          <label className="block text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
          <input
            {...register("email", {
              required: "Email wajib diisi",
              validate: value => value.includes('@') || "Email harus mengandung '@'"
            })}
            type="email"
            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            placeholder="example@tonjo.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700">Username<span className="text-red-500">*</span></label>
          <input
            {...register("username", { required: "Username wajib diisi" })}
            type="text"
            className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

  
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone<span className="text-red-500">*</span></label>
          <input
            {...register("phone", {  
              required: "Phone wajib diisi",
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone harus berisi angka saja",
              }, 
            })}
            type="text"
            className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            placeholder="Phone"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender<span className="text-red-500">*</span></label>
          <select
            {...register("gender", { required: "Gender wajib dipilih" })}
            className={`mt-1 block w-full px-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="">Pilih Gender</option>
            <option value="male">Laki-Laki</option>
            <option value="female">Perempuan</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

   
        <div>
          <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
          <input
            {...register("birthPlace")}
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Tempat Lahir"
          />
        </div>

    
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input
            {...register("birthDate")}
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        </div>
        
          <div className='space-y-4'>         
   
        <div>
          <label className="block text-sm font-medium text-gray-700">Bank</label>
          <select
            {...register("bank")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Pilih Bank</option>
            <option value="BNI">BNI</option>
            <option value="BCA">BCA</option>
            <option value="Mandiri">Mandiri</option>
            <option value="BSI">BSI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">No Rekening</label>
          <input
            {...register("bankAccount")}
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="No Rekening"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register("status")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Pilih Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Alamat</label>
          <textarea
            {...register("address")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Alamat"
          />
        </div>
          </div>
       
   
       
      </div>
    </div>
  );
};

export default ProfileForm;
