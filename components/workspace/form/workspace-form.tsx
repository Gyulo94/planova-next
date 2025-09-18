"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { DottedSeparator } from "@/components/ui/separator";
import { useImageUpload } from "@/lib/hooks/util";
import { WorkspaceFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import z from "zod/v3";

interface Props {
  id?: string;
  isDisabled?: boolean;
  onSubmit: (data: z.infer<typeof WorkspaceFormSchema>) => void;
  defaultValues: z.infer<typeof WorkspaceFormSchema>;
  onClose?: () => void;
}

export default function WorkspaceForm({
  id,
  isDisabled,
  onSubmit,
  defaultValues,
  onClose,
}: Props) {
  const form = useForm<z.infer<typeof WorkspaceFormSchema>>({
    resolver: zodResolver(WorkspaceFormSchema),
    defaultValues,
  });

  const currentImage = form.watch("image");

  const initialImages = useMemo(() => {
    return currentImage ? [currentImage] : [];
  }, [currentImage]);

  const { uploadImages, uploading } = useImageUpload({
    maxImages: 1,
    initialImages,
    onSuccess: (urls) => {
      if (urls.length > 0) {
        const newImageUrl = urls[0];
        form.setValue("image", newImageUrl);
      }
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: uploadImages,
  });

  return (
    <Form {...form}>
      <form suppressHydrationWarning onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>워크스페이스 이름</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`워크스페이스 이름을 입력하세요.`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-5">
                  {field.value ? (
                    <div
                      className="size-[72px] relative rounded-md overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                      {...getRootProps()}
                    >
                      <Image
                        src={field.value}
                        fill
                        className="object-cover"
                        alt="Workspace Image"
                      />
                      {uploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Avatar
                      className="size-[72px] cursor-pointer hover:bg-gray-50 transition-colors"
                      {...getRootProps()}
                    >
                      <AvatarFallback>
                        {uploading ? (
                          <Loader className="border-neutral-400 border-t-transparent" />
                        ) : (
                          <ImageIcon className="size-[36px] text-neutral-400" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <p className="text-sm">
                      {field.value
                        ? "이미지를 변경하려면 클릭하세요."
                        : "워크스페이스 로고를 등록하세요."}
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG, PNG, WEBP (최대 10MB)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      {...getInputProps()}
                      disabled={uploading}
                    />
                  </div>
                </div>
              </div>
            )}
          />
        </div>
        <DottedSeparator className="my-7" />
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant={"secondary"}
            size={"lg"}
            onClick={onClose}
            disabled={isDisabled}
          >
            취소
          </Button>
          <Button type="submit" size={"lg"} disabled={isDisabled}>
            {id ? "수정" : "생성"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
