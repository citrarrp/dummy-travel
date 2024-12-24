// "use client";
// import Button from "@/components/Button";
// import CurrencyInput from "@/components/CurrencyInput";
// import DatePicker from "@/components/DatePicker";
// import { Controller, useForm } from "react-hook-form";
// import Input from "@/components/Input";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { addDays } from "date-fns";

// const SearchTrip = () => {
//   const router = useRouter();
//   type SearchTripFormData = z.infer<typeof searchTripFormSchema>;

//   const searchTripFormSchema = z.object({
//     text: z
//       .string({ invalid_type_error: "O valor precisa ser uma string" })
//       .optional(),
//     startDate: z
//       .date({
//         required_error: "A data inicial é obrigatória",
//         invalid_type_error: "Selecione uma data valida",
//       })
//       .nullable()
//       .optional(),
//     endDate: z
//       .date({
//         required_error: "A data final é obrigatória",
//         invalid_type_error: "Selecione uma data valida",
//       })
//       .nullable()
//       .optional(),
//     budget: z
//       .string()
//       // .number({
//       //   invalid_type_error: "O valor precisa ser um número",
//       // })
//       .nullable()
//       .optional(),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//     watch,
//     setError,
//   } = useForm<SearchTripFormData>({
//     resolver: zodResolver(searchTripFormSchema),
//   });

//   const onSubmit = (data: SearchTripFormData) => {
//     router.push(
//       `/trip/search?text=${
//         data.text
//       }&startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&budget=${
//         data.budget
//       }`
//     );
//   };
//   const startDateWatch = watch("startDate");
//   const endDateWatch = watch("endDate");
//   const minDateEnd = () => {
//     const currentDate = new Date(Date.now());
//     const currentDayUpdated = addDays(currentDate, 1);
//     if (startDateWatch === null || startDateWatch === undefined) {
//       return currentDayUpdated;
//     }
//     const startDateUpdated = addDays(startDateWatch, 1);
//     if (startDateWatch <= currentDate) {
//       return currentDayUpdated;
//     } else if (startDateWatch >= currentDate) {
//       return startDateUpdated;
//     } else {
//       return currentDayUpdated;
//     }
//   };
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="mx-auto px-5 pt-5 lg:py-8 bg-search-background bg-cover bg-center bg-no-repeat"
//     >
//       <h1 className="text-primaryDarker font-semibold text-2xl flex justify-center items-center lg:text-3xl">
//         <p>
//           Encontre sua próxima <span className="text-primary"> viagem!</span>
//         </p>
//       </h1>

//       <div className="flex flex-col  mt-5 gap-4">
//         <Input
//           {...register("text")}
//           placeholder="Onde você deseja ir?"
//           error={!!errors.text}
//           errorMessage={errors.text?.message}
//         />
//         <div className="flex gap-4">
//           <Controller
//             name="startDate"
//             control={control}
//             render={({ field }) => (
//               <DatePicker
//                 className="w-full"
//                 placeholderText="Data de ida"
//                 error={!!errors.startDate}
//                 errorMessage={errors.startDate?.message}
//                 selected={field.value}
//                 // showMonthDropdown={true}
//                 // showYearDropdown={true}
//                 // excludeDates={[new Date("2023-07-25")]}
//                 onChange={field.onChange}
//                 minDate={new Date(Date.now())}
//               />
//             )}
//           />
//           <Controller
//             name="endDate"
//             control={control}
//             render={({ field }) => (
//               <DatePicker
//                 className="w-full"
//                 placeholderText="Data de volta"
//                 error={!!errors.endDate}
//                 errorMessage={errors.endDate?.message}
//                 selected={field.value}
//                 onChange={field.onChange}
//                 minDate={minDateEnd()}
//               />
//             )}
//           />

//           <Controller
//             name="budget"
//             control={control}
//             render={({ field }) => (
//               <CurrencyInput
//                 placeholder="Orçamento"
//                 className="w-full"
//                 error={!!errors.budget}
//                 errorMessage={errors.budget?.message}
//                 value={field.value ? Number(field.value) : undefined}
//                 // onChange={field.onChange}
//                 allowDecimals={false}
//                 allowNegativeValue={false}
//                 onValueChange={field.onChange}
//               />
//             )}
//           />
//         </div>
//         <Button /*onClick={}*/>Pesquisar</Button>
//       </div>
//     </form>
//   );
// };

// export default SearchTrip;