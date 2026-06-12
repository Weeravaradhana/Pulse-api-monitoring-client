import Toggle from "./toggle";

type MaintenanceModeCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
};

export default function MaintenanceModeCard({ enabled, onChange }: MaintenanceModeCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-800">Mute all alerts temporarily</p>
                <p className="text-xs text-gray-400 mt-0.5">Maintenance mode toggle</p>
            </div>
            <Toggle enabled={enabled} onChange={onChange} />
        </div>
    );
}