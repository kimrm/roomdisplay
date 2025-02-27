import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Room, Location } from "@/types";

interface RoomProps {
    rooms: Room[];
    locations: Location[];
    selectedLocationId: string;
}

export default function RoomsPage({
    rooms,
    locations,
    selectedLocationId,
}: RoomProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Rom
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl dark:text-white">
                                Romoversikt
                            </h3>
                            <Link
                                href="/dashboard/rooms/create"
                                className="flex items-center justify-center rounded-md bg-purple-50 px-4 py-2 hover:bg-purple-200 dark:bg-gray-800 dark:text-white"
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
                                Nytt rom
                            </Link>
                        </div>
                        <form
                            action=""
                            method="GET"
                            className="mb-4 inline-block"
                        >
                            <select
                                name="location"
                                id="location"
                                className="block w-full rounded-md border border-gray-300 p-2 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Alle</option>
                                {locations.map((location) => {
                                    return (
                                        <option
                                            key={location.id}
                                            value={location.id}
                                            selected={
                                                selectedLocationId ==
                                                location.id
                                            }
                                        >
                                            {location.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <button>Filtrer</button>
                        </form>
                        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {rooms.map((room) => {
                                return (
                                    <li
                                        key={room.id}
                                        className="relative rounded-md bg-neutral-50 p-4 hover:bg-neutral-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-950"
                                    >
                                        <div className="absolute right-0 top-0 p-2">
                                            <Link
                                                href={`/dashboard/rooms/${room.id}/edit`}
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                Rediger
                                            </Link>
                                        </div>
                                        <div>
                                            <h2 className="text-lg">
                                                {room.name}
                                            </h2>
                                            <br />
                                            <span className="font-semibold">
                                                Lokasjon:
                                            </span>{" "}
                                            {room.location?.name}
                                            <br />
                                            <span className="font-semibold">
                                                Synk.:
                                            </span>{" "}
                                            {room.service ? (
                                                <span className="rounded bg-green-800 px-2 text-green-50">
                                                    Aktiv
                                                </span>
                                            ) : (
                                                <span className="rounded bg-yellow-300 px-2 text-black">
                                                    Inaktiv
                                                </span>
                                            )}
                                            <br />
                                            <span className="font-semibold">
                                                Link:
                                            </span>{" "}
                                            <a
                                                href={`/locations/${room.location?.slug}/room/${room.slug}`}
                                                target="blank"
                                            >
                                                {room.slug}
                                            </a>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
