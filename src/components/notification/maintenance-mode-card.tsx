import Toggle from "./toggle";
import Dropdown from "@/components/common/drop-down";
import {useState} from "react";

type MaintenanceModeCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
    onSelect?: (value: boolean) => void;
};

export default function MaintenanceModeCard({ enabled, onChange, onSelect}: MaintenanceModeCardProps) {
    const [toggleVale, setToggleValue] = useState(true);

    const handleToggleButton = (value:boolean) => {
        setToggleValue(value)
        if (onSelect) {
            onSelect(value)
        }
    }


    return (
       <>
           <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
               <div>
                   <p className="text-sm font-medium text-gray-800">Mute all alerts temporarily</p>
                   <p className="text-xs text-gray-400 mt-0.5">Maintenance mode toggle</p>
               </div>
               <Toggle enabled={enabled} onChange={onChange} onSelect={handleToggleButton} />
           </div>
           {
               !toggleVale ?  <Dropdown
                   labels={["1 Hour", "24 Hour", "30 Days"]}
               /> : ""
           }

       </>
    );
}