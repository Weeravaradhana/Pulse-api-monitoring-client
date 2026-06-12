import Toggle from "./toggle";

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
);

type RecoveryNotificationCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
};

export default function RecoveryNotificationCard({ enabled, onChange }: RecoveryNotificationCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-800">Recovery Notification</p>
                    <p className="text-xs text-gray-400">Notify when system recovers and returns to UP state.</p>
                </div>
                <Toggle enabled={enabled} onChange={onChange} />
            </div>
            {enabled && (
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-green-600">
                    <CheckIcon />
                    <span>Recovery alerts are enabled for all channels</span>
                </div>
            )}
        </div>
    );
}