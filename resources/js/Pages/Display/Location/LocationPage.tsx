import Clock from "@/Components/Clock";
import LocationLayout from "@/Layouts/LocationLayout";
import { Booking, LocationData } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import BookingsList from "./BookingsList";
import Progressbar from "./Progressbar";

interface LocationPageProps {
    location: LocationData;
}

export default function LocationPage({ location }: LocationPageProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [bookingsPerPage, setBookingsPerPage] = useState(1);
    const [locationData, setLocationData] = useState(location.data);
    const [visibleBookings, setVisibleBookings] = useState<Booking[]>([]);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        setBookingsPerPage(Math.floor(window.innerHeight / 100) || 1);
    }, []);

    useEffect(() => {
        // TODO: problem. the interval gets reset if the locationData changes. needs refactoring.
        const totalPages =
            Math.ceil(locationData.bookingsToDay.length / bookingsPerPage) + 1;
        setPages(Array.from({ length: totalPages }));
        const timer = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
        }, 20000);

        return () => {
            clearInterval(timer);
        };
    }, [locationData.bookingsToDay.length, bookingsPerPage]);

    useEffect(() => {
        console.log("Current page: ", currentPage);
    }, [currentPage]);

    useEffect(() => {
        const fetchLocation = async () => {
            const response = await fetch("/api/locations/" + location.data.id);
            const data = await response.json();
            setLocationData(data);
        };
        const interval = setInterval(() => {
            fetchLocation();
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, [location.data.id]);

    useEffect(() => {
        const updatedVisibleBookings = locationData.bookingsToDay.slice(
            currentPage * bookingsPerPage,
            (currentPage + 1) * bookingsPerPage,
        );
        setVisibleBookings(updatedVisibleBookings);
    }, [locationData.bookingsToDay, currentPage, bookingsPerPage]);

    return (
        <LocationLayout>
            <Head title={`Romoversikt ${import.meta.env.VITE_VENUE_NAME}`} />
            <div
                id="content"
                className="flex h-screen flex-col justify-between bg-black p-10 text-white"
            >
                <div className="mb-5 flex justify-between">
                    <h1 className="text-4xl font-extrabold">
                        {import.meta.env.VITE_VENUE_NAME} - {locationData.name}
                    </h1>
                    <Clock className="rounded bg-slate-50 p-4 text-4xl text-slate-950" />
                </div>
                {visibleBookings && visibleBookings.length > 0 ? (
                    <BookingsList bookings={visibleBookings} />
                ) : (
                    <p className="text-6xl font-extrabold">
                        {locationData.displayMessage}
                    </p>
                )}
                {pages.length > 1 && (
                    <Progressbar pages={pages} currentPage={currentPage} />
                )}
            </div>
        </LocationLayout>
    );
}
