import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Room } from "@/types";

interface RoomProps {
    rooms: Room[];
}

export default function RoomsPage({ rooms }: RoomProps) {
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
                    <div className="flex justify-end">
                        <Link
                            href="/dashboard/rooms/create"
                            className="rounded-md bg-white px-4 py-2 hover:bg-gray-200 dark:bg-gray-800 dark:text-white"
                        >
                            Nytt rom
                        </Link>
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h3 className="mb-4 dark:text-white">Romoversikt</h3>
                        <table className="w-full">
                            <caption className="sr-only">Romoversikt</caption>
                            <thead>
                                <tr>
                                    <th className="text-start">ID</th>
                                    <th className="text-start">Name</th>
                                    <th className="text-start">Lokasjon</th>
                                    <th className="text-start">Synk.</th>
                                    <th className="text-start">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room.id}>
                                        <td>{room.id}</td>
                                        <td>{room.name}</td>
                                        <td>{room.location?.name}</td>
                                        <td>
                                            {room.service ? (
                                                <span className="text-green-500">
                                                    Aktiv
                                                </span>
                                            ) : (
                                                <span className="text-yellow-500">
                                                    Inaktiv
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <a
                                                href={`/locations/${room.location?.slug}/room/${room.slug}`}
                                                target="blank"
                                            >
                                                {room.slug}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
