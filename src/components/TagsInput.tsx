import React, { FC, useState } from "react";

//styles
import "./styles.scss";

interface ITagsInput {
  tags: string[];
  onChange: (value: string[]) => void;
}

const TagsInput: FC<ITagsInput> = (props) => {
  const { tags, onChange } = props;

  const [value, setValue] = useState<string>("");

  const handleRemove = (tagtoDelete: string) => {
    onChange(tags.filter((el) => el !== tagtoDelete));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnter = e.code === "Enter";
    const value = e.currentTarget.value;

    if (!isEnter) return;

    if (value.length === 0) return;

    setValue("");
    onChange([...tags, value]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value.includes(",")) {
      setValue(value);
      return;
    }

    if (value.includes(",") && value.length === 1) return;

    const values = value.split(",");
    const lastValue = values.pop();

    setValue(lastValue || "");

    if (values.length === 0) return;

    onChange([...tags, ...values]);
  };

  return (
    <div className="tags-input">
      {tags?.map((tag, i) => (
        <div
          key={`${i}-${tag}`}
          data-testid={"tags"}
          className={"tags-input--tag"}
        >
          {tag}
          <div
            className={"tags-input--delete"}
            data-testid={"remove"}
            onClick={() => handleRemove(tag)}
          >
            X
          </div>
        </div>
      ))}
      <input
        className="tags-input--input"
        type="text"
        data-testid={"input"}
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TagsInput;
