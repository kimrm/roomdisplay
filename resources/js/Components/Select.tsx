import React from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children?: React.ReactNode;
}

export default function Select({ children, ...rest }: Props) {
    return (
        <select
            {...rest}
            className="mt-1 rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
            {children}
        </select>
    );
}
