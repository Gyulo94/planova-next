import { DEFAULT_AVATAR } from "@/lib/constants";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import UserAvatar from "./user-avatar";

interface Props {
  user: Session["user"];
  onClose: () => void;
}

export default function UserProfile({ user, onClose }: Props) {
  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center justify-center">
        <UserAvatar
          name={user?.name}
          url={user.image || DEFAULT_AVATAR}
          isTooltipEnabled={false}
          size="7xl"
        />
      </div>
      <div>
        <h2 className="text-center mt-4 text-2xl font-semibold">
          {user?.name}
        </h2>
        <p className="text-center text-sm text-neutral-500">{user?.email}</p>
      </div>
      <Button className="mt-5" onClick={onClose}>
        닫기
      </Button>
    </div>
  );
}
