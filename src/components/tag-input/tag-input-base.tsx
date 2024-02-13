import { Flex, Tag } from "antd";
import { PresetColorType, PresetStatusColorType } from "antd/lib/_util/colors";
import { LiteralUnion } from "antd/lib/_util/type";
import React, { useState } from "react";

export type TagInputBaseProps<T> = {
  id?: string;
  name?: string;
  styles?: {
    container?: React.CSSProperties;
    tag?: React.CSSProperties;
  };
  classNames?: {
    container?: string;
    tag?: string;
  };
  tagCloseIcon?: React.ReactNode;
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
  ) => React.ReactNode;
  renderTag?: (item: T) => React.ReactNode;
  disabled?: boolean;
  required?: boolean;
};

export function TagInputBase<T>({
  id,
  name,
  styles,
  classNames,
  value = [],
  onChange,
  tagCloseIcon,
  children,
  renderTag: renderItem,
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
          key={tag as any}
          closable={!disabled}
          closeIcon={tagCloseIcon}
          onClose={() => removeTag(tag)}
          color={tagColor}
          bordered={borderedTag}
        >
          {renderItem ? renderItem(tag) : (tag as any)}
          <input
            type="hidden"
            readOnly
            tabIndex={-1}
            name={name}
            value={renderItem ? renderItem(tag) : (tag as any)}
            required={required}
          />
        </Tag>
      ))}
      {children({ addTag, removeTag, removeLastTag }, tags)}
      {/* <input
        tabIndex={-1}
        type="hidden"
        name={name}
        id={id}
        value={tags.join(valueSeparator)}
        readOnly
        required={required}
      /> */}
    </Flex>
  );
}
