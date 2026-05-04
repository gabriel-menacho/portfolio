import { z } from "zod";

export const employmentTypeEnum = z.enum([
  "full_time",
  "contract",
  "freelance",
  "other",
]);

export type EmploymentType = z.infer<typeof employmentTypeEnum>;

function optionalText(max: number) {
  return z.preprocess(
    (v) => {
      if (v === null || v === undefined) return undefined;
      const s = String(v).trim();
      return s === "" ? undefined : s;
    },
    z.string().max(max).optional(),
  );
}

export const hireRequestInputSchema = z.object({
  recruiterEmail: z
    .string()
    .trim()
    .min(1)
    .max(320)
    .email(),
  recruiterName: optionalText(200),
  company: optionalText(200),
  jobTitle: z.string().trim().min(1).max(300),
  employmentType: employmentTypeEnum,
  jobLocation: optionalText(300),
  isRemote: z.boolean(),
  salaryRange: optionalText(200),
  jobDescription: z.string().trim().min(1).max(4000),
  message: optionalText(4000),
  locale: z.string().trim().min(2).max(8),
});

export type HireRequestFormValues = z.infer<typeof hireRequestInputSchema>;
