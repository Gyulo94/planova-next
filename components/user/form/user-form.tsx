// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// export default function UserForm() {
//   return (<Form {...form}>
//       <form

//         className="space-y-4"
//       >
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>작업 제목</FormLabel>
//               <FormControl>
//                 <Input placeholder="작업 제목을 입력하세요" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>작업 설명</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="작업에 대한 자세한 설명을 입력하세요"
//                   className="resize-none min-h-25 max-h-60"
//                   {...field}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <div className="flex justify-end space-x-2">
//           <Button type="submit" disabled={isDisabled}>
//             완료
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
