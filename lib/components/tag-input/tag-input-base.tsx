import { CSSProperties, ReactNode, useState } from "react";
import { Flex, Tag } from "antd";
import { PresetColorType, PresetStatusColorType } from "antd/lib/_util/colors";
import { LiteralUnion } from "antd/lib/_util/type";

export type TagValue = string | number;

export type TagInputBaseProps<T> = {
  id?: string;
  name?: string;
  styles?: {
    container?: CSSProperties;
    tag?: CSSProperties;
  };
  classNames?: {
    container?: string;
    tag?: string;
  };
  tagCloseIcon?: ReactNode;
  borderedTag?: boolean;
  tagColor?: LiteralUnion<PresetColorType | PresetStatusColorType>;
  value?: T[];
  onChange?: (value?: T[]) => void;
  children: (
    operation: {
      addTag: (tag: T) => void;
      removeTag: (tag: T) => void;
      removeLastTag: () => void;
    },
    value?: T[]
  ) => ReactNode;
  formatTag?: (item: T) => TagValue;
  disabled?: boolean;
  required?: boolean;
};

export function TagInputBase<T extends TagValue = TagValue>({
  id,
  name,
  styles,
  classNames,
  value = [],
  onChange,
  tagCloseIcon,
  children,
  formatTag,
  borderedTag,
  tagColor,
  disabled,
  required,
}: Readonly<TagInputBaseProps<T>>) {
  const [tags, setTags] = useState<T[]>(value);

  function addTag(tag: T): void {
    const newTags = [...tags, tag];
    setTags(newTags);
    if (onChange) {
      onChange(newTags);
    }
  }

  function removeTag(tag: T): void {
    const newTags = tags?.filter((t) => t !== tag);
    setTags(newTags);
    if (onChange) {
      onChange(newTags);
    }
  }

  function removeLastTag(): void {
    const newTags = tags?.filter((_, i) => i !== tags.length - 1);
    setTags(newTags);
    if (onChange) {
      onChange(newTags);
    }
  }

  return (
    <Flex
      wrap="wrap"
      gap={8}
      style={styles?.container}
      className={classNames?.container}
      id={id}
    >
      {tags?.map((tag) => (
        <Tag
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            ...styles?.tag,
          }}
          className={classNames?.tag}
          key={tag}
          closable={!disabled}
          closeIcon={tagCloseIcon}
          onClose={() => removeTag(tag)}
          color={tagColor}
          bordered={borderedTag}
        >
          {formatTag ? formatTag(tag) : tag}
          <input
            type="hidden"
            readOnly
            tabIndex={-1}
            name={name}
            value={formatTag ? formatTag(tag) : tag}
            required={required}
          />
        </Tag>
      ))}
      {children({ addTag, removeTag, removeLastTag }, tags)}
    </Flex>
  );
}
