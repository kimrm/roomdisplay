import React from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ value, onChange, ...rest }: Props) {
    return (
        <textarea
            value={value ?? ""}
            onChange={onChange}
            {...rest}
            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
    );
}
