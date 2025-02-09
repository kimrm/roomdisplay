export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface LocationData {
    data: {
        id: string;
        name: string;
        description: string;
        slug: string;
        displayMessage: string;
        bookingsToDay: Booking[];
    };
}

export interface Location {
    id: string;
    slug: string;
    name: string;
    displayMessage: string;
}

export interface Room {
    id: string;
    slug: string;
    name: string;
    displayMessage?: string;
    description?: string;
    service?: string;
    calendarId?: string;
    location?: Location;
}

export interface RoomResponse {
    data: Room;
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
