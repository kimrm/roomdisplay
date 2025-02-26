import { PageProps } from "@/types";
import { CustomersPaginate } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({
    customersPaginate,
}: PageProps<{ customersPaginate: CustomersPaginate }>) {
    const { data, links, meta } = customersPaginate;

    return (
        <Authenticated>
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
                                    className={`mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Link
                                                href={`/dashboard/customers/${customer.id}`}
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                {customer.name}
                                            </Link>
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
                        <div className="mt-12">
                            <nav
                                className="flex justify-between"
                                aria-label="Pagination"
                            >
                                <div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        Viser {meta.from} til {meta.to} av{" "}
                                        {meta.total} kunder
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    {links.prev && (
                                        <Link
                                            href={`${links.prev}`}
                                            className="relative inline-flex items-center rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
                                        >
                                            Forrige
                                        </Link>
                                    )}
                                    {links.next && (
                                        <Link
                                            href={`${links.next}`}
                                            className="relative inline-flex items-center rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
                                        >
                                            Neste
                                        </Link>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
