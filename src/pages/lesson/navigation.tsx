import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface IProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

const Navigation = ({ show, setShow, type }: IProps) => {
  return (
    <>
      <div className="flex items-center justify-end h-15 gap-3">
        <div className="flex gap-2">
          <Select defaultValue="0">
            <SelectTrigger className="w-full max-mm:hidden">
              <SelectValue placeholder="Chapter" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }).map((e, idx) => (
                <SelectItem key={idx} value={idx + ""}>
                  Chapter {idx + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="0">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Lesson 1" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }).map((e, idx) => (
                <SelectItem key={idx} value={idx + ""}>
                  Lesson {idx + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button size="sm" disabled>
            <ArrowLeft />
          </Button>
          <Button size="sm">
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="bg-card w-max mx-auto flex items-center justify-center rounded-full overflow-hidden my-2 mm:hidden">
        <div
          className={cn(
            "py-1 px-3 text-muted-foreground cursor-pointer",
            !show && "bg-accent text-card-foreground",
          )}
          onClick={() => setShow(false)}
        >
          Lesson
        </div>
        <div
          className={cn(
            "py-1 px-3 text-muted-foreground cursor-pointer",
            show && "bg-accent text-card-foreground",
          )}
          onClick={() => setShow(true)}
        >
          {type}
        </div>
      </div>
    </>
  );
};

export default Navigation;
