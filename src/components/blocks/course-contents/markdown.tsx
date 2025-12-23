import MDEditor from "@/components/ui/md-editor";

interface IProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

const Markdown = ({ field }: IProps) => {
  return <MDEditor field={field} />;
};

export default Markdown;
