import { Booking } from "@/types";
import { motion } from "motion/react";

export default function OverviewItem({
    booking,
    index,
}: {
    booking: Booking;
    index: number;
}) {
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
