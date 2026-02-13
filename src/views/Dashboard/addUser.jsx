import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
  day: z.coerce.number().min(1).max(31),
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(1900).max(new Date().getFullYear()),
  age: z.coerce.number().min(1).max(120),
  gender: z.string().min(1, "Select gender"),
  role: z.string().min(1, "Select role"),
  address: z.string().optional(),
});

const calcAgeFromParts = (y, m, d) => {
  const birth = new Date(y, m - 1, d);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const mm = today.getMonth() - birth.getMonth();
  if (mm < 0 || (mm === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const AddUser = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const wDay = watch("day");
  const wMonth = watch("month");
  const wYear = watch("year");

  useEffect(() => {
    if (wDay && wMonth && wYear) {
      const age = calcAgeFromParts(wYear, wMonth, wDay);
      if (age > 0) setValue("age", age);
    }
  }, [wDay, wMonth, wYear, setValue]);

  const inputStyle =
    "w-full px-4 py-3 text-sm bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 hover:border-slate-300 hover:shadow-md";

  const selectStyle = `${inputStyle} bg-white/80 appearance-none cursor-pointer`;

  const labelStyle = "block text-sm font-semibold text-slate-700 mb-2";

  const onSubmit = (data) => {
    const dob = `${data.year}-${data.month.toString().padStart(2, '0')}-${data.day.toString().padStart(2, '0')}`;
    console.log({ ...data, dob });
    navigate("/dashboard");
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 border border-white/50"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Add New User
            </h1>
            <p className="text-slate-500 mt-1">Fill in the details below</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field label="Full Name" error={errors.name?.message}>
                <input {...register("name")} className={inputStyle} placeholder="Enter full name" />
              </Field>

              <Field label="Email Address" error={errors.email?.message}>
                <input {...register("email")} type="email" className={inputStyle} placeholder="your@email.com" />
              </Field>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field label="Mobile Number" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  maxLength={10}
                  inputMode="numeric"
                  onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                  className={inputStyle}
                  placeholder="10-digit number"
                />
              </Field>

              {/* DOB Section */}
              <div>
                <label className={labelStyle}>Date of Birth</label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    placeholder="DD"
                    maxLength={2}
                    {...register("day")}
                    className={`${inputStyle} text-center`}
                  />
                  <input
                    placeholder="MM"
                    maxLength={2}
                    {...register("month")}
                    className={`${inputStyle} text-center`}
                  />
                  <input
                    placeholder="YYYY"
                    maxLength={4}
                    {...register("year")}
                    className={`${inputStyle} text-center`}
                  />
                </div>
                <p className="text-red-500 text-sm mt-2 min-h-[1.25rem]">
                  {errors.day?.message || errors.month?.message || errors.year?.message}
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field label="Age (Auto-calculated)" error={errors.age?.message}>
                <input
                  readOnly
                  {...register("age")}
                  className={`${inputStyle} bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-800 font-semibold cursor-not-allowed`}
                />
              </Field>

              <Field label="Gender" error={errors.gender?.message}>
                <select {...register("gender")} className={selectStyle}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>

            {/* Role & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field label="Role" error={errors.role?.message}>
                <select {...register("role")} className={selectStyle}>
                  <option value="">Select role</option>
                  <option>User</option>
                  <option>Admin</option>
                  <option>Manager</option>
                </select>
              </Field>

              <div className="md:col-span-1">
                <label className={labelStyle}>Address (Optional)</label>
                <textarea
                  {...register("address")}
                  rows={4}
                  className={`${inputStyle} resize-vertical min-h-[100px] leading-relaxed`}
                  placeholder="Enter full address..."
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className={labelStyle}>Profile Photo</label>
              <label className="flex items-center gap-4 p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 cursor-pointer group">
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl group-hover:from-indigo-200 group-hover:to-blue-200 transition-all duration-300">
                  <Upload size={24} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Click to upload</p>
                  <p className="text-sm text-slate-500">PNG, JPG up to 5MB</p>
                </div>
                <input hidden type="file" accept="image/*" onChange={handlePhoto} />
              </label>
              {preview && (
                <div className="mt-6 flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
                  <img
                    src={preview}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-lg ring-2 ring-indigo-200/50"
                    alt="Preview"
                  />
                  <span className="text-sm text-indigo-700 font-medium">Photo selected ✓</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:from-indigo-700 hover:to-blue-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-indigo-200/50"
              >
                Save User
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:from-slate-200 hover:to-slate-300 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    {children}
    {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
  </div>
);

export default AddUser;
