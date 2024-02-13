import { Input } from "antd";
import { useState } from "react";
import { TagInputBase } from "./tag-input-base";
import { LiteralUnion } from "antd/lib/_util/type";
import { PresetColorType } from "antd/lib/_util/colors";
import { PresetStatusColorType } from "antd/es/_util/colors";
import { InputStatus } from "antd/lib/_util/statusUtils";
import { SizeType } from "antd/lib/config-provider/SizeContext";

export type TagInputProps = {
  name?: string;
  id?: string;
  autoFocus?: boolean;
  styles?: {
    container?: React.CSSProperties;
    input?: React.CSSProperties;
    tag?: React.CSSProperties;
  };
  classNames?: {
    container?: string;
    tag?: string;
  };
  tagCloseIcon?: React.ReactNode;
  borderedTag?: boolean;
  tagColor?: LiteralUnion<PresetColorType | PresetStatusColorType>;
  disabled?: boolean;
  inputMaxLength?: number;
  inputMinLength?: number;
  inputMin?: string | number;
  inputMax?: string | number;
  inputPrefix?: React.ReactNode;
  inputStatus?: InputStatus;
  inputPattern?: string;
  size?: SizeType;
  value?: string[];
  required?: boolean;
  onChange?: (value?: string[]) => void;
};

export function TagInput({
  name,
  id,
  autoFocus,
  styles,
  classNames,
  disabled,
  borderedTag,
  tagCloseIcon,
  tagColor,
  inputMinLength,
  inputMaxLength,
  inputMin,
  inputMax,
  inputPrefix,
  inputStatus,
  inputPattern,
  size = "small",
  value,
  onChange,
  required,
}: Readonly<TagInputProps>) {
  const [inputValue, setInputValue] = useState<string>();

  function handleAddTag(
    addTag: (tag: string) => void,
    tags: string[] | undefined
  ): void {
    const tag = inputValue?.trim();
    if (tag && tag?.length > 0 && !tags?.includes(tag)) {
      addTag(tag);
      setInputValue(undefined);
    }
  }

  function handleRemoveTag(
    e: React.KeyboardEvent<HTMLInputElement>,
    removeLastTag: () => void
  ): void {
    if (e.key == "Backspace" && (!inputValue || inputValue.length === 0)) {
      removeLastTag();
    }
  }

  return (
    <TagInputBase<string>
      styles={{ container: styles?.container, tag: styles?.tag }}
      classNames={{ container: classNames?.container, tag: classNames?.tag }}
      disabled={disabled}
      borderedTag={borderedTag}
      tagCloseIcon={tagCloseIcon}
      tagColor={tagColor}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      required={required}
    >
      {({ addTag, removeLastTag }, tags) => (
        <Input
          size={size}
          disabled={disabled}
          style={{ flex: 1, ...styles?.input }}
          maxLength={inputMaxLength}
          status={inputStatus}
          prefix={inputPrefix}
          pattern={inputPattern}
          minLength={inputMinLength}
          min={inputMin}
          max={inputMax}
          value={inputValue}
          onChange={(v) => setInputValue(v.currentTarget.value)}
          onPressEnter={() => handleAddTag(addTag, tags)}
          onKeyUp={(e) => handleRemoveTag(e, removeLastTag)}
          autoFocus={autoFocus}
          required={false}
          aria-required={false}
          tabIndex={0}
        />
      )}
    </TagInputBase>
  );
}
