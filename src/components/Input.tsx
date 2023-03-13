interface InputProps {
  name: string;
  displayName: string;
  type?: string;
  value: any;
  onChange: (e: any) => void;
}

export default function Input(props: InputProps) {
  const { name, displayName, type = "text", value, onChange } = props;

  return (
    <div className="input-wrapper">
      <label className="input-label" htmlFor={name}>
        {displayName}
      </label>
      <input
        className="input"
        id={name}
        name={name}
        type={type}
        value={value[name]}
        onChange={(e) => onChange({ ...value, [name]: e.target.value })}
      />
    </div>
  );
}
