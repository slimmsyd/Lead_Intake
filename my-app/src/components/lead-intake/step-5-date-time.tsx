import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const selectedDate = watch("date") ? new Date(watch("date")) : null;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">Appointment Date & Time</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
        <div className="flex-1 w-full p-0 sm:p-0">
          <label className="block text-sm font-medium mb-1">What day would you like to book?</label>
          <div className="w-full sm:max-w-xs sm:mx-auto">
            <DatePicker
              selected={selectedDate}
              onChange={date => {
                if (date) setValue("date", date.toLocaleDateString('en-CA'));
              }}
              filterDate={isWeekday}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="input input-bordered w-full text-base"
              placeholderText="Select a date"
              withPortal
              showPopperArrow={false}
              popperPlacement="bottom"
              calendarClassName="w-full sm:max-w-xs sm:mx-auto"
            />
          </div>
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message as string}</p>}
        </div>
        <div className="flex-1 w-full flex flex-col items-start">
          <label className="block text-sm font-medium mb-1 w-full text-left">What time works best for you?</label>
          <select {...register("time")} className="select select-bordered w-full max-w-xs">
            <option value="">Select a time</option>
            {TIME_OPTIONS.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time && <p className="text-red-500 text-xs mt-1 w-full text-left">{errors.time.message as string}</p>}
        </div>
      </div>
    </div>
  );
} 