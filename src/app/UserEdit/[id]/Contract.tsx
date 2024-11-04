
import { useFieldArray, useFormContext } from "react-hook-form";
import ContractCard from "../../../components/ContractCard";
import Button from "@/components/Button";
import { IoMdAdd } from "react-icons/io";


export default function Contract() {
  const { control } = useFormContext();
  const { fields: contractFields, append: addContract, remove: removeContract } = useFieldArray({
    control,
    name: "contracts",
  });

  return (
    <div className="flex flex-col mt-6 space-y-6">
      <div className="border rounded-lg p-6 shadow-md bg-white">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Kontrak</h2>
          <Button
            onClick={() =>
              addContract({
                startDate: "",
                endDate: "",
                vacationAmount: "",
                taxType: "",
                contractType: "",
                employmentBpjs: false,
                healthBpjs: false,
                askes: false,
                minWorkingHour: "",
                position: "",
                note: "",
                incomes: [{ name: "", type: "", nominal: "" }],
                deductions: [{ name: "", type: "", nominal: "" }],
              })
            }
            className="bg-purple-600 text-white py-1 rounded hover:bg-purple-700 w-1/4 flex items-center justify-end"
          >
            <IoMdAdd className="mx-2" />
            <span>Tambah Kontrak</span>
          </Button>
        </div>

        {contractFields.map((contract, contractIndex) => (
          <ContractCard
            key={contract.id}
            contractIndex={contractIndex}
            removeContract={() => removeContract(contractIndex)}
          />
        ))}
      </div>
    </div>
  );
}
