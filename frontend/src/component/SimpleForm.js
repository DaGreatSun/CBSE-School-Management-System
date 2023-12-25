import React from "react";
import { Input, Select, Textarea } from "react-daisyui";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

function SimpleForm(props) {
  if (
    props.type === "textarea" ||
    props.type === "text" ||
    props.type === "number" ||
    props.type === "date" ||
    props.type === "datetime" ||
    props.type === "datetime-local"
  ) {
    let step = 1;
    if ("step" in props) {
      step = props.step;
    }

    let disabled = false;
    if ("disabled" in props && props.disabled === true) {
      disabled = true;
    }

    let required = false;
    if ("required" in props && props.required === true) {
      required = true;
    }
    return (
      <div className={twMerge(`col-span-${props.size} gap-2`, props.className)}>
        {props.name && props.name !== "" ? (
          <label className="label py-1 font-bold">{props.name}</label>
        ) : (
          <div />
        )}

        {props.type === "textarea" ? (
          <Textarea
            className={twMerge(
              `w-full ${props.height}  ${
                props.required ? "border border-green-500" : ""
              }`
            )}
            id={"id" in props ? props.id : "input-" + props.name}
            size="md"
            placeholder={
              "placeholder" in props ? props.placeholder : props.name
            }
            type={props.type}
            onChange={props.onChange}
            value={props.value}
            disabled={disabled}
            rows={props.rows}
            onBlur={props.onBlur}
          />
        ) : (
          <Input
            className={`w-full py-5 ${
              props.required ? "border border-green-500" : ""
            }`}
            id={"id" in props ? props.id : "input-" + props.name}
            size="md"
            placeholder={
              "placeholder" in props ? props.placeholder : props.name
            }
            type={props.type}
            onChange={props.onChange}
            value={props.value}
            disabled={disabled}
            step={step}
            onBlur={props.onBlur}
          />
        )}
      </div>
    );
  } else if (props.type === "select") {
    let required = false;
    if ("required" in props && props.required === true) {
      required = true;
    }
    let disabled = false;
    if ("disabled" in props && props.disabled === true) {
      disabled = true;
    }
    return (
      <div className={twMerge(`col-span-${props.size} gap-2`, props.className)}>
        {props.name && props.name !== "" ? (
          <label className="label py-1 font-bold">{props.name}</label>
        ) : (
          <div />
        )}

        <Select
          className={twMerge(
            `w-full h-11 ${props.required ? "border border-green-500" : ""}`
          )}
          placeholder={"placeholder" in props ? props.placeholder : props.name}
          id={"id" in props ? props.id : "input-" + props.name}
          type="select"
          size="md"
          value={props.value}
          disabled={props.disable}
          onChange={props.onChange}
        >
          {props.options.map((item, key) => (
            <Select.Option value={item.value} key={key}>
              {item.text}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  } else {
    return <div>Simple Form</div>;
  }
}

export default SimpleForm;
