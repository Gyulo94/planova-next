"use client";

import { useParameters } from "@/lib/hooks/util";
import { useFindWorkspaceMembers } from "@/lib/query";
import { useOpenTaskDialogStore, useWorkspaceMembers } from "@/lib/stores";
import { Task } from "@/lib/types";
import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./custom-toolbar";
import EventCard from "./event-card";

const locales = {
  "ko-KR": ko,
};

interface Props {
  data: Task[];
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function DataCalendar({ data }: Props) {
  const { onOpen } = useOpenTaskDialogStore();
  const { workspaceId, projectId } = useParameters();
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspaceId);
  const { setMembers, setIsAdmin } = useWorkspaceMembers();
  const { data: session } = useSession();
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  );
  const userId = session?.user.id;

  const events = data.map((task) => ({
    start: new Date(task.startDate),
    end: new Date(task.dueDate),
    title: task.name,
    project: task.project,
    assignee: task.assignee,
    status: task.status,
    id: task.id,
    priority: task.priority,
  }));

  function handleNavigate(action: "PREV" | "NEXT" | "TODAY") {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  }

  return (
    <Calendar
      localizer={localizer}
      culture="ko-KR"
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      selectable
      onSelectSlot={(slotInfo) => {
        setMembers(workspaceMembers.members || []);
        setIsAdmin(userId!);
        onOpen(projectId, workspaceId, slotInfo.start);
      }}
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event }: { event: any }) => (
          <EventCard
            id={event.id}
            title={event.title}
            assignee={event.assignee}
            project={event.project}
            status={event.status}
            priority={event.priority}
          />
        ),
        toolbar: () => (
          <CustomToolbar date={value} onNavigate={handleNavigate} />
        ),
      }}
    />
  );
}
