"use client";

import ProjectAvatar from "@/components/project/project-avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/user/user-avatar";
import { TaskPriority, TaskStatus } from "@/lib/constants";
import {
  useOpenTaskDialogStore,
  useProjects,
  useWorkspaceMembers,
} from "@/lib/stores";
import { cn } from "@/lib/utils";
import { TaskFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";

interface Props {
  defaultValues?: z.infer<typeof TaskFormSchema>;
  onSubmit: (values: z.infer<typeof TaskFormSchema>) => void;
  onClose?: () => void;
  isDisabled?: boolean;
}

export default function TaskForm({
  defaultValues,
  onSubmit,
  onClose,
  isDisabled,
}: Props) {
  const { projects } = useProjects();
  const { projectId } = useOpenTaskDialogStore();
  const { members, isAdmin } = useWorkspaceMembers();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          if (form.getValues("dueDate") === undefined) {
            form.setError("dueDate", {
              type: "manual",
            });
          } else {
            onSubmit(form.getValues());
          }
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>작업 제목</FormLabel>
              <FormControl>
                <Input placeholder="작업 제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="assigneeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isAdmin}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="담당자를 선택하세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem
                        key={member.id}
                        value={member.id}
                        className="h-12"
                      >
                        <div className="flex items-center gap-2">
                          <UserAvatar
                            name={member.name}
                            url={member.image}
                            className="size-6"
                          />
                          <span>{member.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>우선순위</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="우선순위를 선택하세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TaskPriority.map((priority) => (
                      <SelectItem
                        key={priority.value}
                        value={priority.value}
                        className="h-12"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`size-4 rounded-full ${priority.color}`}
                          />
                          <span>{priority.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>시작일</FormLabel>
                <Popover
                  modal={true}
                  open={startDateOpen}
                  onOpenChange={setStartDateOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ko })
                        ) : (
                          <span>시작일을 선택하세요</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setStartDateOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>마감일</FormLabel>
                <Popover
                  modal={true}
                  open={endDateOpen}
                  onOpenChange={setEndDateOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ko })
                        ) : (
                          <span>마감일을 선택하세요</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setEndDateOpen(false);
                      }}
                      disabled={(date) => {
                        const startDate = form.getValues("startDate");
                        return startDate ? date < startDate : false;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>작업 상태</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="작업 상태를 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TaskStatus.map((status) => (
                    <SelectItem
                      key={status.value}
                      value={status.value}
                      className="h-12"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-4 rounded-full ${status.color}`}
                        />
                        <span>{status.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>작업 설명</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="작업에 대한 자세한 설명을 입력하세요"
                  className="resize-none min-h-25 max-h-60"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>프로젝트</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!!projectId}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="프로젝트를 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem
                      key={project.id}
                      value={project.id}
                      className="h-12"
                    >
                      <div className="flex items-center gap-2">
                        <ProjectAvatar
                          name={project.name}
                          url={project.image}
                          className="size-6"
                        />
                        <span>{project.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isDisabled}>
            완료
          </Button>
        </div>
      </form>
    </Form>
  );
}
