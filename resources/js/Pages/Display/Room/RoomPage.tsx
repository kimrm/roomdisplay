import { useEffect, useState } from "react";
import Clock from "@/Components/Clock";
import RoomLayout from "@/Layouts/RoomLayout";
import { Booking, Room, Location } from "@/types";

export default function RoomPage(props: props) {
    const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
    const [bookingsToCome, setBookingsToCome] = useState<Booking[]>([]);
    const [room, setRoom] = useState<Room | null>(null);

    useEffect(() => {
        setRoom(props.room?.data || null);
    }, [props.room]);

    useEffect(() => {
        const now = new Date();
        const currentBooking = props.bookings?.find((booking) => {
            const start = new Date(booking.start);
            const end = new Date(booking.end);
            return start <= now && now <= end;
        });
        const currentBookingWithFormattedDates = currentBooking
            ? {
                  ...currentBooking,
                  start: new Date(currentBooking.start).toLocaleTimeString(
                      "no-NO",
                      {
                          hour: "numeric",
                          minute: "numeric",
                      },
                  ),
                  end: new Date(currentBooking.end).toLocaleTimeString(
                      "no-NO",
                      {
                          hour: "numeric",
                          minute: "numeric",
                      },
                  ),
              }
            : null;
        setCurrentBooking(currentBookingWithFormattedDates || null);
    }, [props.bookings]);

    useEffect(() => {
        const now = new Date();
        const bookingsToCome = props.bookings?.filter((booking) => {
            const start = new Date(booking.start);
            return start > now;
        });
        const bookingsToComeWithFormattedDates = bookingsToCome?.map(
            (booking) => {
                const start = new Date(booking.start).toLocaleTimeString(
                    "no-NO",
                    {
                        hour: "numeric",
                        minute: "numeric",
                    },
                );
                const end = new Date(booking.end).toLocaleTimeString("no-NO", {
                    hour: "numeric",
                    minute: "numeric",
                });
                return { ...booking, start, end };
            },
        );
        setBookingsToCome(bookingsToComeWithFormattedDates || []);
    }, [props.bookings]);

    const date = new Date().toLocaleString("no-NO", {
        day: "numeric",
        month: "short",
    });

    return (
        <RoomLayout>
            <div className="flex flex-row bg-black">
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
                                    {room?.name}
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
                                        <Clock />
                                    </div>
                                </span>
                            </div>
                        </div>
                    </header>
                    <main className="mb-auto">
                        <div id="events_container">
                            {currentBooking ? (
                                <div id="available" className="px-12">
                                    <div className="inline-block border-b-2">
                                        <span className="text-3xl font-bold tracking-wider text-gray-400">
                                            VELKOMMEN
                                        </span>
                                    </div>
                                    <div>
                                        <p className="mb-2 mt-4 text-6xl text-gray-200">
                                            {currentBooking?.name}
                                        </p>
                                    </div>
                                    <div className="text-4xl tracking-widest text-gray-400">
                                        {currentBooking?.start} -{" "}
                                        {currentBooking?.end}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="mt-12 px-12 text-6xl font-bold tracking-widest text-white">
                                        Rom er ledig
                                    </div>
                                    <p className="mt-12 w-2/3 px-12 text-gray-200">
                                        {room?.displayMessage}
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                    <footer>
                        <div id="bookings" className="p-12 text-gray-300">
                            {bookingsToCome.length > 0 ? (
                                <div>
                                    <div className="mb-4 text-xl font-bold tracking-tight text-gray-500">
                                        KOMMENDE ARRANGEMENT
                                    </div>
                                    <div className="space-y-2 text-xl">
                                        {bookingsToCome.map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="grid grid-cols-2"
                                            >
                                                <div>{booking.name}</div>
                                                <div>
                                                    {booking.start} -{" "}
                                                    {booking.end}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    Kontakt {import.meta.env.VITE_VENUE_NAME}{" "}
                                    for leie av rom
                                </div>
                            )}
                        </div>
                    </footer>
                </div>
            </div>
        </RoomLayout>
    );
}

type props = {
    location?: Location;
    room?: {
        data: Room;
    };
    bookings?: Booking[];
};
