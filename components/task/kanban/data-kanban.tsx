"use client";

import { TaskStatus } from "@/lib/constants";
import { Task } from "@/lib/types";
import { StatusTypes } from "@/lib/validations";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod/v3";
import KanbanCard from "./kanban-card";
import KanbanColumnHeader from "./kanban-column-header";

interface Props {
  data: Task[];
  onChange: (
    tasks: {
      id: string;
      status: z.infer<typeof StatusTypes>;
      position: number;
    }[]
  ) => void;
}

export default function DataKanban({ data, onChange }: Props) {
  const [tasks, setTasks] = useState(() => {
    const initialTasks: Record<string, Task[]> = {
      [TaskStatus[0].value]: [],
      [TaskStatus[1].value]: [],
      [TaskStatus[2].value]: [],
      [TaskStatus[3].value]: [],
      [TaskStatus[4].value]: [],
    };
    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status].sort((a, b) => a.position - b.position);
    });

    return initialTasks;
  });

  useEffect(() => {
    const updatedTasks: Record<string, Task[]> = {};
    TaskStatus.forEach((status) => {
      updatedTasks[status.value] = [];
    });
    data.forEach((task) => {
      updatedTasks[task.status].push(task);
    });
    Object.keys(updatedTasks).forEach((status) => {
      updatedTasks[status].sort((a, b) => a.position - b.position);
    });
    setTasks(updatedTasks);
  }, [data]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const { source, destination } = result;
      const sourceStatus = source.droppableId;
      const destStatus = destination.droppableId;

      let updatesPayload: {
        id: string;
        status: z.infer<typeof StatusTypes>;
        position: number;
      }[];

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);
        if (!movedTask) {
          toast.error("Failed to move task");
          return prevTasks;
        }

        const updatedMovedTask =
          sourceStatus !== destStatus
            ? {
                ...movedTask,
                status: destStatus as z.infer<typeof StatusTypes>,
              }
            : movedTask;

        newTasks[sourceStatus] = sourceColumn;

        const destColumn = [...newTasks[destStatus]];
        destColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destStatus] = destColumn;

        updatesPayload = [];

        updatesPayload.push({
          id: updatedMovedTask.id,
          status: updatedMovedTask.status,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        newTasks[destStatus].forEach((task, index) => {
          if (task && task.id !== updatedMovedTask.id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                id: task.id,
                status: destStatus as z.infer<typeof StatusTypes>,
                position: newPosition,
              });
            }
          }
        });

        if (sourceStatus !== destStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPosition) {
                updatesPayload.push({
                  id: task.id,
                  status: sourceStatus as z.infer<typeof StatusTypes>,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });

      onChange(updatesPayload!);
    },
    [onChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {TaskStatus.map((status) => {
          return (
            <div
              key={status.label}
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                status={status}
                taskCount={tasks[status.value]?.length}
              />
              <Droppable droppableId={status.value}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {tasks[status.value]?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
