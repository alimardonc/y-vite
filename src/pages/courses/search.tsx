import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const suggestions = [
  "React",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "HTML",
  "CSS",
];

const Search = () => {
  return (
    <div className="flex flex-col gap-1.5 mt-10 mb-5">
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map((e) => (
          <Badge key={e} variant="secondary">
            {e}
          </Badge>
        ))}
      </div>
      <Input placeholder="Search courses..." />
    </div>
  );
};

export default Search;
