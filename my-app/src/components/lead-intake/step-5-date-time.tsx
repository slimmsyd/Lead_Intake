import { useFormContext } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const TIME_OPTIONS = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
];

function isWeekday(date: Date) {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function Step5DateTime() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const selectedDate = watch("date") ? new Date(watch("date")) : undefined;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">Appointment Date & Time</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium mb-1">What day would you like to book?</label>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={date => setValue("date", date?.toISOString().slice(0, 10))}
            disabled={date => !isWeekday(date)}
            fromDate={new Date()}
            className="bg-white rounded shadow"
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message as string}</p>}
        </div>
        <div className="flex-1 w-full flex flex-col items-center sm:items-start">
          <label className="block text-sm font-medium mb-1 text-center sm:text-left w-full">What time works best for you?</label>
          <select {...register("time")} className="select select-bordered w-full max-w-xs mx-auto">
            <option value="">Select a time</option>
            {TIME_OPTIONS.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time && <p className="text-red-500 text-xs mt-1 text-center sm:text-left w-full">{errors.time.message as string}</p>}
        </div>
      </div>
    </div>
  );
} 