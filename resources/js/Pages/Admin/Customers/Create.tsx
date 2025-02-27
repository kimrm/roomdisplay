import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Show() {
    const { data, setData, post } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        contact_name: "",
        org_nr: "",
        notes: "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("customers.store"));
    };

    return (
        <Authenticated>
            <Head title="Kunder" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 text-gray-900 sm:px-6 lg:px-8 dark:text-white">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h3 className="mb-3 text-xl dark:text-white">
                            Opprett ny kunde
                        </h3>
                        <form onSubmit={submit}>
                            <div>
                                <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <div className="inline-block w-full max-w-32 text-xs uppercase text-gray-400">
                                                navn{" "}
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                name="name"
                                                className="w-full rounded border border-gray-200 dark:text-white"
                                            />
                                        </div>
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
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="mr-3 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                >
                                    Lagre
                                </button>
                                <Link
                                    href={route("customers.index")}
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
