import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Booking } from "@/types";

export default function Show({ booking }: PageProps<{ booking: Booking }>) {
    const { data, setData, patch } = useForm({
        customer_id: booking.customer?.id,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //patch(route("customers.update", customer.id));
    };

    return (
        <Authenticated>
            <Head title="Kunder" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 text-gray-900 sm:px-6 lg:px-8 dark:text-white">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <h3 className="mb-2 text-xl dark:text-white">
                                    {booking.data.name}
                                </h3>
                                {booking.data.customer ? (
                                    <p>{booking.data.customer.name}</p>
                                ) : (
                                    <span className="text-gray-400">
                                        Ikke tilknyttet kunde
                                    </span>
                                )}
                                {booking.data.sync_identifier && (
                                    <span className="ml-2 text-gray-400">
                                        Synkronisert fra kalender
                                    </span>
                                )}
                            </div>
                            <div>
                                <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900"></div>
                                <div className="mb-2 space-y-2 rounded-md bg-neutral-100 p-4 dark:bg-gray-900">
                                    <h3 className="text-xs uppercase text-gray-400">
                                        Notater
                                    </h3>
                                    <div>
                                        <textarea
                                            name="notes"
                                            disabled
                                            className="w-full rounded border border-gray-200 text-xl text-gray-800 disabled:bg-gray-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
