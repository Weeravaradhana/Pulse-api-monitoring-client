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
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4">

            <div>
                <p className="text-sm font-medium text-gray-800">
                    Delivery Health
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                    Monitor channel reliability and recent alert activity.
                </p>
            </div>

            <div className="flex items-center">
        <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
                failed > 0
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
            }`}
        >
          {failed > 0 ? "Issues detected" : "Healthy"}
        </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Sent today</p>
                    <p className="text-lg font-semibold text-gray-900">
                        {sentToday}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Deduplicated</p>
                    <p className="text-lg font-semibold text-gray-900">
                        {deduplicated}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Failed</p>
                    <p
                        className={`text-lg font-semibold ${
                            failed > 0 ? "text-red-500" : "text-gray-900"
                        }`}
                    >
                        {failed}
                    </p>
                </div>

            </div>
        </div>
    );
}