import { imageUpload } from "@/lib/actions";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
          onSuccess?.(uploadedUrls);
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
