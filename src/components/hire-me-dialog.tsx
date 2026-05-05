"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useId, useState, type ReactNode } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { createHireRequest } from "@/app/actions/hire-request";
import {
  hireRequestInputSchema,
  type HireRequestFormValues,
} from "@/lib/hire-request-schema";
import { cn } from "@/lib/utils";

const employmentValues: HireRequestFormValues["employmentType"][] = [
  "full_time",
  "contract",
  "freelance",
  "other",
];

function RequiredStar() {
  return (
    <span
      aria-hidden="true"
      className="text-primary-container ms-0.5 text-sm font-bold leading-none"
    >
      *
    </span>
  );
}

function OptionalHint({ children }: { children: ReactNode }) {
  return (
    <span className="text-on-surface-variant ms-1 font-normal normal-case tracking-normal not-italic">
      {children}
    </span>
  );
}

export function HireMeDialog({
  onRequestClose,
}: {
  onRequestClose: () => void;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const formId = useId();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<HireRequestFormValues>({
    resolver: zodResolver(
      hireRequestInputSchema,
    ) as Resolver<HireRequestFormValues>,
    defaultValues: {
      recruiterEmail: "",
      recruiterName: "",
      company: "",
      jobTitle: "",
      employmentType: "full_time",
      jobLocation: "",
      isRemote: false,
      salaryRange: "",
      jobDescription: "",
      message: "",
      locale,
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    setValue("locale", locale);
  }, [locale, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null);
    const payload = { ...data, locale };
    const result = await createHireRequest(payload);
    if (result.ok) {
      setSuccess(true);
      reset({
        recruiterEmail: "",
        recruiterName: "",
        company: "",
        jobTitle: "",
        employmentType: "full_time",
        jobLocation: "",
        isRemote: false,
        salaryRange: "",
        jobDescription: "",
        message: "",
        locale,
      });
      return;
    }
    if (result.fieldErrors) {
      for (const [key, message] of Object.entries(result.fieldErrors)) {
        if (message) {
          setError(key as keyof HireRequestFormValues, { message });
        }
      }
    }
    if (result.error) setServerError(result.error);
  });

  const fieldClass =
    "bg-surface-container-low border-on-surface-variant/30 text-on-surface placeholder:text-on-surface-variant/55 focus:border-primary-container w-full rounded-sm border px-3 py-2 text-sm outline-none transition-colors focus:ring-0";

  const labelClass =
    "font-headline text-on-surface mb-2 block text-xs font-semibold tracking-wide uppercase";

  return (
    <div className="bg-surface text-on-surface flex h-full min-h-0 flex-col">
      <div className="border-outline-variant/15 flex shrink-0 items-start justify-between gap-4 border-b px-6 py-4 md:px-8">
        <div>
          <h2
            className="font-headline text-xl font-bold tracking-tight md:text-2xl"
            id="hire-dialog-title"
          >
            {t("hire.dialogTitle")}
          </h2>
          <p className="text-on-surface-variant mt-1 text-sm">
            {t("hire.dialogSubtitle")}
          </p>
        </div>
        <button
          aria-label={t("hire.close")}
          className="text-on-surface-variant hover:text-primary-container cursor-pointer rounded-sm p-1 transition-colors"
          onClick={onRequestClose}
          type="button"
        >
          <X className="pointer-events-none size-5" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-6 motion-reduce:scroll-auto">
        {success ? (
          <div className="space-y-6">
            <p className="text-on-surface text-base leading-relaxed">
              {t("hire.success")}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="bg-primary-container font-headline text-on-primary-container cursor-pointer rounded-sm px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                onClick={() => setSuccess(false)}
                type="button"
              >
                {t("hire.sendAnother")}
              </button>
              <button
                className="border-outline-variant/25 font-headline text-on-surface-variant hover:border-primary-container hover:text-primary-container cursor-pointer rounded-sm border px-5 py-2.5 text-sm transition-colors"
                onClick={onRequestClose}
                type="button"
              >
                {t("hire.close")}
              </button>
            </div>
          </div>
        ) : (
          <>
          <form className="space-y-5" id={formId} noValidate onSubmit={onSubmit}>
            {serverError ? (
              <p
                className="text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {serverError}
              </p>
            ) : null}

            <p className="text-on-surface-variant mb-4 text-xs leading-relaxed">
              {t("hire.requiredLegend")}
            </p>

            <div>
              <label className={labelClass} htmlFor="hire-recruiter-email">
                {t("hire.fields.recruiterEmail")}
                <RequiredStar />
              </label>
              <input
                aria-required="true"
                autoComplete="email"
                className={cn(
                  fieldClass,
                  errors.recruiterEmail && "border-red-500 dark:border-red-400",
                )}
                id="hire-recruiter-email"
                inputMode="email"
                type="email"
                {...register("recruiterEmail")}
              />
              {errors.recruiterEmail ? (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.recruiterEmail.message}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="hire-recruiter-name">
                  {t("hire.fields.recruiterName")}
                  <OptionalHint>{t("hire.optional")}</OptionalHint>
                </label>
                <input
                  aria-required="false"
                  className={cn(fieldClass, errors.recruiterName && "border-red-500 dark:border-red-400")}
                  id="hire-recruiter-name"
                  type="text"
                  {...register("recruiterName")}
                />
                {errors.recruiterName ? (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.recruiterName.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="hire-company">
                  {t("hire.fields.company")}
                  <OptionalHint>{t("hire.optional")}</OptionalHint>
                </label>
                <input
                  aria-required="false"
                  className={cn(fieldClass, errors.company && "border-red-500 dark:border-red-400")}
                  id="hire-company"
                  type="text"
                  {...register("company")}
                />
                {errors.company ? (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.company.message}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="hire-job-title">
                {t("hire.fields.jobTitle")}
                <RequiredStar />
              </label>
              <input
                aria-required="true"
                className={cn(fieldClass, errors.jobTitle && "border-red-500 dark:border-red-400")}
                id="hire-job-title"
                type="text"
                {...register("jobTitle")}
              />
              {errors.jobTitle ? (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.jobTitle.message}</p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="hire-employment-type">
                  {t("hire.fields.employmentType")}
                  <RequiredStar />
                </label>
                <select
                  aria-required="true"
                  className={cn(
                    fieldClass,
                    errors.employmentType && "border-red-500 dark:border-red-400",
                    "cursor-pointer bg-surface-container-low text-on-surface",
                  )}
                  id="hire-employment-type"
                  {...register("employmentType")}
                >
                  {employmentValues.map((value) => (
                    <option key={value} value={value}>
                      {t(`hire.fields.employmentTypes.${value}`)}
                    </option>
                  ))}
                </select>
                {errors.employmentType ? (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.employmentType.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="hire-location">
                  {t("hire.fields.location")}
                  <OptionalHint>{t("hire.optional")}</OptionalHint>
                </label>
                <input
                  aria-required="false"
                  className={cn(fieldClass, errors.jobLocation && "border-red-500 dark:border-red-400")}
                  id="hire-location"
                  type="text"
                  {...register("jobLocation")}
                />
                {errors.jobLocation ? (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.jobLocation.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="text-on-surface flex cursor-pointer items-center gap-2 text-sm font-medium">
                <input
                  aria-required="false"
                  className="border-on-surface-variant/50 text-primary-container focus:ring-primary-container size-4 rounded-sm border"
                  type="checkbox"
                  {...register("isRemote")}
                />
                {t("hire.fields.remote")}
                <OptionalHint>{t("hire.optional")}</OptionalHint>
              </label>
            </div>

            <div>
              <label className={labelClass} htmlFor="hire-salary">
                {t("hire.fields.salaryRange")}
                <OptionalHint>{t("hire.optional")}</OptionalHint>
              </label>
              <input
                aria-required="false"
                className={cn(fieldClass, errors.salaryRange && "border-red-500 dark:border-red-400")}
                id="hire-salary"
                type="text"
                {...register("salaryRange")}
              />
              {errors.salaryRange ? (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.salaryRange.message}</p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="hire-description">
                {t("hire.fields.jobDescription")}
                <RequiredStar />
              </label>
              <textarea
                aria-required="true"
                className={cn(
                  fieldClass,
                  errors.jobDescription && "border-red-500 dark:border-red-400",
                  "min-h-[140px] resize-y",
                )}
                id="hire-description"
                rows={6}
                {...register("jobDescription")}
              />
              {errors.jobDescription ? (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.jobDescription.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="hire-message">
                {t("hire.fields.message")}
                <OptionalHint>{t("hire.optional")}</OptionalHint>
              </label>
              <textarea
                aria-required="false"
                className={cn(
                  fieldClass,
                  errors.message && "border-red-500 dark:border-red-400",
                  "min-h-[100px] resize-y",
                )}
                id="hire-message"
                rows={4}
                {...register("message")}
              />
              {errors.message ? (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>
              ) : null}
            </div>

            <input type="hidden" {...register("locale")} />
          </form>
          <div className="border-outline-variant/10 flex flex-wrap gap-3 border-t px-6 pt-4 pb-5 md:px-8 md:pb-6">
            <button
              className="bg-primary-container font-headline text-on-primary-container cursor-pointer rounded-sm px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
              disabled={isSubmitting}
              form={formId}
              type="submit"
            >
              {isSubmitting ? t("hire.submitting") : t("hire.submit")}
            </button>
            <button
              className="border-outline-variant/25 font-headline text-on-surface-variant hover:border-primary-container hover:text-primary-container cursor-pointer rounded-sm border px-5 py-2.5 text-sm transition-colors"
              onClick={onRequestClose}
              type="button"
            >
              {t("hire.close")}
            </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
