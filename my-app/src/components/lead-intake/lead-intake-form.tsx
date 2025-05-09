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

export function LeadIntakeForm() {
  const [step, setStep] = useState(0);
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: typeof window !== "undefined" && localStorage.getItem("lead-intake")
      ? JSON.parse(localStorage.getItem("lead-intake")!)
      : {},
  });

  function handleNext() {
    // REMOVE validation for debugging
    localStorage.setItem("lead-intake", JSON.stringify(methods.getValues()));
    setStep(s => Math.min(s + 1, steps.length - 1));
  }

  function handleBack() {
    setStep(s => Math.max(s - 1, 0));
  }

  const StepComponent = steps[step];

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-xl bg-white dark:bg-zinc-950 rounded-lg shadow-lg sm:shadow-lg shadow-none px-2 py-6 sm:p-10 flex flex-col gap-6 mx-auto sm:my-12 my-4">
        <div className="flex justify-center mb-2">
          <Image src="/Lab.jpeg" alt="Tint Lab Logo" width={220} height={60} className="object-contain h-16 w-auto" priority />
        </div>
        <ProgressBar step={step} total={steps.length} />
        <StepComponent />
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-3 mt-8">
          <button
            type="button"
            className="btn btn-outline flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg py-3 text-base transition-colors hover:bg-gray-100 dark:hover:bg-zinc-900 disabled:opacity-50"
            onClick={handleBack}
            disabled={step === 0}
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
            >
              Next
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block ml-1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-base transition-colors bg-primary text-white disabled:opacity-50"
              disabled
              aria-label="Submit (Coming Soon)"
            >
              Submit (Coming Soon)
            </button>
          )}
        </div>
      </div>
    </FormProvider>
  );
} 