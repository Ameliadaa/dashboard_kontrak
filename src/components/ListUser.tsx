// "use client";
// import { useState, useEffect } from "react";
// import { FiEdit, FiTrash } from "react-icons/fi";
// import { api } from "@/lib/axios";
// import Button from "./Button";
// import Link from "next/link";
// import Pagination from "./Pagination";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   username: string;
//   phone: string;
// }

// const UserManagement = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get<User[]>("/users");
//       console.log(response.data);
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const deleteUser = async (id: number) => {
//     const confirmDelete = window.confirm(
//       "Apakah Anda yakin ingin menghapus pengguna ini?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await api.delete(`/users/${id}`);
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//       alert("User berhasil dihapus.");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Gagal menghapus user.");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const indexOfLastUser = currentPage * rowsPerPage;
//   const indexOfFirstUser = indexOfLastUser - rowsPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Data User</h1>
//         <Button
//           href="/UserAdd"
//           className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//         >
//           Add New
//         </Button>
//       </div>

//       <div className="mt-6 bg-white rounded-lg shadow-md p-6 pt-2">
//         <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile</h2>

//         <div className="overflow-x-auto my-4">
//           <table className="min-w-full bg-white border-collapse border border-gray-300 table-auto">
//             <thead>
//               <tr className="text-left">
//                 <th className="py-2 px-4 border border-gray-300">Id User</th>
//                 <th className="py-2 px-4 border border-gray-300">Nama</th>
//                 <th className="py-2 px-4 border border-gray-300">Email</th>
//                 <th className="py-2 px-4 border border-gray-300">Username</th>
//                 <th className="py-2 px-4 border border-gray-300">Phone</th>
//                 <th className="py-2 px-4 border border-gray-300">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr
//                   key={user.id}
//                   className={index % 2 === 0 ? "bg-gray-200" : ""}
//                 >
//                   <td className="py-2 px-4 border border-gray-300 text-center">
//                     {index + 1}
//                   </td>
//                   <td className="py-2 px-4 border border-gray-300">
//                     {user.name}
//                   </td>
//                   <td className="py-2 px-4 border border-gray-300">
//                     {user.email}
//                   </td>
//                   <td className="py-2 px-4 border border-gray-300 ">
//                     {user.username}
//                   </td>
//                   <td className="py-2 px-4 border border-gray-300 ">
//                     {user.phone}
//                   </td>
//                   <td className="py-2 px-4 border border-gray-300 text-center">
//                     <div className="flex items-center justify-center space-x-2">
//                       <Link href={`/UserEdit/${user.id}`}>
//                         <FiEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
//                       </Link>
//                       <FiTrash
//                         className="text-red-500 hover:text-red-700 cursor-pointer"
//                         onClick={() => deleteUser(user.id)}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <Pagination
//   currentPage={currentPage}
//   totalRows={users.length}
//   rowsPerPage={rowsPerPage}
//   setPage={setCurrentPage}
//   setRowsPerPage={setRowsPerPage}
// />
//       </div>
      
//     </div>
//   );
// };

// export default UserManagement;


"use client";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { api } from "@/lib/axios";
import Button from "./Button";
import Link from "next/link";
import Pagination from "./Pagination";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>("/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id: number) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus pengguna ini?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      alert("User berhasil dihapus.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Calculate current users based on pagination
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Data User</h1>
        <Button
          href="/UserAdd"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add New
        </Button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6 pt-2">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile</h2>

        <div className="overflow-x-auto my-4">
          <table className="min-w-full bg-white border-collapse border border-gray-300 table-auto">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 border border-gray-300">Id User</th>
                <th className="py-2 px-4 border border-gray-300">Nama</th>
                <th className="py-2 px-4 border border-gray-300">Email</th>
                <th className="py-2 px-4 border border-gray-300">Username</th>
                <th className="py-2 px-4 border border-gray-300">Phone</th>
                <th className="py-2 px-4 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                >
                  <td className="py-2 px-4 border border-gray-300 text-center">
                    {indexOfFirstUser + index + 1} {/* Display correct row number */}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 ">
                    {user.username}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 ">
                    {user.phone}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Link href={`/UserEdit/${user.id}`}>
                        <FiEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                      </Link>
                      <FiTrash
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => deleteUser(user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalRows={users.length}
          rowsPerPage={rowsPerPage}
          setPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </div>
  );
};

export default UserManagement;
