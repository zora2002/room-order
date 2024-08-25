import "./CustomInputNumber.css";

interface CustomInputNumberProps {
  min: number
  max: number
  step: number
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  minDisabled: boolean
  maxDisabled: boolean
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = ({
  min,
  max,
  step,
  name,
  value,
  onChange,
  minDisabled = false,
  maxDisabled = false,
}) => {
  const handleIncrement = () => {
    if (maxDisabled) return;
    const numValue = Number(value)
    const newValue = Math.min(numValue + step, max).toString();
    onChange({
      target: { name, value: newValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDecrement = () => {
    if (minDisabled) return;
    const numValue = Number(value)
    const newValue = Math.max(numValue - step, min).toString();
    onChange({
      target: { name, value: newValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = Number(value);
    if (value === '' || isNaN(numValue)) {
      onChange({
        target: { name, value: '0' },
      } as React.ChangeEvent<HTMLInputElement>);
      return;
    }
    const newValue = Math.min(Math.max(numValue, min), max);
    onChange({
      target: { name, value: newValue.toString() },
    } as React.ChangeEvent<HTMLInputElement>);    
  };

  return (
    <div className="custom-btn">
      <button onClick={handleDecrement} disabled={minDisabled}>
        -
      </button>
      <input
        type="number"
        name={name}
        value={value}
        onChange={handleInputChange}
      />
      <button onClick={handleIncrement} disabled={maxDisabled}>
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
