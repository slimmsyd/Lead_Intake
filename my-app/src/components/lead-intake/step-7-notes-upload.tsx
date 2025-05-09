import { useFormContext } from "react-hook-form";

export function Step7NotesUpload() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">Final Details</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Any specific concerns, requests, or questions?</label>
          <textarea
            {...register("notes")}
            className="textarea textarea-bordered w-full"
            placeholder="Let us know anything important before your appointment."
            rows={4}
          />
          {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes.message as string}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload a photo of your car (optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo")}
            className="file-input file-input-bordered w-full"
          />
          {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message as string}</p>}
        </div>
      </div>
    </div>
  );
} 