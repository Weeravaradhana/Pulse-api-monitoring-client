"use client";

import Toggle from "./toggle";

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const MailIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4">

            <div className="flex items-start gap-2">

                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg shrink-0">
                    <MailIcon />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-800">
                        Email Notifications
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Send alerts to your incident response distribution list.
                    </p>
                </div>

            </div>
            
            <div>
                <p className="text-xs text-gray-500 mb-1">
                    Subscriber emails
                </p>

                <div className="flex flex-wrap gap-1.5">
                    {emails.map((email) => (
                        <span
                            key={email}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
              {email}
            </span>
                    ))}
                </div>

                <div className="flex items-center gap-1.5 mt-2 text-xs text-green-600">
                    <CheckIcon />
                    <span>
            Delivery enabled for {emails.length} recipients
          </span>
                </div>
            </div>


            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                    Enable Email Notifications
                </p>

                <Toggle enabled={enabled} onChange={onChange} />
            </div>

        </div>
    );
}