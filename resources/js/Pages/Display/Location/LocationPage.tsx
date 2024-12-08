import Clock from "@/Components/Clock";
import LocationLayout from "@/Layouts/LocationLayout";
import { Location } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import OverviewItem from "./OverviewItem";
import Progressbar from "./Progressbar";

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
                            <Progressbar
                                pages={pages}
                                currentPage={currentPage}
                            />
                        )}
                    </div>
                )}
            </div>
        </LocationLayout>
    );
}
