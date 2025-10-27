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
import { DEFAULT_AVATAR } from "@/lib/constants";
import { useImageUpload } from "@/lib/hooks/util";
import { UserFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import UserAvatar from "../user-avatar";

interface Props {
  isDisabled?: boolean;
  onSubmit: (data: z.infer<typeof UserFormSchema>) => void;
  defaultValues: z.infer<typeof UserFormSchema>;
}

export default function UserForm({
  isDisabled,
  onSubmit,
  defaultValues,
}: Props) {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
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
      <form
        className="flex flex-col gap-y-4"
        suppressHydrationWarning
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <div className="w-full flex justify-center items-center gap-y-2">
              {field.value ? (
                <div className="size-[150px] flex justify-center relative rounded-full overflow-hidden">
                  <UserAvatar
                    url={field.value || DEFAULT_AVATAR}
                    size="7xl"
                    isTooltipEnabled={false}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    {...getRootProps()}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader />
                    </div>
                  )}
                </div>
              ) : (
                <Avatar
                  className="size-[150px] cursor-pointer hover:bg-gray-50 transition-colors"
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
              <input
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                {...getInputProps()}
                disabled={uploading}
              />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="회원 이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isDisabled}>
            수정
          </Button>
        </div>
      </form>
    </Form>
  );
}
