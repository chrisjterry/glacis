import styled from "@emotion/styled";

const Select = styled.select`
  font-family: Courier;
  color: black;
  background-color: white;
  border-style: solid;
  border-color: black;
  border-radius: 0.5rem;
  border-width: 2px;
  font-size: 1rem;
  padding: 0.75rem;
  min-width: 250px;
  margin-right: 0.5rem;
`;

export const Dropdown = ({ placeholder, options, onChange }) => {
  return (
    <Select
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </Select>
  );
};
