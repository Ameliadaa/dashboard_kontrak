"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, updateUser, User } from "@/lib/axios";
import { useForm, FormProvider } from "react-hook-form";
import Contract from "./Contract";
import ProfileForm from "./ProfileForm";
import Button from "@/components/Button";



const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const methods = useForm<User>();
  const [userName, setUserName] = useState<string>(""); 

  useEffect(() => {
    if (id) { 
      getUserById(String(id))
        .then((response) => {
          console.log("Fetched user data:", response.data);
          methods.reset(response.data);
          setUserName(response.data.name);
        })
        .catch((error) => {
          console.error(
            "Error fetching user data:",
            error.response?.data || error.message
          );
          alert("Gagal mengambil data pengguna.");
        });
    } else {
      console.error("Invalid user ID:", id); 
      alert("ID pengguna tidak valid."); 
    } 
  }, [id, methods]);

  const handleSave = methods.handleSubmit(async (data) => { 
    try {
      const response = await updateUser(String(id), data); 
      if (response.status === 200) {     
        router.push("/?update=true");
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error occurred while updating user");
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Edit User <span className="mx-2">{userName}</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row mt-6 gap-4">
          <div className="w-full lg:w-3/4  ">
            <ProfileForm />
            <Contract />
          </div>

          <div
            className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6 border border-gray-300 flex flex-col justify-between"
            style={{ height: "33%" }}
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">Aksi</h2>
              <hr className="border-b mb-4" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Button
                    href="/"
                    className="bg-purple-600 text-white rounded hover:bg-purple-700 w-full"
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleSave}
                    className="bg-purple-600 text-white rounded hover:bg-purple-700 w-full"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default UserEdit;
