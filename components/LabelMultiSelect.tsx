import IOption from "@/models/IOption";
import { FC } from "react";
import { MultiSelect } from "react-multi-select-component";

interface LabelSelectProps {
  options: IOption[];
  onChange: (val: IOption[]) => void;
  selectedValue: IOption[];
}

const LabelMultiSelect: FC<LabelSelectProps> = ({ options, selectedValue, onChange }) => {
  return (
    <MultiSelect
      options={options}
      value={selectedValue}
      onChange={onChange}
      labelledBy="Select"
    />
  );
};

export default LabelMultiSelect;