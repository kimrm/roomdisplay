import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Booking } from "@/types";

interface BookingsProps {
    bookingsPaginate: {
        data: Booking[];
        meta: {
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
            from: number;
            to: number;
            path: string;
            links: [
                {
                    url: string | null;
                    label: string;
                    active: boolean;
                },
            ];
        };
        links: {
            first: string | null;
            last: string | null;
            prev: string | null;
            next: string | null;
        };
    };
}

export default function BookingsPage({ bookingsPaginate }: BookingsProps) {
    const { data: bookings, links, meta } = bookingsPaginate;

    console.log(links);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Bookings
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="bg-neutral-100 p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                            <h3 className="text-xl dark:text-white">
                                Filtrering
                            </h3>
                            <div className="my-6 flex items-center justify-between">
                                <form
                                    name="filter_form"
                                    className="flex w-full max-w-lg"
                                >
                                    <label
                                        htmlFor="periode"
                                        className="sr-only"
                                    >
                                        Periode
                                    </label>
                                    <select
                                        name="periode"
                                        id="periode"
                                        className="mr-2 block w-full rounded-md border border-neutral-300 bg-neutral-100 text-sm text-neutral-900 placeholder-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400"
                                    >
                                        <option value="today">I dag</option>
                                        <option value="tomorrow">
                                            I morgen
                                        </option>
                                        <option value="week">Denne uken</option>
                                        <option value="month">
                                            Denne måneden
                                        </option>
                                        <option value="all">Alle </option>
                                    </select>
                                    <label htmlFor="filter" className="sr-only">
                                        Filter
                                    </label>
                                    <input
                                        type="text"
                                        id="filter"
                                        name="filter"
                                        placeholder="Søk etter booking"
                                        className="block w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400"
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="my-4 flex items-center justify-between">
                            <h3 className="text-xl dark:text-white">
                                Kommende bookinger
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
                                Legg inn booking
                            </Link>
                        </div>

                        <table className="w-full">
                            <caption className="sr-only">Bookings</caption>
                            <thead className="h-12 bg-neutral-100">
                                <tr className="text-neutral-500 dark:text-neutral-400">
                                    <th className="p-3 text-left">Sted</th>
                                    <th className="p-3 text-left">Rom</th>
                                    <th className="p-3 text-left">Tittel</th>
                                    <th className="p-3 text-left">Kunde</th>
                                    <th className="p-3 text-left">Dato</th>
                                    <th className="p-3 text-left">Fra</th>
                                    <th className="p-3 text-left">Til</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-4 divide-neutral-100 dark:divide-neutral-200 dark:text-neutral-100">
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="p-3">
                                            {booking.room.location?.name}
                                        </td>
                                        <td className="p-3">
                                            {booking.room.name}
                                        </td>
                                        <td className="p-3">{booking.name}</td>
                                        <td className="p-3 dark:text-neutral-300">
                                            {booking.customer?.name ?? (
                                                <Link
                                                    className="text-blue-500 hover:text-blue-600"
                                                    href={`/dashboard/customers/${booking.customer?.id}`}
                                                >
                                                    Legg til
                                                </Link>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {new Date(
                                                booking.start,
                                            ).toLocaleDateString("no-NO", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "numeric",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="p-3">
                                            {new Date(
                                                booking.start,
                                            ).toLocaleTimeString()}
                                        </td>
                                        <td className="p-3">
                                            {new Date(
                                                booking.end,
                                            ).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-12">
                            <nav
                                className="flex justify-between"
                                aria-label="Pagination"
                            >
                                <div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        Viser {meta.from} til {meta.to} av{" "}
                                        {meta.total} bookinger
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    {links.prev && (
                                        <Link
                                            href={links.prev}
                                            className="relative inline-flex items-center rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
                                        >
                                            Forrige
                                        </Link>
                                    )}
                                    {links.next && (
                                        <Link
                                            href={links.next}
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
        </AuthenticatedLayout>
    );
}
