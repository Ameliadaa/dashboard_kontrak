import axios, { AxiosResponse } from 'axios';


interface Income {
  name: string;
  type: string;
  nominal: string;
}

interface Deduction {
  name: string;
  type: string;
  nominal: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  gender: string;
  birthPlace: string;
  birthDate: string;
  startDate: string;
  endDate: string;
  bank: string;
  bankAccount: string;
  status: string;
  address: string;
  taxType: string;
  employmentBpjs: boolean;
  healthBpjs: boolean;
  askes: boolean;
  position: string;
  vacationAmount: string;
  contractType: string;
  minWorkingHour: string;
  note: string;
  incomes: Income[];
  deductions: Deduction[];
}


const api = axios.create({
  baseURL: 'https://mockoon.tongkolspace.com',
});

// const api = axios.create({
//   baseURL: 'http://localhost:3001',
// });


async function createUser(data: User): Promise<AxiosResponse<User>> {
  return api.post<User>('/users', data);
}

async function getAllUsers(): Promise<AxiosResponse<User[]>> {
  return api.get<User[]>('/users');
}

async function getUserById(id: string): Promise<AxiosResponse<User>> {
  return api.get<User>(`/users/${id}`);
}

async function updateUser(id: string, data: User): Promise<AxiosResponse<User>> {
  return api.put<User>(`/users/${id}`, data);
}

async function deleteUser(id: string): Promise<AxiosResponse<void>> {
  return api.delete<void>(`/users/${id}`);
}


export { createUser, getAllUsers, getUserById, updateUser, deleteUser, api };

