import { PageProps } from "@/types";
import { CustomersPaginate } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({
    customersPaginate,
}: PageProps<{ customersPaginate: CustomersPaginate }>) {
    const { data } = customersPaginate;
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Kunder
                </h2>
            }
        >
            <Head title="Kunder" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl dark:text-white">Kunder</h3>
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
                                Ny kunde
                            </Link>
                        </div>
                        <ul>
                            {data.map((customer, i) => (
                                <li
                                    key={customer.id}
                                    className={`${i % 2 === 0 ? "bg-neutral-100" : "bg-neutral-200"} mb-2 space-y-2 rounded-md p-4`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <a
                                                href={`/dashboard/customers/${customer.id}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                {customer.name}
                                            </a>
                                        </div>
                                        <div>
                                            <Link
                                                href={`/dashboard/customers/${customer.id}/edit`}
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                Rediger
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
