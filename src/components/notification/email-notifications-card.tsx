import Toggle from "./toggle";

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
);

const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

type EmailNotificationsCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
    emails?: string[];
};

export default function EmailNotificationsCard({
                                                   enabled,
                                                   onChange,
                                                   emails = [],
                                               }: EmailNotificationsCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
                        <MailIcon />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">Email Notifications</p>
                        <p className="text-xs text-gray-400">Send alerts to your incident response distribution list.</p>
                    </div>
                </div>
                <Toggle enabled={enabled} onChange={onChange} />
            </div>
            <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Subscriber emails</p>
                <div className="flex flex-wrap gap-1.5">
                    {emails.map((email) => (
                        <span key={email} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {email}
            </span>
                    ))}
                </div>
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-green-600">
                    <CheckIcon />
                    <span>Delivery enabled for {emails.length} recipients</span>
                </div>
            </div>
        </div>
    );
}