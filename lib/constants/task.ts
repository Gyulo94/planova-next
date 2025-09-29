export const TaskPriority = [
  {
    value: "LOW",
    label: "낮음",
    color: "bg-slate-600",
  },
  {
    value: "MEDIUM",
    label: "중간",
    color: "bg-amber-600",
  },
  {
    value: "HIGH",
    label: "높음",
    color: "bg-orange-600",
  },
  {
    value: "CRITICAL",
    label: "긴급",
    color: "bg-red-600",
  },
] as const;

export const TaskStatus = [
  {
    value: "TODO",
    label: "할 일",
    color: "bg-blue-600",
  },
  {
    value: "IN_PROGRESS",
    label: "진행 중",
    color: "bg-amber-600",
  },
  {
    value: "COMPLETED",
    label: "완료",
    color: "bg-green-600",
  },
  {
    value: "BACKLOG",
    label: "백로그",
    color: "bg-gray-600",
  },
  {
    value: "IN_REVIEW",
    label: "검토 중",
    color: "bg-indigo-600",
  },
] as const;