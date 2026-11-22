"use client";

import { CalendarIcon } from "lucide-react";
import { useId, useState, type ReactNode, type RefObject } from "react";
import { Controller, type ControllerRenderProps, type FieldError, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectFieldLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TOUR_TIME_OPTIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { toLocalIsoDate, type TourRequest, type TourRequestInput } from "@/lib/validations";

type FieldName = keyof TourRequestInput;

type ScheduleTourFormProps = {
  form: UseFormReturn<TourRequestInput, unknown, TourRequest>;
  dateTriggerRef: RefObject<HTMLButtonElement | null>;
  onSubmit?: (values: TourRequest) => Promise<void> | void;
};

type FormFieldProps = {
  label: ReactNode;
  error?: FieldError;
  errorId: string;
  children: ReactNode;
};

type TourDateFieldProps = {
  field: ControllerRenderProps<TourRequestInput, "date">;
  error?: FieldError;
  fieldId: string;
  errorId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const LABEL_CLASS_NAME = "text-grey text-sm leading-5";

const DATE_DISPLAY_FORMAT = new Intl.DateTimeFormat("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" });

function fromIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return undefined;

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));

  return toLocalIsoDate(date) === value ? date : undefined;
}

function startOfToday() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function FormField({ label, error, errorId, children }: FormFieldProps) {
  return (
    <div>
      {label}
      <div className="mt-2.5">{children}</div>
      <p id={errorId} aria-live="polite" className={cn("text-sm text-[#dc2626]", error && "mt-2")}>
        {error?.message}
      </p>
    </div>
  );
}

function TourDateField({ field, error, fieldId, errorId, triggerRef }: TourDateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState<Date>();
  const selected = fromIsoDate(field.value);
  const labelId = `${fieldId}-label`;
  const valueId = `${fieldId}-value`;

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (open) {
      setToday(startOfToday());
    } else {
      field.onBlur();
    }
  }

  return (
    <FormField
      label={
        <Label id={labelId} className={LABEL_CLASS_NAME}>
          Date
        </Label>
      }
      error={error}
      errorId={errorId}
    >
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          ref={(element) => {
            field.ref(element);
            triggerRef.current = element;
          }}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="border-grey-light focus-visible:border-primary focus-visible:ring-primary/50 data-popup-open:border-primary flex h-12 w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-lg border bg-transparent px-4 text-left text-base text-black transition-colors outline-none focus-visible:ring-3 aria-invalid:border-[#ef4444] aria-invalid:ring-3 aria-invalid:ring-[#ef4444]/20"
        >
          <span id={valueId} className={cn(!selected && "text-grey")}>
            {selected ? DATE_DISPLAY_FORMAT.format(selected) : "Select a date"}
          </span>
          <CalendarIcon aria-hidden className="text-grey size-4.5 shrink-0" />
        </PopoverTrigger>
        <PopoverContent align="start" initialFocus={false} className="w-auto p-0">
          {today && (
            <Calendar
              mode="single"
              required
              autoFocus
              selected={selected}
              defaultMonth={selected && selected >= today ? selected : today}
              startMonth={today}
              disabled={{ before: today }}
              onSelect={(date) => {
                field.onChange(toLocalIsoDate(date));
                handleOpenChange(false);
              }}
              className="[--cell-size:--spacing(9)]"
            />
          )}
        </PopoverContent>
      </Popover>
    </FormField>
  );
}

export default function ScheduleTourForm({ form, dateTriggerRef, onSubmit }: ScheduleTourFormProps) {
  const formId = useId();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const fieldId = (name: FieldName) => `${formId}-${name}`;
  const errorId = (name: FieldName) => `${fieldId(name)}-error`;

  const inputProps = (name: Exclude<FieldName, "date" | "time">) => ({
    ...register(name),
    id: fieldId(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
  });

  return (
    <form noValidate onSubmit={handleSubmit(async (values) => onSubmit?.(values))}>
      <fieldset className="grid gap-5">
        <legend className="sr-only">Preferred date and time</legend>

        <Controller
          control={control}
          name="date"
          render={({ field, fieldState }) => (
            <TourDateField
              field={field}
              error={fieldState.error}
              fieldId={fieldId("date")}
              errorId={errorId("date")}
              triggerRef={dateTriggerRef}
            />
          )}
        />

        <Controller
          control={control}
          name="time"
          render={({ field, fieldState }) => (
            <Select
              items={TOUR_TIME_OPTIONS}
              name={field.name}
              value={field.value || null}
              onValueChange={(value) => field.onChange(value ?? "")}
            >
              <FormField
                label={<SelectFieldLabel className={LABEL_CLASS_NAME}>Time</SelectFieldLabel>}
                error={fieldState.error}
                errorId={errorId("time")}
              >
                <SelectTrigger
                  ref={field.ref}
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.error ? true : undefined}
                  aria-describedby={fieldState.error ? errorId("time") : undefined}
                  className="w-full"
                >
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
              </FormField>
              <SelectContent align="start" alignItemWithTrigger={false}>
                {TOUR_TIME_OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </fieldset>

      <fieldset className="mt-12 grid gap-5">
        <legend className="text-dark-blue mb-4 text-base font-semibold">Your Information</legend>

        <FormField
          label={
            <Label htmlFor={fieldId("name")} className={LABEL_CLASS_NAME}>
              Name
            </Label>
          }
          error={errors.name}
          errorId={errorId("name")}
        >
          <Input type="text" autoComplete="name" {...inputProps("name")} />
        </FormField>

        <FormField
          label={
            <Label htmlFor={fieldId("phone")} className={LABEL_CLASS_NAME}>
              Phone
            </Label>
          }
          error={errors.phone}
          errorId={errorId("phone")}
        >
          <Input type="tel" inputMode="tel" autoComplete="tel" {...inputProps("phone")} />
        </FormField>

        <FormField
          label={
            <Label htmlFor={fieldId("email")} className={LABEL_CLASS_NAME}>
              Email
            </Label>
          }
          error={errors.email}
          errorId={errorId("email")}
        >
          <Input type="email" inputMode="email" autoComplete="email" {...inputProps("email")} />
        </FormField>

        <FormField
          label={
            <Label htmlFor={fieldId("message")} className={LABEL_CLASS_NAME}>
              Message (optional)
            </Label>
          }
          error={errors.message}
          errorId={errorId("message")}
        >
          <Textarea rows={1} className="max-h-40 min-h-12" {...inputProps("message")} />
        </FormField>
      </fieldset>

      <Button
        type="submit"
        disabled={!onSubmit || isSubmitting}
        className="shadow-button-primary mt-10 h-12 w-full text-base font-semibold"
      >
        Submit a Tour Request
      </Button>
    </form>
  );
}
