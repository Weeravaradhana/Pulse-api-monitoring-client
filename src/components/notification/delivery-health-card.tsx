type DeliveryHealthCardProps = {
    sentToday?: number;
    deduplicated?: number;
    failed?: number;
};

export default function DeliveryHealthCard({
                                               sentToday = 0,
                                               deduplicated = 0,
                                               failed = 0,
                                           }: DeliveryHealthCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-800">Delivery Health</p>
                    <p className="text-xs text-gray-400">Monitor channel reliability and recent alert activity.</p>
                </div>
                <span className="text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full">
          Healthy
        </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Sent today</p>
                    <p className="text-2xl font-bold text-gray-900">{sentToday}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Deduplicated</p>
                    <p className="text-2xl font-bold text-gray-900">{deduplicated}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Failed</p>
                    <p className={`text-2xl font-bold ${failed > 0 ? "text-red-500" : "text-gray-900"}`}>
                        {failed}
                    </p>
                </div>
            </div>
        </div>
    );
}