import Clock from "@/Components/Clock";
import LocationLayout from "@/Layouts/LocationLayout";
import { Location } from "@/types";
import { Head } from "@inertiajs/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import OverviewItem from "./OverviewItem";

interface LocationPageProps {
    location: Location;
}

export default function LocationPage({ location }: LocationPageProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [bookingsPerPage, setBookingsPerPage] = useState(0);
    const [bookings, setBookings] = useState(location.data.bookingsToDay);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        setBookingsPerPage(Math.floor(window.innerHeight / 100) || 1);
    }, []);

    useEffect(() => {
        if (bookingsPerPage > 0) {
            const totalPages = Math.ceil(
                location.data.bookingsToDay.length / bookingsPerPage,
            );
            setPages(Array.from({ length: totalPages }));
            const timer = setInterval(() => {
                setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
            }, 20000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [currentPage, bookings, bookingsPerPage, location]);

    useEffect(() => {
        const updatedVisibleBookings = location.data.bookingsToDay.slice(
            currentPage * bookingsPerPage,
            (currentPage + 1) * bookingsPerPage,
        );
        setBookings(updatedVisibleBookings);
    }, [location, bookingsPerPage, currentPage]);

    return (
        <LocationLayout>
            <Head title={`Romoversikt ${import.meta.env.VITE_VENUE_NAME}`} />
            <div id="content" className="h-screen bg-black p-10 text-white">
                <div className="mb-5 flex justify-between">
                    <h1 className="text-4xl font-extrabold">
                        {import.meta.env.VITE_VENUE_NAME} - {location.data.name}
                    </h1>
                    <Clock className="rounded bg-slate-50 p-4 text-4xl text-slate-950" />
                </div>
                {bookings && (
                    <div>
                        <ul id="bookings">
                            {bookings.map((booking, index) => (
                                <OverviewItem
                                    key={booking.id}
                                    booking={booking}
                                    index={index}
                                />
                            ))}
                        </ul>
                        {pages.length > 1 && (
                            <div
                                id="progress"
                                className="flex w-2/3 items-center justify-center gap-10 place-self-center"
                            >
                                {pages.map((_, index) => (
                                    <div
                                        key={index}
                                        className="relative mt-4 h-[4px] w-full overflow-hidden rounded-md bg-green-950"
                                    >
                                        <motion.div
                                            className="absolute left-0 top-0 h-full w-full bg-green-400"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width:
                                                    index === currentPage
                                                        ? "100%"
                                                        : 0,
                                            }}
                                            transition={
                                                index === currentPage
                                                    ? {
                                                          duration: 20,
                                                          ease: "linear",
                                                      }
                                                    : { duration: 0 }
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </LocationLayout>
    );
}
