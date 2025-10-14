"use client";

import { TaskPriority, TaskStatus } from "@/lib/constants";
import { debounce, useTaskFilters } from "@/lib/hooks/util";
import { useFindWorkspaceMembers } from "@/lib/query";
import { WorkspaceMember } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  CalendarIcon,
  ChevronDownIcon,
  ListChecksIcon,
  XIcon,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import UserAvatar from "../user/user-avatar";

interface Props {
  workspaceId: string;
}

export default function DataFilters({ workspaceId }: Props) {
  const [
    { status, assigneeId, priority, projectId, dueDate, startDate, search },
    setFilters,
  ] = useTaskFilters();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspaceId);
  const members: WorkspaceMember[] = workspaceMembers.members;

  function handleDebounceSearch(value: string) {
    setFilters({ search: value === "" ? null : value });
  }

  const debouncedSearch = debounce(handleDebounceSearch, 1000);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  function onStatusChange(value: string) {
    setFilters({
      status:
        value === "all"
          ? null
          : (value as (typeof TaskStatus)[number]["value"]),
    });
  }

  function onPriorityChange(value: string) {
    setFilters({
      priority:
        value === "all"
          ? null
          : (value as (typeof TaskPriority)[number]["value"]),
    });
  }

  function onAssigneeChange(value: string) {
    setFilters({
      assigneeId: value === "all" ? null : value,
    });
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-2">
      <div className="flex items-center py-4 w-full">
        <Input
          placeholder="검색..."
          className="w-full lg:max-w-md"
          defaultValue={search ?? ""}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2">
        <Select
          defaultValue={status ?? undefined}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              {!status && <ListChecksIcon className="size-4 mr-2" />}
              <SelectValue placeholder="모든 상태" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 상태</SelectItem>
            <SelectSeparator />
            {TaskStatus.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                <div className="flex items-center gap-2">
                  <div className={`size-4 rounded-full ${status.color}`} />
                  <span>{status.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={priority ?? undefined}
          onValueChange={onPriorityChange}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              {!priority && <ListChecksIcon className="size-4 mr-2" />}
              <SelectValue placeholder="모든 우선순위" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 우선순위</SelectItem>
            <SelectSeparator />
            {TaskPriority.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                <div className="flex items-center gap-2">
                  <div className={`size-4 rounded-full ${priority.color}`} />
                  <span>{priority.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={onAssigneeChange}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              {!assigneeId && <ListChecksIcon className="size-4 mr-2" />}
              <SelectValue placeholder="모든 담당자" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 담당자</SelectItem>
            <SelectSeparator />
            {members.map((member) => (
              <SelectItem key={member.id} value={member.id}>
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
        <Popover
          modal={true}
          open={startDateOpen}
          onOpenChange={setStartDateOpen}
        >
          <PopoverTrigger className="w-full lg:w-auto h-8 shadow-xs" asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full px-3 text-left font-normal justify-between hover:bg-inherit hover:text-muted-foreground",
                !startDate && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4 opacity-50" />
                {startDate ? (
                  format(startDate, "PPP", { locale: ko })
                ) : (
                  <span>시작날짜</span>
                )}
              </div>
              {!startDate && (
                <div>
                  <ChevronDownIcon className="size-4 opacity-50 ml-2" />
                </div>
              )}
              {startDate && (
                <XIcon
                  className="z-50 size-4 text-destructive ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilters({ startDate: null });
                  }}
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate ? new Date(startDate) : undefined}
              onSelect={(date) => {
                setFilters({
                  startDate: date ? format(date, "yyyy-MM-dd") : null,
                });
                setStartDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        <Popover modal={true} open={dueDateOpen} onOpenChange={setDueDateOpen}>
          <PopoverTrigger className="w-full lg:w-auto h-8 shadow-xs" asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full px-3 text-left font-normal justify-between hover:bg-inherit hover:text-muted-foreground",
                !dueDate && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4 opacity-50" />
                {dueDate ? (
                  format(dueDate, "PPP", { locale: ko })
                ) : (
                  <span>마감날짜</span>
                )}
              </div>
              {!dueDate && (
                <div>
                  <ChevronDownIcon className="size-4 opacity-50 ml-2" />
                </div>
              )}
              {dueDate && (
                <XIcon
                  className="z-50 size-4 text-destructive ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilters({ dueDate: null });
                  }}
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate ? new Date(dueDate) : undefined}
              onSelect={(date) => {
                setFilters({
                  dueDate: date ? format(date, "yyyy-MM-dd") : null,
                });
                setDueDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
