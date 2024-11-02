import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import Button from "@/components/Button";
import { useEffect, useState } from "react";

interface ContractCardProps {
  contractIndex: number;
  removeContract: (index: number) => void;
}

export default function ContractCard({
  contractIndex,
  removeContract,
}: ContractCardProps) {
  const { control, watch } = useFormContext();
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const {
    fields: incomeFields,
    append: addIncome,
    remove: removeIncome,
  } = useFieldArray({
    control,
    name: `contracts.${contractIndex}.incomes`,
  });

  const {
    fields: deductionFields,
    append: addDeduction,
    remove: removeDeduction,
  } = useFieldArray({
    control,
    name: `contracts.${contractIndex}.deductions`,
  });


  const incomes = watch(`contracts.${contractIndex}.incomes`);
  const deductions = watch(`contracts.${contractIndex}.deductions`);

  const calculateTotal = (items: { nominal: number | "" }[]) => {
    return items?.reduce((acc, item) => acc + (Number(item.nominal) || 0), 0);
  };

  useEffect(() => {
    setTotalIncome(calculateTotal(incomes));
  }, [incomes]);

  useEffect(() => {
    setTotalDeduction(calculateTotal(deductions));
  }, [deductions]);

  return (
  
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 border border-gray-300 rounded-md">  
      <div>
        <label className="block mb-1">Masa Berlaku<span className="text-red-500">*</span></label>
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
              className={`w-full border p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
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
              className={`w-full border p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
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
              <option value="12">12 Hari</option> 
              <option value="14">14 Hari</option> 
            </select>
          )}
        />
      </div>

      <div>
        <label className="block mb-1">Golongan Pajak<span className="text-red-500">*</span></label>
        <Controller
    name={`contracts.${contractIndex}.taxType`}
    control={control}
    rules={{ required: "Golongan Pajak wajib diisi" }}
    render={({ field, fieldState: { error } }) => (
      <>
        <select {...field} className={`w-full border p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}>
          <option value="">Pilih Golongan Pajak</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
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

      <div className="col-span-2 border rounded-lg p-4 shadow-md mt-4 bg-gray-50">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Pendapatan</h3>
          <Button
            onClick={() => addIncome({ name: "", type: "", nominal: "" })}
            className="bg-purple-600 text-white py-1 rounded hover:bg-purple-700 w-1/5 flex items-center justify-end"
          >
            <IoMdAdd className="mx-2" />
            <span>Tambah</span>
          </Button>
        </div>

        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nominal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incomeFields.map((income, incomeIndex) => (
              <tr key={income.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Controller
                    name={`contracts.${contractIndex}.incomes.${incomeIndex}.name`}
                    control={control}
                    render={({ field }) => (
                      <input {...field} className="border p-2 rounded w-full" placeholder="Nama" />
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Controller
                    name={`contracts.${contractIndex}.incomes.${incomeIndex}.type`}
                    control={control}
                    render={({ field }) => (
                      <input {...field} className="border p-2 rounded w-full" placeholder="Tipe" />
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Controller
                    name={`contracts.${contractIndex}.incomes.${incomeIndex}.nominal`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="border p-2 rounded w-full"
                        placeholder="Nominal"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => removeIncome(incomeIndex)}
                    className="text-red-500"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 font-semibold" colSpan={3}>
                Total Pendapatan
              </td>
              <td className="px-6 py-4 font-semibold">
                Rp {totalIncome}
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <div className="col-span-2 border rounded-lg p-4 shadow-md mt-4 bg-gray-50">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Potongan</h3>
          <Button
            onClick={() => addDeduction({ name: "", type: "", nominal: "" })}
            className="bg-purple-600 text-white py-1 rounded hover:bg-purple-700 w-1/5 flex items-center justify-end"
          >
            <IoMdAdd className="mx-2" />
            <span>Tambah</span>
          </Button>
        </div>

        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nominal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deductionFields.map((deduction, deductionIndex) => (
              <tr key={deduction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Controller
                    name={`contracts.${contractIndex}.deductions.${deductionIndex}.name`}
                    control={control}
                    render={({ field }) => (
                      <input {...field} className="border p-2 rounded w-full" placeholder="Nama" />
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Controller
                    name={`contracts.${contractIndex}.deductions.${deductionIndex}.type`}
                    control={control}
                    render={({ field }) => (
                      <input {...field} className="border p-2 rounded w-full" placeholder="Tipe" />
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Controller
                    name={`contracts.${contractIndex}.deductions.${deductionIndex}.nominal`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="border p-2 rounded w-full"
                        placeholder="Nominal"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => removeDeduction(deductionIndex)}
                    className="text-red-500"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 font-semibold" colSpan={3}>
                Total Potongan
              </td>
              <td className="px-6 py-4 font-semibold">
                Rp {totalDeduction}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="col-span-2 flex justify-end mt-4">
        <Button
          onClick={() => {
            if (window.confirm("Apakah Anda yakin ingin menghapus kontrak ini?")) {
              removeContract(contractIndex);
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
