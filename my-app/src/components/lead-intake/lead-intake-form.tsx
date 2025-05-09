"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Step1ClientInfo } from "./step-1-client-info";
import { Step2VehicleInfo } from "./step-2-vehicle-info";
import { Step3Service } from "./step-3-service";
import { Step4Tint } from "./step-4-tint";
import { Step5DateTime } from "./step-5-date-time";
import { Step6Referral } from "./step-6-referral";
import { Step7NotesUpload } from "./step-7-notes-upload";
import { ProgressBar } from "./progress-bar";
import Image from "next/image";

const formSchema = z.object({
  fullName: z.string().min(2, "Name required"),
  phone: z.string().min(7, "Phone required"),
  email: z.string().email("Valid email required"),
  vehicleYear: z.string().min(2),
  vehicleMake: z.string().min(2),
  vehicleModel: z.string().min(2),
  services: z.array(z.string()).min(1),
  hasTint: z.string(),
  tintShade: z.string(),
  date: z.string(),
  time: z.string(),
  referral: z.string(),
  referralOther: z.string().optional(),
  notes: z.string().optional(),
  photo: z.any().optional(),
});

const steps = [
  Step1ClientInfo,
  Step2VehicleInfo,
  Step3Service,
  Step4Tint,
  Step5DateTime,
  Step6Referral,
  Step7NotesUpload,
];

const stepFields = [
  ["fullName", "phone", "email"],
  ["vehicleYear", "vehicleMake", "vehicleModel"],
  ["services", "hasTint"],
  ["tintShade"],
  ["date", "time"],
  ["referral", "referralOther"],
  ["notes", "photo"],
];

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function LeadIntakeForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: typeof window !== "undefined" && localStorage.getItem("lead-intake")
      ? JSON.parse(localStorage.getItem("lead-intake")!)
      : {},
  });

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const values = methods.getValues();
      // Prepare data for submission (handle file if present)
      const data = { ...values, id: generateUUID() };
      if (data.photo && data.photo.length && data.photo[0]) {
        // Convert file to base64 string for transport
        const file = data.photo[0];
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
        data.photo = await toBase64(file);
      } else {
        delete data.photo;
      }
      const res = await fetch("https://hook.us1.make.com/mvj9ggyjccab26i8e49wmb4k1n2xyrc3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setIsSubmitted(true);
      localStorage.removeItem("lead-intake");
    } catch (err: any) {
      setSubmitError(err.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNext() {
    const fields = stepFields[step];
    methods.trigger(fields).then(valid => {
      console.log('Next button clicked. Valid:', valid, 'Values:', methods.getValues());
      if (valid) {
        localStorage.setItem("lead-intake", JSON.stringify(methods.getValues()));
        setStep(s => Math.min(s + 1, steps.length - 1));
      }
    });
  }

  function handleBack() {
    setStep(s => Math.max(s - 1, 0));
  }

  const StepComponent = steps[step];

  if (isSubmitted) {
    return (
      <div className="w-full max-w-xl bg-white dark:bg-zinc-950 rounded-lg shadow-lg sm:shadow-lg shadow-none px-2 py-6 sm:p-10 flex flex-col gap-6 mx-auto sm:my-12 my-4 text-center">
        <div className="flex justify-center mb-2">
          <Image src="/Lab.jpeg" alt="Tint Lab Logo" width={220} height={60} className="object-contain h-16 w-auto" priority />
        </div>
        <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
        <p className="text-lg">Your booking request has been submitted. We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-xl bg-white dark:bg-zinc-950 rounded-lg shadow-lg sm:shadow-lg shadow-none px-2 py-6 sm:p-10 flex flex-col gap-6 mx-auto sm:my-12 my-4">
        <div className="flex justify-center mb-2">
          <Image src="/Lab.jpeg" alt="Tint Lab Logo" width={220} height={60} className="object-contain h-16 w-auto" priority />
        </div>
        <ProgressBar step={step} total={steps.length} />
        <StepComponent />
        {submitError && <div className="text-red-600 text-center mt-2">{submitError}</div>}
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-3 mt-8">
          <button
            type="button"
            className="btn btn-outline flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg py-3 text-base transition-colors hover:bg-gray-100 dark:hover:bg-zinc-900 disabled:opacity-50"
            onClick={handleBack}
            disabled={step === 0 || isSubmitting}
            aria-label="Go to previous step"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Back
          </button>
          <div className="flex items-center justify-center w-full sm:w-auto">
            <span className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-700 mx-4" />
          </div>
          {step < steps.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-base transition-colors bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
              onClick={handleNext}
              aria-label="Go to next step"
              disabled={isSubmitting}
            >
              Next
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block ml-1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-base transition-colors bg-primary text-white disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isSubmitting}
              aria-label="Submit booking"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Submitting...</span>
              ) : (
                <>Submit</>
              )}
            </button>
          )}
        </div>
      </div>
    </FormProvider>
  );
} 