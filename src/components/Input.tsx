import React from "react";

interface InputProps {
  name: string;
  displayName: string;
  type?: string;
  value: any;
  onChange: (e: any) => void;
  submitted?: boolean;
  fieldErrors: any;
}

export default function Input(props: InputProps) {
  const {
    name,
    displayName,
    type = "text",
    value,
    onChange,
    fieldErrors,
  } = props;
  const [className, setClassName] = React.useState<string>("");

  // !fieldErrors[name]?.length > 0 ?
  //   setClassName("valid")
  // : setClassName("invalid")

  console.log(className);
  // console.log(fieldErrors[name]);
  return (
    <div className="input-wrapper">
      <label className="input-label" htmlFor={name}>
        {displayName}
      </label>
      <input
        className={`${className} input`}
        id={name}
        name={name}
        type={type}
        value={value[name]}
        onSubmit={() => (value[name].length === 0 ? "invalid" : "valid")}
        onChange={(e) => {
          value[name].length === 0 ? "invalid" : "valid";
          onChange({ ...value, [name]: e.target.value });
        }}
      />
      {/* <div className="error-message" hidden={!fieldErrors[name].length}>{fieldErrors[name]}</div> */}
    </div>
  );
}
