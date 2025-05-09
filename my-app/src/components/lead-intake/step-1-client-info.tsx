import { useFormContext } from "react-hook-form";

export function Step1ClientInfo() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            {...register("fullName")}
            className="input input-bordered w-full"
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message as string}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            {...register("phone")}
            className="input input-bordered w-full"
            placeholder="(555) 555-5555"
            autoComplete="tel"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            {...register("email")}
            className="input input-bordered w-full"
            placeholder="you@email.com"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
        </div>
      </div>
    </div>
  );
} 