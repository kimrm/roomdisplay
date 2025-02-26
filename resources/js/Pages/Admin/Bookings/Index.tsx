import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
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
    periode: string;
    search: string;
}

export default function BookingsPage({
    bookingsPaginate,
    periode,
    search,
}: BookingsProps) {
    const { data: bookings, links, meta } = bookingsPaginate;

    const {
        data: formValues,
        setData,
        get,
    } = useForm({
        periode: periode ?? "all",
        search: search ?? "",
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        get(route("bookings.index"), {
            replace: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div>
                            <div className="my-6 flex items-center justify-between">
                                <form
                                    onSubmit={submit}
                                    name="filter_form"
                                    className="flex w-full max-w-lg flex-col space-y-2 md:flex-row"
                                >
                                    <label
                                        htmlFor="periode"
                                        className="sr-only"
                                    >
                                        Periode
                                    </label>
                                    <select
                                        onChange={(e) =>
                                            setData("periode", e.target.value)
                                        }
                                        name="periode"
                                        id="periode"
                                        defaultValue={formValues.periode}
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
                                        onChange={(e) =>
                                            setData("search", e.target.value)
                                        }
                                        value={formValues.search}
                                        type="search"
                                        id="search"
                                        name="search"
                                        placeholder="Søk etter booking"
                                        className="block w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400"
                                    />
                                    <button
                                        type="submit"
                                        className="rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 md:ml-2"
                                    >
                                        Søk
                                    </button>
                                </form>
                            </div>
                        </div>
                        <hr className="my-4 border-neutral-200 dark:border-neutral-700" />
                        <div className="my-4 flex items-center justify-between">
                            <h3 className="uppercase tracking-wide dark:text-white">
                                {periode === "all" && "Alle bookinger"}
                                {periode === "today" && "Dagens bookinger"}
                                {periode === "tomorrow" &&
                                    "Morgendagens bookinger"}
                                {periode === "week" && "Ukens bookinger"}
                                {periode === "month" && "Månedens bookinger"}
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
                                <span className="hidden md:block">
                                    Legg inn booking
                                </span>
                            </Link>
                        </div>

                        <div className="mt-6">
                            <ul>
                                {bookings.map((booking) => (
                                    <li
                                        key={booking.id}
                                        className="my-2 w-full items-center rounded bg-neutral-100 p-4 md:flex md:space-x-3 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        <div className="flex min-w-52 space-x-2 px-2 md:mt-0 md:px-0">
                                            <p>
                                                {new Date(
                                                    booking.start,
                                                ).toLocaleDateString("no-NO", {
                                                    year: "numeric",
                                                    month: "numeric",
                                                    day: "numeric",
                                                })}
                                            </p>
                                            <p>
                                                {new Date(
                                                    booking.start,
                                                ).toLocaleTimeString("no-NO", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                                -
                                                {new Date(
                                                    booking.end,
                                                ).toLocaleTimeString("no-NO", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                        <p className="mt-1 min-w-36 px-2 font-bold md:mt-0 md:px-0">
                                            {booking.room.name}
                                        </p>
                                        <h2 className="mt-2 rounded bg-gray-200 p-2 text-sm uppercase tracking-wide md:mt-0 dark:bg-gray-800">
                                            {booking.name}
                                        </h2>
                                    </li>
                                ))}
                            </ul>
                        </div>

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
                                            href={`${links.prev}&periode=${formValues.periode}&search=${formValues.search}`}
                                            className="relative inline-flex items-center rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
                                        >
                                            Forrige
                                        </Link>
                                    )}
                                    {links.next && (
                                        <Link
                                            href={`${links.next}&periode=${formValues.periode}&search=${formValues.search}`}
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
