import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { CustomerResponse } from "@/types";

export default function Show({
    customerResponse,
}: PageProps<{ customerResponse: CustomerResponse }>) {
    const { data: customer } = customerResponse;

    const { data, setData, patch } = useForm({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        postal_code: customer.postalCode,
        contact_name: customer.contactName,
        org_nr: customer.orgNr,
        notes: customer.notes,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route("customers.update", customer.id));
    };

    return (
        <Authenticated>
            <Head title="Kunder" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 text-gray-900 sm:px-6 lg:px-8 dark:text-white">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <form onSubmit={submit}>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xl dark:text-white">
                                    <span className="text-gray-400">
                                        #{customer.id}
                                    </span>{" "}
                                    <input
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        type="text"
                                        name="name"
                                        className="rounded border border-gray-200 text-xl dark:text-white"
                                        defaultValue={customer.name}
                                    />
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
                                    <span className="hidden md:block">
                                        Rediger
                                    </span>
                                </Link>
                            </div>
                            <div>
                                <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                                e-post{" "}
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                type="email"
                                                name="email"
                                                className="w-full rounded border border-gray-200 dark:text-white"
                                                defaultValue={customer.email}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                                telefon{" "}
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                name="phone"
                                                className="w-full rounded border border-gray-200 dark:text-white"
                                                defaultValue={customer.phone}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                                adresse{" "}
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                name="address"
                                                className="w-full rounded border border-gray-200 dark:text-white"
                                                defaultValue={customer.address}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                                sted{" "}
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "city",
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                name="city"
                                                className="w-full rounded border border-gray-200 dark:text-white"
                                                defaultValue={customer.city}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                                postnummer{" "}
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "postal_code",
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                name="postalCode"
                                                className="w-full rounded border border-gray-200 dark:text-white"
                                                defaultValue={
                                                    customer.postalCode
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                                kontaktperson{" "}
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "contact_name",
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                name="contactName"
                                                className="w-full rounded border border-gray-200 dark:text-white"
                                                defaultValue={
                                                    customer.contactName
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                                org.nummer{" "}
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "org_nr",
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                name="orgNr"
                                                className="w-full rounded border border-gray-200 dark:text-white"
                                                defaultValue={customer.orgNr}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                    <h3 className="text-xs uppercase text-gray-400">
                                        Notater
                                    </h3>
                                    <div>
                                        <textarea
                                            onChange={(e) =>
                                                setData("notes", e.target.value)
                                            }
                                            name="notes"
                                            className="w-full rounded border border-gray-200 dark:text-white"
                                            defaultValue={customer.notes}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="mr-3 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                >
                                    Oppdater
                                </button>
                                <Link
                                    href={route("customers.show", customer.id)}
                                    className="ml-2 text-blue-500 hover:text-blue-600"
                                >
                                    Avbryt
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
