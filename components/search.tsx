"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const SearchTrip = () => {
  const router = useRouter();
  type SearchTripFormData = z.infer<typeof searchTripFormSchema>;

  const searchTripFormSchema = z.object({
    text: z
      .string({ invalid_type_error: "Nilai harus berupa string" })
      .optional(),
    startDate: z.string().nullable().optional(),
    budget: z.string().nullable().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<SearchTripFormData>({
    resolver: zodResolver(searchTripFormSchema),
  });

  const onSubmit = (data: SearchTripFormData) => {
    // If startDate is valid, navigate to package page
    if (data.startDate && data.text) {
      router.push(
        "./package/1?harga=300000&destinasi=1"
        // `/package/${data}`);
        //  `/package?text=${data.text}&startDate=${data.startDate}&budget=${data.budget}`
      );
    } else {
      // Handle error when startDate or text is missing
      if (!data.startDate) {
        setError("startDate", {
          type: "manual",
          message: "Tanggal keberangkatan wajib diisi",
        });
      }
      if (!data.text) {
        setError("text", {
          type: "manual",
          message: "Tujuan wajib diisi",
        });
      }
    }
  };

  const startDateWatch = watch("startDate");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto px-5 pt-5 lg:py-8 bg-search-background bg-cover bg-center bg-no-repeat"
    >
      <h1 className="text-secondary font-semibold text-2xl flex justify-center items-center lg:text-3xl">
        <p>
          Temukan <span className="text-secondaryDarker">perjalanan</span>{" "}
          berikutnya!
        </p>
      </h1>

      <div className="flex flex-col mt-5 gap-4 text-secondary">
        <Input {...register("text")} placeholder="Ke mana tujuan Anda?" />
        <div className="flex gap-4">
          <div className="w-full">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-left mb-3"
            >
              Tanggal Keberangkatan
            </label>
            <input
              type="date"
              {...register("startDate")}
              className="text-primary h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.startDate && (
              <p className="text-red-500">{errors.startDate.message}</p>
            )}
          </div>
        </div>
        <Input {...register("budget")} placeholder="Batas Anggaran" />
        <Button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded text-center"
        >
          Cari
        </Button>
      </div>
    </form>
  );
};

export default SearchTrip;
