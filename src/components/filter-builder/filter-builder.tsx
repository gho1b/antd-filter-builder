import { TagInput, TagInputNumber } from "../tag-input";
import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

const { Item, useForm, useWatch } = Form;

export type Cojunction = "and" | "or";

export type BooleanOperation = "eq" | "null" | "neq" | "nnull";

export type NumberOperation =
  | "eq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "null"
  | "neq"
  | "ngt"
  | "ngte"
  | "nlt"
  | "nin"
  | "nlte"
  | "nnull";

export type DateTimeOperation = NumberOperation;

export type UUIDOperation = NumberOperation;

export type StringOperation =
  | "eq"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "in"
  | "null"
  | "empty"
  | "neq"
  | "ncontains"
  | "nstartsWith"
  | "nendsWith"
  | "nin"
  | "nnull"
  | "nempty";

export type FilterOperation =
  | BooleanOperation
  | NumberOperation
  | DateTimeOperation
  | UUIDOperation
  | StringOperation;

export type StringFilterProps = {
  type?: "string";
  operations?: StringOperation[];
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  formatter?: <T>(value?: string) => T;
  dataIndex?: string;
};

export type NumberFilterProps = {
  type?: "number";
  operations?: NumberOperation[];
  min?: number;
  max?: number;
  formatter?: <T>(value?: number) => T;
  dataIndex?: string;
  value?: number | number[];
};

export type BooleanFilterProps = {
  type?: "boolean";
  operations?: BooleanOperation[];
  formatter?: <T>(value?: boolean) => T;
  dataIndex?: string;
};

export type DateTimeFilterProps = {
  type?: "datetime";
  operations?: DateTimeOperation[];
  min?: Date;
  max?: Date;
  minInclusive?: boolean;
  maxInclusive?: boolean;
  minPrecision?:
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year";
  maxPrecision?:
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year";
  timeZone?: string;
  precision?:
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year";
  format?: string;
  formatter?: <T>(value?: Date) => T;
  dataIndex?: string;
};

export type UUIDFilterProps = {
  type?: "uuid";
  operations?: UUIDOperation[];
  formatter?: <T>(value?: string) => T;
  dataIndex?: string;
};

export type DataFilter<
  T extends string | number | boolean | Dayjs =
    | string
    | number
    | boolean
    | Dayjs
> = {
  type: "filter";
  dataIndex?: string;
  operation?: string;
  value?: T;
};

export type DataFilterGroup = {
  type: "group";
  conjunction: "and" | "or";
  filters: (DataFilter | DataFilterGroup)[];
};

export type FilterType = (
  | BooleanFilterProps
  | NumberFilterProps
  | DateTimeFilterProps
  | UUIDFilterProps
  | StringFilterProps
) & {
  label: string;
};

type FilterProps = {
  form: FormInstance;
  filters?: FilterType[];
  path: (number | string)[];
};

function addChild(
  form: FormInstance,
  path: (string | number)[],
  data: DataFilterGroup | DataFilter
): void {
  const fPath = [...path, "filters"];
  const filters = (form.getFieldValue(fPath) ?? []) as (
    | DataFilter
    | DataFilterGroup
  )[];
  form.setFieldValue(fPath, [...filters, data]);
}

function removeChild(
  form: FormInstance<DataFilterGroup>,
  path: (string | number)[]
): void {
  const parentPath = path.slice(0, -1);
  const pathData = form.getFieldValue(parentPath);
  form.setFieldValue(
    parentPath,
    pathData?.filter((_: unknown, i: number) => i !== Number(path.slice(-1)))
  );
}

export type OperationOption = {
  value: FilterOperation;
  title: string;
  label: string;
};

function createOperationOption(type: string): OperationOption[] {
  switch (type) {
    case "number":
    case "datetime":
    case "uuid":
      return [
        { value: "eq", title: "Equals", label: "eq" },
        { value: "gt", title: "Greater than", label: "gt" },
        { value: "gte", title: "Greater or equals than", label: "gte" },
        { value: "lt", title: "Less than", label: "lt" },
        { value: "lte", title: "Less or equals than", label: "lte" },
        { value: "in", title: "In", label: "in" },
        { value: "null", title: "Null", label: "null" },
        { value: "neq", title: "Not equals", label: "neq" },
        { value: "ngt", title: "Not greater than", label: "ngt" },
        { value: "ngte", title: "Not greater or equals than", label: "ngte" },
        { value: "nlt", title: "Not less than", label: "nlt" },
        { value: "nlte", title: "Not less or equals than", label: "nlte" },
        { value: "nnull", title: "Not null", label: "nnull" },
        { value: "nin", title: "Not in", label: "nin" },
      ];
    case "boolean":
      return [
        { value: "eq", title: "Equals", label: "eq" },
        { value: "neq", title: "Not equals", label: "neq" },
        { value: "null", title: "Null", label: "null" },
      ];
    case "string":
    default:
      return [
        { value: "eq", title: "Equals", label: "eq" },
        { value: "contains", title: "Contains", label: "contains" },
        { value: "startsWith", title: "Starts with", label: "startsWith" },
        { value: "endsWith", title: "Ends with", label: "endsWith" },
        { value: "null", title: "Is null", label: "null" },
        { value: "empty", title: "Is empty", label: "empty" },
        { value: "in", title: "In", label: "in" },
        { value: "neq", title: "Not equals", label: "neq" },
        { value: "ncontains", title: "Not Contains", label: "ncontains" },
        {
          value: "nstartsWith",
          title: "Not starts with",
          label: "nstartsWith",
        },
        { value: "nendsWith", title: "Not ends with", label: "nendsWith" },
        { value: "nnull", title: "Not null", label: "nnull" },
        { value: "nempty", title: "Not empty", label: "nempty" },
        { value: "nin", title: "Not in", label: "nin" },
      ];
  }
}

function Filter({ form, filters, path }: Readonly<FilterProps>) {
  const [operationOptions, setOperationOptions] = useState<OperationOption[]>();
  const [fieldType, setFieldType] = useState<string>();
  const operationValue: string | undefined = useWatch(
    [...path, "operation"],
    form
  );
  const fieldValue = useWatch([...path, "field"], form);

  useEffect(() => {
    const field = filters?.find((f) => f.dataIndex === fieldValue);
    setFieldType(field?.type ?? "string");
  }, [fieldValue, filters]);

  useEffect(() => {
    const options = createOperationOption(fieldType ?? "string");
    setOperationOptions(options);
  }, [fieldType]);

  useEffect(() => {
    if (
      operationValue &&
      !operationOptions?.some((o) => o.value === operationValue)
    ) {
      form.setFieldValue([...path, "operation"], undefined);
      form.setFieldValue([...path, "value"], undefined);
    }
  }, [form, operationOptions, operationValue, path]);

  function renderInput(fieldType?: string) {
    switch (fieldType) {
      case "boolean":
        return (
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            disabled={operationValue?.includes("null")}
          />
        );
      case "datetime":
        return (
          <DatePicker
            multiple={operationValue === "in" || operationValue === "nin"}
            style={{ width: "100%", minWidth: 72, flex: 1 }}
            disabled={operationValue?.includes("null")}
          />
        );
      case "number":
        return operationValue === "in" || operationValue === "nin" ? (
          <TagInputNumber />
        ) : (
          <InputNumber
            contentEditable
            style={{ width: "100%", height: "100%" }}
            disabled={operationValue?.includes("null")}
          />
        );
      case "string":
      default:
        return operationValue === "in" || operationValue === "nin" ? (
          <TagInput />
        ) : (
          <Input
            placeholder="Keyword"
            style={{ width: "100%" }}
            disabled={
              operationValue?.includes("null") ??
              operationValue?.includes("empty")
            }
          />
        );
    }
  }

  return (
    <Flex key={(path ?? [0]).join("-")} gap={4}>
      <Item noStyle hidden name={[...path, "type"]}>
        <input type="hidden" />
      </Item>

      <Item
        name={[...path, "field"]}
        rules={[{ required: true, message: "Field should be pick" }]}
        initialValue={filters?.[0]?.dataIndex}
        style={{ marginBottom: 0 }}
      >
        <Select
          showSearch
          autoClearSearchValue
          placeholder="Field"
          options={filters?.map((filter) => ({
            key: filter.dataIndex,
            value: filter.dataIndex,
            label: filter.label,
          }))}
          style={{ minWidth: 100 }}
        />
      </Item>

      <Item
        name={[...path, "operation"]}
        initialValue={operationOptions?.[0]?.value}
        rules={[{ required: true, message: "Operation is required" }]}
        style={{ marginBottom: 0 }}
      >
        <Select
          showSearch
          placeholder="Operation"
          options={operationOptions}
          style={{ minWidth: 128 }}
        />
      </Item>

      <Item
        name={[...path, "value"]}
        rules={[
          {
            required: !(
              operationValue?.includes("null") ??
              operationValue?.includes("empty")
            ),
            message: "Keyword is required",
          },
        ]}
        style={{ marginBottom: 0, width: "auto", minWidth: 72, flex: 1 }}
      >
        {renderInput(fieldType)}
      </Item>

      {Number(path.slice(-1)) > 0 && (
        <Button
          onClick={() => removeChild(form, path)}
          icon={<DeleteOutlined />}
        >
          Remove
        </Button>
      )}
    </Flex>
  );
}

export type FilterBuilderProps = {
  onFilter?: (data: DataFilterGroup) => void;
  filters?: FilterType[];
};

export function FilterBuilder({
  filters,
  onFilter,
}: Readonly<FilterBuilderProps>) {
  const [form] = useForm<DataFilterGroup>();

  function renderFilter(level: number, path: (number | string)[] = []) {
    const conjunctionName = [...path, "conjunction"];
    const filterName = [...path, "filters"];
    const typeName = [...path, "type"];
    const typeValue = form.getFieldValue(typeName);

    if (typeValue === "filter") {
      return (
        <Filter
          form={form}
          path={path}
          filters={filters}
          key={path.join("--")}
        />
      );
    }

    return (
      <Flex
        key={(path ?? [0]).join("-")}
        vertical
        style={{
          paddingTop: 8,
          paddingRight: 8,
          paddingBottom: 8,
          paddingLeft: 8,
          backgroundColor: `rgba(3, 7, 18, ${(level + 1) * 0.1})`,
        }}
        className="rounded"
      >
        <Flex gap={8}>
          <Item hidden name={typeName}>
            <input type="hidden" />
          </Item>

          <Item name={conjunctionName} required>
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={[
                { value: "and", label: "and" },
                { value: "or", label: "or" },
              ]}
            />
          </Item>

          {level < 4 && (
            <Button
              onClick={() =>
                addChild(form, path, {
                  type: "group",
                  conjunction: "and",
                  filters: [{ type: "filter" }],
                })
              }
              icon={<PlusOutlined />}
            >
              Group
            </Button>
          )}

          <Button
            onClick={() => addChild(form, path, { type: "filter" })}
            icon={<PlusOutlined />}
          >
            Filter
          </Button>

          {level > 0 && (
            <Button
              onClick={() => removeChild(form, path)}
              icon={<DeleteOutlined />}
            >
              Remove
            </Button>
          )}
        </Flex>

        <Item shouldUpdate noStyle>
          {() => {
            const filters = form.getFieldValue(filterName) ?? [];
            return (
              filters &&
              filters?.length > 0 && (
                <Flex vertical gap={8} style={{ marginLeft: (level + 1) * 8 }}>
                  {filters
                    ?.filter((f: DataFilterGroup | DataFilter) => !!f)
                    ?.map((_: DataFilterGroup | DataFilter, i: number) =>
                      renderFilter(level + 1, [...filterName, i])
                    )}
                </Flex>
              )
            );
          }}
        </Item>
      </Flex>
    );
  }

  return (
    <Form
      size="small"
      form={form}
      initialValues={{
        type: "group",
        conjunction: "and",
        filters: [{ type: "filter" }],
      }}
      onFinish={(v) => onFilter?.(v)}
    >
      <Flex vertical gap={8}>
        {renderFilter(0)}

        <Item>
          <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </Item>
      </Flex>
    </Form>
  );
}
