import {useState} from "react";

type ToggleProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
    onSelect?: (value: boolean) => void;

};

export default function Toggle({ enabled, onChange, onSelect }: ToggleProps) {
    const [isEnable, setEnable] = useState(true);
    console.log(isEnable)

    const selectToggle = (selectedData: boolean) => {
        setEnable(selectedData)
        onChange(isEnable)
        if (onSelect) {
            onSelect(selectedData);
        }
    };

    return (
        <button
            role="switch"
            aria-checked={enabled}
            onClick={() => selectToggle(!isEnable)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                enabled ? "bg-blue-500" : "bg-gray-200"
            }`}
        >
      <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
              enabled ? "translate-x-5" : "translate-x-1"
          }`}
      />
        </button>
    );
}