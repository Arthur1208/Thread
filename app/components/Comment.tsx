import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { LikeType } from "@/src/types/types";
import { Session } from "@prisma/client";
import Like from "./Like";

interface CommentProps {
  userName: string;
  likeCount: number;
  likes: LikeType[];
  authorId: string;
  comment: string;
  id: string;
  session: Session; // Ajoutez une annotation de type pour l'objet image
}

export default function Comment({
  authorId,
  userName,
  comment,
  likeCount,
  likes,
  id,
  session,
}: CommentProps) {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <p>{userName}</p>
        </CardHeader>
        <CardContent>{comment}</CardContent>
        <CardFooter className="flex justify-between">
          <Like id={id} session={session} likes={likes} type="comments" />
          <p>{likeCount > 0 ? likeCount : 0}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
