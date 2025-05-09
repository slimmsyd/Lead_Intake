import { useFormContext } from "react-hook-form";

const REFERRAL_OPTIONS = [
  { value: "google", label: "Google" },
  { value: "instagram", label: "Instagram" },
  { value: "referral", label: "Referral" },
  { value: "returning", label: "Returning Customer" },
  { value: "other", label: "Other" },
];

export function Step6Referral() {
  const { register, watch, formState: { errors } } = useFormContext();
  const referral = watch("referral");
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">How did you hear about The Tint Lab?</h2>
      <div className="flex flex-col gap-2">
        {REFERRAL_OPTIONS.map(opt => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              value={opt.value}
              {...register("referral")}
              className="radio"
            />
            {opt.label}
          </label>
        ))}
        {referral === "other" && (
          <input
            {...register("referralOther")}
            className="input input-bordered w-full mt-2"
            placeholder="Please specify"
          />
        )}
        {errors.referral && <p className="text-red-500 text-xs mt-1">{errors.referral.message as string}</p>}
      </div>
    </div>
  );
} 