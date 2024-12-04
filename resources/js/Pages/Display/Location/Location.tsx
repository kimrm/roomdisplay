import Clock from "@/Components/Clock";
import LocationLayout from "@/Layouts/LocationLayout";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface ILocation {
    data: {
        id: string;
        name: string;
        displayMessage: string;
        bookings: IBooking[];
    };
}

interface IRoom {
    id: string;
    name: string;
}

interface IBooking {
    id: string;
    name: string;
    start: string;
    end: string;
    room: IRoom;
}

interface ILocationProps {
    location: ILocation;
}

function ListItem({ booking, index }: { booking: IBooking; index: number }) {
    return (
        <motion.li
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-1 grid grid-cols-3 gap-1 rounded-md text-2xl tracking-wide text-slate-300"
        >
            <div
                className={`${
                    index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                } rounded-l-lg p-6 font-bold text-slate-200`}
            >
                {booking.name}
            </div>
            {new Date(booking.start).getHours() === 0 &&
            new Date(booking.end).getHours() === 0 ? (
                <div
                    className={`${index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"} p-6 font-mono`}
                >
                    Hele dagen
                </div>
            ) : (
                <div
                    className={`${index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"} p-6 font-mono`}
                >
                    {new Date(booking.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(booking.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            )}

            <div
                className={`${
                    index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                } rounded-r-lg p-6`}
            >
                {booking.room.name}
            </div>
        </motion.li>
    );
}

export default function Location({ location }: ILocationProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [bookingsPerPage, setBookingsPerPage] = useState(0);
    const [bookings, setBookings] = useState(location.data.bookings);

    useEffect(() => {
        setBookingsPerPage(Math.floor(window.innerHeight / 100) || 1);
    }, []);

    useEffect(() => {
        if (bookingsPerPage > 0) {
            const totalPages = Math.ceil(bookings.length / bookingsPerPage);
            const timer = setInterval(() => {
                setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
            }, 20000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [currentPage, bookings, bookingsPerPage]);

    useEffect(() => {
        const updatedVisibleBookings = location.data.bookings.slice(
            currentPage * bookingsPerPage,
            (currentPage + 1) * bookingsPerPage,
        );
        setBookings(updatedVisibleBookings);
    }, [location, bookingsPerPage, currentPage]);

    return (
        <LocationLayout>
            <div id="content" className="h-screen bg-black p-10 text-white">
                <div className="mb-5 flex justify-between">
                    <h1 className="text-4xl font-extrabold">
                        {import.meta.env.VITE_VENUE_NAME} - {location.data.name}
                    </h1>
                    <Clock className="rounded bg-slate-50 p-4 text-4xl text-slate-950" />
                </div>
                {bookings && (
                    <div>
                        <ul>
                            {bookings.map((booking, index) => (
                                <ListItem
                                    key={booking.id}
                                    booking={booking}
                                    index={index}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </LocationLayout>
    );
}
