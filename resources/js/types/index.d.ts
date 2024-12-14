export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Location {
    data: {
        id: string;
        name: string;
        displayMessage: string;
        bookingsToDay: Booking[];
    };
}

export interface Room {
    id: string;
    name: string;
}

export interface Booking {
    id: string;
    name: string;
    start: date;
    end: date;
    room: Room;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
