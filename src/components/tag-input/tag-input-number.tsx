import { InputNumber } from "antd";
import numbro from "numbro";
import React, { useState } from "react";
import { TagInputBase } from "./tag-input-base";
import { LiteralUnion } from "antd/lib/_util/type";
import { PresetColorType, PresetStatusColorType } from "antd/lib/_util/colors";

export type TagInputNumberValueType = string | number;

export type TagInputNumberProps<
  T extends TagInputNumberValueType = TagInputNumberValueType
> = {
  name?: string;
  id?: string;
  autoFocus?: boolean;
  changeOnBlur?: boolean;
  changeOnWheel?: boolean;
  controls?: boolean | { upIcon?: React.ReactNode; downIcon?: React.ReactNode };
  decimalSeparator?: string;
  placeholder?: string;
  defaultValue?: T;
  disabled?: boolean;
  keyboard?: boolean;
  max?: T;
  min?: T;
  precision?: number;
  readOnly?: boolean;
  status?: "error" | "warning";
  prefix?: React.ReactNode;
  size?: "large" | "middle" | "small";
  step?: T;
  stringMode?: boolean;
  variant?: "outlined" | "borderless" | "filled";
  styles?: {
    container?: React.CSSProperties;
    input?: React.CSSProperties;
    tag?: React.CSSProperties;
  };
  classNames?: {
    container?: string;
    tag?: string;
  };
  borderedTag?: boolean;
  tagCloseIcon?: React.ReactNode;
  tagColor?: LiteralUnion<PresetColorType | PresetStatusColorType>;
  format?: numbro.Format | string;
  inputFormatter?: (
    value: T | undefined,
    info: {
      userTyping: boolean;
      input: string;
    }
  ) => string;
  value?: T[];
  onChange?: (value?: T[]) => void;
};

export function TagInputNumber<
  T extends TagInputNumberValueType = TagInputNumberValueType
>({
  name,
  id,
  value = [],
  onChange,
  disabled,
  borderedTag,
  classNames,
  styles,
  tagCloseIcon,
  tagColor,
  format,
  inputFormatter,
  ...props
}: Readonly<TagInputNumberProps<T>>) {
  const [inputValue, setInputValue] = useState<T | null>();

  function formatValue(value: T | undefined): string {
    return value ? numbro(value).format(format) : "";
  }

  function handlePressEnter(
    addTag: (tag: T) => void,
    tags: T[] | undefined
  ): void {
    if (inputValue && !tags?.includes(inputValue)) {
      addTag(inputValue);
      setInputValue(undefined);
    }
  }

  function handleDelete(
    e: React.KeyboardEvent<HTMLInputElement>,
    removeLastTag: () => void
  ): void {
    if (e.key == "Backspace" && e.currentTarget.value.length === 0) {
      removeLastTag();
    }
  }

  return (
    <TagInputBase<T>
      renderTag={(v) => formatValue(v)}
      disabled={disabled}
      classNames={classNames}
      styles={{ container: styles?.container, tag: styles?.tag }}
      borderedTag={borderedTag}
      tagCloseIcon={tagCloseIcon}
      tagColor={tagColor}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
    >
      {({ addTag, removeLastTag }, tags) => (
        <InputNumber<T>
          style={{
            minWidth: 64,
            width: "auto",
            flex: 1,
            ...styles?.input,
          }}
          size="small"
          {...props}
          disabled={disabled}
          value={inputValue}
          onChange={(v) => setInputValue(v)}
          onPressEnter={() => handlePressEnter(addTag, tags)}
          onKeyUp={(e) => handleDelete(e, removeLastTag)}
          formatter={inputFormatter}
        />
      )}
    </TagInputBase>
  );
}
