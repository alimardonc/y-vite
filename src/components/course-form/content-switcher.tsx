import { useFormContext, Controller } from "react-hook-form";
import { CONTENT_TYPES } from "./constants";
import MDEditor from "./editors/markdown";

export const ContentSwitcher = () => {
  const { control, watch } = useFormContext();
  const type = watch("type");

  return (
    <Controller
      name="content"
      control={control}
      render={({ field }) => {
        switch (type) {
          case CONTENT_TYPES.MARKDOWN:
            return (
              <MDEditor
                field={{ value: field.value, onChange: field.onChange }}
              />
            );

          default:
            return (
              <div className="p-4 border italic">
                Select a type to edit content
              </div>
            );
        }
      }}
    />
  );
};
