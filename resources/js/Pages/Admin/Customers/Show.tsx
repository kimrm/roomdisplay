import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { CustomerResponse } from "@/types";

export default function Show({
    customerResponse,
}: PageProps<{ customerResponse: CustomerResponse }>) {
    const { data: customer } = customerResponse;
    return (
        <Authenticated>
            <Head title="Kunder" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 dark:text-white">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl dark:text-white">
                                {customer.name}
                            </h3>
                            <Link
                                href="/dashboard/locations/create"
                                className="flex items-center justify-center rounded-md border border-transparent px-4 py-2 hover:border-neutral-200 dark:bg-gray-800 dark:text-white"
                            >
                                <svg
                                    fill="none"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="mr-2 inline-block h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Rediger
                            </Link>
                        </div>
                        <div>
                            <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                <h3 className="text-xl dark:text-white">
                                    Kundeinfo
                                </h3>
                                <div>
                                    <p>
                                        <span className="text-sm uppercase text-gray-400">
                                            e-post:{" "}
                                        </span>
                                        {customer.email}
                                    </p>
                                    <p>
                                        {" "}
                                        <span className="text-sm uppercase text-gray-400">
                                            tlf:{" "}
                                        </span>
                                        {customer.phone}
                                    </p>
                                    <p>
                                        {" "}
                                        <span className="text-sm uppercase text-gray-400">
                                            adresse:{" "}
                                        </span>
                                        {customer.address}
                                    </p>
                                    <p>
                                        {" "}
                                        <span className="text-sm uppercase text-gray-400">
                                            sted:{" "}
                                        </span>
                                        {customer.city}
                                    </p>
                                    <p>
                                        {" "}
                                        <span className="text-sm uppercase text-gray-400">
                                            postnr:{" "}
                                        </span>
                                        {customer.postalCode}
                                    </p>
                                    <p>
                                        {" "}
                                        <span className="text-sm uppercase text-gray-400">
                                            kontakt:{" "}
                                        </span>
                                        {customer.contactName}
                                    </p>
                                    <p>
                                        {" "}
                                        <span className="text-sm uppercase text-gray-400">
                                            org.nr:{" "}
                                        </span>
                                        {customer.orgNr}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                <h3 className="text-xl dark:text-white">
                                    Notater
                                </h3>
                                <div>
                                    <p>{customer.notes}</p>
                                </div>
                            </div>

                            <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                <h3 className="text-xl dark:text-white">
                                    Bookinger
                                </h3>
                                <ul>
                                    <li>
                                        <Link
                                            href="/dashboard/bookings/1"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            Booking 1
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/dashboard/bookings/2"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            Booking 2
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
