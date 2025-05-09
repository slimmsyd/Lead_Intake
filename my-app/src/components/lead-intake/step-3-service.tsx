import { useFormContext } from "react-hook-form";

const SERVICE_OPTIONS = [
  { value: "full-ceramic", label: "Full Ceramic Tint (All Windows)" },
  { value: "front-two", label: "Front Two Windows Only" },
  { value: "windshield", label: "Windshield Tint" },
  { value: "sunstrip", label: "Sunstrip (Top of Windshield)" },
  { value: "removal", label: "Tint Removal" },
  { value: "other", label: "Other (please specify)" },
];

const TINT_OPTIONS = [
  { value: "factory", label: "Yes, factory tint" },
  { value: "aftermarket", label: "Yes, aftermarket tint" },
  { value: "none", label: "No" },
];

export function Step3Service() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">Service Selection</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">What service are you looking for?</label>
          <div className="flex flex-col gap-2">
            {SERVICE_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={opt.value}
                  {...register("services")}
                  className="checkbox"
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services.message as string}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Do you currently have tint on your windows?</label>
          <div className="flex gap-4">
            {TINT_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt.value}
                  {...register("hasTint")}
                  className="radio"
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.hasTint && <p className="text-red-500 text-xs mt-1">{errors.hasTint.message as string}</p>}
        </div>
      </div>
    </div>
  );
} 