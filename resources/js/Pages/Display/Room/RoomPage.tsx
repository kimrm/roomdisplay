import RoomLayout from "@/Layouts/RoomLayout";

export default function RoomPage() {
    const room = {
        name: "Room 1",
    };

    const booking = {};

    const date = new Date().toLocaleString("no-NO", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <RoomLayout>
            <div className="flex flex-row">
                <div
                    id="occupied"
                    className="h-screen w-12 bg-green-500 md:w-24"
                ></div>
                <div className="flex h-screen w-screen flex-col justify-between">
                    <header>
                        <div className="m-6 flex flex-row items-baseline justify-between align-middle text-gray-300">
                            <h1 className="mb-3 mt-3 inline-block align-middle font-sans text-5xl">
                                <span className="ml-6 font-bold uppercase">
                                    {" "}
                                    {room.name}
                                </span>
                            </h1>
                            <div className="flex flex-row items-baseline space-x-3">
                                <span className="sm:bloc align-middle text-4xl font-bold">
                                    {date}
                                </span>
                                <span>
                                    <div
                                        className="hidden align-middle text-4xl font-bold sm:block"
                                        id="clock"
                                    >
                                        {date}
                                    </div>
                                </span>
                            </div>
                        </div>
                    </header>
                    <main className="mb-auto">
                        <div id="events_container">
                            {booking ? (
                                <div id="available" className="px-12">
                                    <div className="inline-block border-b-2">
                                        <span className="text-3xl font-bold tracking-wider text-gray-400">
                                            VELKOMMEN
                                        </span>
                                    </div>
                                    <div>
                                        <p className="mb-2 mt-4 text-6xl text-gray-200">
                                            BOOKING NAVN
                                        </p>
                                    </div>
                                    <div className="text-4xl tracking-widest text-gray-400">
                                        Hele dagen
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="mt-12 px-12 text-6xl font-bold tracking-widest text-white">
                                        LEDIG 🙂
                                    </div>
                                    <p className="mt-12 w-2/3 px-12 text-gray-200">
                                        Studenter kan fritt benytte rommet, men
                                        vær oppmerksom på at andre kan ha
                                        reservert rommet for et senere tidspunkt
                                        i dag.
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                    <footer>
                        <div id="bookings" className="p-12 text-gray-300">
                            {booking ? (
                                <div>
                                    <div className="mb-4 text-xl font-bold tracking-tight text-gray-500">
                                        KOMMENDE ARRANGEMENT
                                    </div>
                                    <div className="space-y-2 text-xl">
                                        <div className="grid grid-cols-2">
                                            <div>BOOKING NAME</div>
                                            <div>08:00 - 10:00</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    Kontakt Studiesenteret Midt-Troms for leie
                                    av rom
                                </div>
                            )}
                        </div>
                    </footer>
                </div>
            </div>
        </RoomLayout>
    );
}
