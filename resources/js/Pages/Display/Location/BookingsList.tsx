import { Booking } from "@/types";
import OverviewItem from "./OverviewItem";

export default function BookingsList({ bookings }: { bookings: Booking[] }) {
    return (
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
        </div>
    );
}
