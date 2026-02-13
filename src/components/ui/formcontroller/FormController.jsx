import React from "react";
import { Controller } from "react-hook-form";
import { cn } from "../../../utils/cn";

const FormController = ({
  label,
  type = "text",
  control,
  name,
  placeholder,
  className,
  options = [],
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
          {label && type !== "checkbox" && (
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}

          {/* Select Input */}
          {type === "select" ? (
            <select
              id={name}
              className={cn(
                "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-500 focus:ring-red-500"
              )}
              value={value}
              onChange={onChange}
              {...field}
              {...props}
            >
              <option value="" disabled>
                {placeholder || "Select an option"}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : /* Textarea Input */
          type === "textarea" ? (
            <textarea
              id={name}
              placeholder={placeholder}
              className={cn(
                "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-500 focus:ring-red-500"
              )}
              value={value}
              onChange={onChange}
              {...field}
              {...props}
            />
          ) : /* Checkbox Input */
          type === "checkbox" ? (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={name}
                className={cn(
                  "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
                  error && "border-red-500"
                )}
                checked={value}
                onChange={onChange}
                {...field}
                {...props}
              />
              {label && (
                <label
                  htmlFor={name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              )}
            </div>
          ) : /* Radio Input */
          type === "radio" ? (
            <div className="flex flex-col gap-2">
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${name}-${option.value}`}
                    value={option.value}
                    checked={value === option.value}
                    onChange={onChange}
                    className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                    {...props}
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          ) : /* File Input */
          type === "file" ? (
            <input
              id={name}
              type="file"
              className={cn(
                "flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-500"
              )}
              onChange={(e) => {
                onChange(e.target.files);
              }}
              {...field}
              {...props}
              value={undefined} // File inputs cannot be controlled with value
            />
          ) : (
            /* Default Input (text, number, email, password, date, etc.) */
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              className={cn(
                "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-500 focus:ring-red-500",
                className
              )}
              value={value}
              onChange={onChange}
              {...field}
              {...props}
            />
          )}

          {error && (
            <span className="text-sm font-medium text-red-500">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default FormController;