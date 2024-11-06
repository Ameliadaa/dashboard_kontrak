
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import Button from "@/components/Button";
import { FiTrash } from "react-icons/fi";
import Swal from 'sweetalert2';

interface IncomeDeductionItem {
  name: string;
  type: string;
  nominal: number;
}

interface ContractCardProps {
  contractIndex: number;
  removeContract: (index: number) => void;
}

export default function ContractCard({
  contractIndex,
  removeContract,
}: ContractCardProps) {
  const { control, watch } = useFormContext(); 

  const { fields: incomeFields, append: appendIncome, remove: removeIncome } = useFieldArray({
    control,
    name: `contracts.${contractIndex}.incomes`,
  });

  const { fields: deductionFields, append: appendDeduction, remove: removeDeduction } = useFieldArray({
    control,
    name: `contracts.${contractIndex}.deductions`,
  });

  const incomes = watch(`contracts.${contractIndex}.incomes`) as IncomeDeductionItem[] || [];
  const deductions = watch(`contracts.${contractIndex}.deductions`) as IncomeDeductionItem[] || [];

  const totalIncome = incomes.reduce((total: number, item: IncomeDeductionItem) => total + Number(item.nominal || 0), 0);
  const totalDeduction = deductions.reduce((total: number, item: IncomeDeductionItem) => total + Number(item.nominal || 0), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 p-4 border border-gray-300 rounded-md">

      
      <div>
        <label className="block mb-1">
          Masa Berlaku<span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-2">
          <div className="w-full">
            <Controller
              name={`contracts.${contractIndex}.startDate`}
              control={control}
              rules={{ required: "Tanggal mulai wajib diisi" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    {...field}
                    type="date"
                    className={`w-full border p-2 rounded ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <span className="self-center">s.d</span>
          <div className="w-full">
            <Controller
              name={`contracts.${contractIndex}.endDate`}
              control={control}
              rules={{ required: "Tanggal akhir wajib diisi" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    {...field}
                    type="date"
                    className={`w-full border p-2 rounded ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-1">Cuti Per Tahun</label>
        <Controller
          name={`contracts.${contractIndex}.vacationAmount`}
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border p-2 rounded">
              <option value="">Pilih Cuti Tahunan</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Hari</option>
              ))}
            </select>
          )}
        />
      </div>

      <div>
        <label className="block mb-1">
          Golongan Pajak<span className="text-red-500">*</span>
        </label>
        <Controller
          name={`contracts.${contractIndex}.taxType`}
          control={control}
          rules={{ required: "Golongan Pajak wajib diisi" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <select
                {...field}
                className={`w-full border p-2 rounded ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Pilih Golongan Pajak</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label className="block mb-1">Jenis Kontrak</label>
        <Controller
          name={`contracts.${contractIndex}.contractType`}
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border p-2 rounded">
              <option value="">Pilih Jenis Kontrak</option>
              <option value="tetap">Tetap</option>
              <option value="freelance">Freelance</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
            </select>
          )}
        />
      </div>

      <div>
        <label className="block mb-1">Golongan BPJS</label>
        <div className="flex space-x-4">
          <Controller
            name={`contracts.${contractIndex}.employmentBpjs`}
            control={control}
            render={({ field }) => (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mr-2"
                />
                Ketenagakerjaan
              </label>
            )}
          />
          <Controller
            name={`contracts.${contractIndex}.healthBpjs`}
            control={control}
            render={({ field }) => (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mr-2"
                />
                Kesehatan
              </label>
            )}
          />
          <Controller
            name={`contracts.${contractIndex}.askes`}
            control={control}
            render={({ field }) => (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mr-2"
                />
                Askes
              </label>
            )}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Minimum Jam Per Bulan</label>
        <Controller
          name={`contracts.${contractIndex}.minWorkingHour`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Jam per bulan"
            />
          )}
        />
      </div>

      <div>
        <label className="block mb-1">Posisi</label>
        <Controller
          name={`contracts.${contractIndex}.position`}
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border p-2 rounded">
              <option value="">Pilih Posisi</option>
              <option value="FE">Front-End Developer</option>
              <option value="BE">Back-End Developer</option>
              <option value="PM">Project Manager</option>
              <option value="SAdmin">System Admin</option>
              <option value="SA">System Analyst</option>
              <option value="Content Writer">Content Writer</option>
              <option value="HRD">HR Manager</option>
            </select>
          )}
        />
      </div>

      <div>
        <label className="block mb-1">Catatan</label>
        <Controller
          name={`contracts.${contractIndex}.note`}
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full border p-2 rounded"
              rows={3}
              placeholder="Catatan"
            />
          )}
        />
      </div>

      {/* Income Table */}
      <div className="col-span-2 border rounded-lg p-4 shadow-md mt-4 bg-gray-50">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Pendapatan</h3>
          <Button
            onClick={() => appendIncome({ name: "", type: "", nominal: 0 })}
            className="bg-purple-600 text-white py-1 rounded hover:bg-purple-700 w-1/5 flex items-center justify-end"
          >
            <IoMdAdd className="mx-2" />
            <span>Tambah</span>
          </Button>
        </div>

        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs border-r border-gray-300 font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs border-r border-gray-300 font-medium text-gray-500 uppercase">Tipe</th>
              <th className="px-6 py-3 text-left text-xs border-r border-gray-300 font-medium text-gray-500 uppercase">Nominal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incomeFields.map((income, incomeIndex) => (
              <tr key={income.id}>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <Controller
                    name={`contracts.${contractIndex}.incomes.${incomeIndex}.name`}
                    control={control}
                    render={({ field }) => (
                      <select {...field} className="border p-2 rounded w-full">
                        <option value="">Pilih Nama</option>
                        <option value="GajiPokok">Gaji Pokok</option>
                        <option value="Tunjangan1">Tunjangan Performa</option>
                        <option value="Tunjangan2">Bonus</option>
                      </select>
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <Controller
                    name={`contracts.${contractIndex}.incomes.${incomeIndex}.type`}
                    control={control}
                    render={({ field }) => (
                      <select {...field} className="border p-2 rounded w-full">
                        <option value="">Pilih Tipe</option>
                        <option value="A">Tipe A</option>
                        <option value="B">Tipe B</option>
                        <option value="SO">Sales Overreach</option>
                      </select>
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <Controller
                    name={`contracts.${contractIndex}.incomes.${incomeIndex}.nominal`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="border p-2 rounded w-full"
                        placeholder="Nominal"
                      />
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FiTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => removeIncome(incomeIndex)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 font-semibold border-r border-gray-300" colSpan={2}>Total Pendapatan</td>
              <td className="px-6 py-4 font-semibold">Rp {totalIncome}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deduction Table */}
      <div className="col-span-2 border rounded-lg p-4 shadow-md mt-4 bg-gray-50">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Potongan</h3>
          <Button
            onClick={() => appendDeduction({ name: "", type: "", nominal: 0 })}
            className="bg-purple-600 text-white py-1 rounded hover:bg-purple-700 w-1/5 flex items-center justify-end"
          >
            <IoMdAdd className="mx-2" />
            <span>Tambah</span>
          </Button>
        </div>

        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs border-r border-gray-300 font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs border-r border-gray-300 font-medium text-gray-500 uppercase">Tipe</th>
              <th className="px-6 py-3 text-left text-xs border-r border-gray-300 font-medium text-gray-500 uppercase">Nominal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deductionFields.map((deduction, deductionIndex) => (
              <tr key={deduction.id}>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <Controller
                    name={`contracts.${contractIndex}.deductions.${deductionIndex}.name`}
                    control={control}
                    render={({ field }) => (                     
                      <select {...field} className="border p-2 rounded w-full">
                        <option value="">Pilih Nama</option>
                        <option value="BPJS">BPJS</option>
                        <option value="BPJSTK">BPJSTK</option>                        
                      </select>
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <Controller
                    name={`contracts.${contractIndex}.deductions.${deductionIndex}.type`}
                    control={control}
                    render={({ field }) => (
                      <select
                      {...field}
                      className="border p-2 rounded w-full"> 
                        <option value="">Pilih Tipe</option>
                        <option value="Pegawai">Pegawai</option>
                        <option value="Pajak">Pajak</option>
                    </select>
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <Controller
                    name={`contracts.${contractIndex}.deductions.${deductionIndex}.nominal`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="border p-2 rounded w-full"
                        placeholder="Nominal"
                      />
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FiTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => removeDeduction(deductionIndex)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 font-semibold border-r border-gray-300" colSpan={2}>Total Potongan</td>
              <td className="px-6 py-4 font-semibold">Rp {totalDeduction}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="col-span-2 flex justify-end mt-4">
        <Button
          onClick={async () => {
            const result = await Swal.fire({
              title: "Apakah kamu yakin?",
              text: "Kontrak ini akan dihapus dan tidak dapat dikembalikan!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ya, Hapus!",
            });

            if (result.isConfirmed) {
              removeContract(contractIndex);
              Swal.fire({
                title: "Terhapus!",
                text: "Kontrak telah berhasil terhapus",
                icon: "success",
              });
            }
          }}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
        >
          Hapus Kontrak
        </Button>
      </div>
    </div>
  );
}


