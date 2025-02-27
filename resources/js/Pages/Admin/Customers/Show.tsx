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
                <div className="mx-auto max-w-7xl space-y-6 text-gray-900 sm:px-6 lg:px-8 dark:text-white">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl dark:text-white">
                                <span className="text-gray-400">
                                    #{customer.id}
                                </span>{" "}
                                {customer.name}
                            </h3>
                            <Link
                                href={route("customers.edit", customer.id)}
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
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                </svg>
                                <span className="hidden md:block">Rediger</span>
                            </Link>
                        </div>
                        <div>
                            <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                            e-post{" "}
                                        </div>
                                        <div>{customer.email}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                            telefon{" "}
                                        </div>
                                        <div>{customer.phone}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                            adresse{" "}
                                        </div>
                                        <div>{customer.address}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                            sted{" "}
                                        </div>
                                        <div>{customer.city}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                            postnummer{" "}
                                        </div>
                                        <div>{customer.postalCode}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                            kontaktperson{" "}
                                        </div>
                                        <div>{customer.contactName}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                            org.nummer{" "}
                                        </div>
                                        <div>{customer.orgNr}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                <h3 className="text-xs uppercase text-gray-400">
                                    Notater
                                </h3>
                                <div>
                                    <p>{customer.notes}</p>
                                </div>
                            </div>

                            <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                <h3 className="text-xs uppercase text-gray-400">
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
