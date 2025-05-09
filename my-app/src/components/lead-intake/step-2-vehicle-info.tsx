import { useFormContext } from "react-hook-form";

export function Step2VehicleInfo() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">Vehicle Information</h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            {...register("vehicleYear")}
            className="input input-bordered w-full"
            placeholder="2022"
            autoComplete="off"
          />
          {errors.vehicleYear && <p className="text-red-500 text-xs mt-1">{errors.vehicleYear.message as string}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Make</label>
          <input
            {...register("vehicleMake")}
            className="input input-bordered w-full"
            placeholder="Toyota"
            autoComplete="off"
          />
          {errors.vehicleMake && <p className="text-red-500 text-xs mt-1">{errors.vehicleMake.message as string}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Model</label>
          <input
            {...register("vehicleModel")}
            className="input input-bordered w-full"
            placeholder="Camry"
            autoComplete="off"
          />
          {errors.vehicleModel && <p className="text-red-500 text-xs mt-1">{errors.vehicleModel.message as string}</p>}
        </div>
      </div>
    </div>
  );
} 