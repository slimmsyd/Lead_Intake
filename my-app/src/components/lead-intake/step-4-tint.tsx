import { useFormContext } from "react-hook-form";

const TINT_SHADE_OPTIONS = [
  { value: "5", label: "5% (Darkest)" },
  { value: "20", label: "20%" },
  { value: "35", label: "35%" },
  { value: "50", label: "50%" },
  { value: "not-sure", label: "Not sure yet – I need guidance" },
];

export function Step4Tint() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">Preferred Tint Shade</h2>
      <div className="flex flex-col gap-2">
        {TINT_SHADE_OPTIONS.map(opt => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              value={opt.value}
              {...register("tintShade")}
              className="radio"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {errors.tintShade && <p className="text-red-500 text-xs mt-1">{errors.tintShade.message as string}</p>}
    </div>
  );
} 