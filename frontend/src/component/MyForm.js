import React from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Textarea,
} from "react-daisyui";
import { IoClose } from "react-icons/io5";

function MyForm(props) {
  function renderDynamicFormFields() {
    return (
      <>
        {props.formFields.map((field, index) => {
          if (
            field.type === "textarea" ||
            field.type === "text" ||
            field.type === "number" ||
            field.type === "date" ||
            field.type === "datetime" ||
            field.type === "datetime-local"
          ) {
            let step = 1;
            if ("step" in field) {
              step = field.step;
            }

            let disabled = false;
            if ("disabled" in field && field.disabled === true) {
              disabled = true;
            }

            let required = false;
            if ("required" in field && field.required === true) {
              required = true;
            }
            return (
              <div className={`col-span-${field.size} gap-2`}>
                {field.name && field.name !== "" ? (
                  <label className="label py-1 font-bold">{field.name}</label>
                ) : (
                  <div />
                )}

                {field.type === "textarea" ? (
                  <Textarea
                    className={`w-full ${field.height}  ${
                      field.required ? "border border-green-500" : ""
                    }`}
                    id={"id" in field ? field.id : "input-" + field.name}
                    size="sm"
                    placeholder={
                      "placeholder" in field ? field.placeholder : field.name
                    }
                    type={field.type}
                    onChange={field.onChange}
                    value={field.value}
                    disabled={disabled}
                    rows={field.rows}
                    onBlur={field.onBlur}
                  />
                ) : (
                  <Input
                    className={`w-full py-5 ${
                      field.required ? "border border-green-500" : ""
                    }`}
                    id={"id" in field ? field.id : "input-" + field.name}
                    size="sm"
                    placeholder={
                      "placeholder" in field ? field.placeholder : field.name
                    }
                    type={field.type}
                    onChange={field.onChange}
                    value={field.value}
                    disabled={disabled}
                    step={step}
                    onBlur={field.onBlur}
                  />
                )}
              </div>
            );
          } else if (field.type === "select") {
            let required = false;
            if ("required" in field && field.required === true) {
              required = true;
            }
            let disabled = false;
            if ("disabled" in field && field.disabled === true) {
              disabled = true;
            }
            return (
              <div className={`col-span-${field.size} gap-2`}>
                {field.name && field.name !== "" ? (
                  <label className="label py-1 font-bold">{field.name}</label>
                ) : (
                  <div />
                )}

                <Select
                  className={`w-full h-11 ${
                    field.required ? "border border-green-500" : ""
                  } `}
                  placeholder={
                    "placeholder" in field ? field.placeholder : field.name
                  }
                  id={"id" in field ? field.id : "input-" + field.name}
                  type="select"
                  size="sm"
                  value={field.value}
                  disabled={field.disable}
                  onChange={field.onChange}
                >
                  {field.options.map((item, key) => (
                    <Select.Option value={item.value} key={key}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            );
          }
        })}
      </>
    );
  }

  return (
    <Modal.Legacy
      open={props.modalOpen}
      className="max-w-none"
      onClickBackdrop={() => props.onClose()}
    >
      <Card className="border-0">
        <Card.Title className="flex items-center justify-between px-7">
          <div>{props.title}</div>
          <div>
            <IoClose
              className="hover:bg-gray-300 duration-200 cursor-pointer rounded-full p-1"
              size={30}
              onClick={() => props.onClose()}
            />
          </div>
        </Card.Title>

        <Divider className="mt-2 mb-2" />

        <Card.Body className="pt-0 pb-7">
          <Form>
            <div
              className={`container grid grid-cols-${props.gridCols} gap-y-5 gap-x-10 my-1 max-w-full`}
            >
              {renderDynamicFormFields()}
            </div>
          </Form>
        </Card.Body>

        <div className="px-7">
          <Button
            color="success"
            size="sm"
            className="text-white float-right h-9"
            onClick={() => props.action()}
          >
            Submit
          </Button>
        </div>
      </Card>
    </Modal.Legacy>
  );
}

export default MyForm;
