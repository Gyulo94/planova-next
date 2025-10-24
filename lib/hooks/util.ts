import { imageUpload } from "@/lib/actions";
import { useParams, usePathname } from "next/navigation";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { TaskPriority, TaskStatus } from "../constants";

interface UseImageUploadProps {
  maxImages?: number;
  onSuccess?: (urls: string[]) => void;
  initialImages?: string[];
}

export function useImageUpload({
  maxImages = 1,
  onSuccess,
  initialImages = [],
}: UseImageUploadProps = {}) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const prevInitialImagesRef = useRef<string[]>(initialImages);

  useEffect(() => {
    const currentInitialImages = initialImages;
    const prevInitialImages = prevInitialImagesRef.current;

    const hasChanged =
      currentInitialImages.length !== prevInitialImages.length ||
      currentInitialImages.some(
        (img, index) => img !== prevInitialImages[index]
      );

    if (hasChanged) {
      setImages(currentInitialImages);
      prevInitialImagesRef.current = currentInitialImages;
    }
  }, [initialImages]);

  const uploadImages = useCallback(
    async (acceptedFiles: File[]) => {
      const remainingSlots = maxImages - images.length;
      const filesToUpload = acceptedFiles.slice(0, maxImages);

      if (filesToUpload.length === 0) {
        toast.error("업로드할 이미지를 선택해주세요.");
        return;
      }
      setUploading(true);

      try {
        const formData = new FormData();

        filesToUpload.forEach((file) => {
          formData.append("files", file);
        });

        const uploadedUrls = await imageUpload(formData);

        if (uploadedUrls && uploadedUrls.length > 0) {
          let newImages: string[];

          if (remainingSlots <= 0) {
            newImages = uploadedUrls.slice(0, maxImages);
          } else {
            const totalImages = [...images, ...uploadedUrls];
            newImages = totalImages.slice(0, maxImages);
          }

          setImages(newImages);
          onSuccess?.(newImages);
        }
      } catch (error) {
        toast.error("이미지 업로드에 실패했습니다.");
      } finally {
        setUploading(false);
      }
    },
    [images, maxImages, onSuccess]
  );

  return {
    uploading,
    uploadImages,
  };
}

export function useGenerateInviteCode(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function useParameters() {
  const params = useParams();
  return {
    workspaceId: params.workspaceId as string,
    inviteCode: params.inviteCode as string,
    projectId: params.projectId as string,
  };
}

export function useTitleAndDescription() {
  const pathname = usePathname();
  if (pathname.includes("/settings")) {
    return {
      title: "세팅",
    };
  } else if (pathname.includes("/members")) {
    return {
      title: "멤버",
    };
  } else if (pathname.includes("/tasks")) {
    return {
      title: "작업",
    };
  } else if (pathname.includes("/projects")) {
    return {
      title: "프로젝트",
    };
  } else {
    return {
      title: "홈",
    };
  }
}

export function useTaskFilters() {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(
      Object.values(TaskStatus).map((status) => status.value)
    ),
    priority: parseAsStringEnum(
      Object.values(TaskPriority).map((priority) => priority.value)
    ),
    assigneeId: parseAsString,
    search: parseAsString,
    startDate: parseAsString,
    dueDate: parseAsString,
  });
}

export const debounce = (func: (value: string) => void, delay: number) => {
  let timerId: NodeJS.Timeout;
  return function (...args: [string]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
