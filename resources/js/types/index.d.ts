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

export interface CustomersPaginate {
    data: Customer[];
    meta: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        from: number;
        to: number;
    };
    links: {
        first: string;
        last: string;
        next: string;
        prev: string;
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
    sync_identifier?: string;
    customer?: Customer;
}

export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    contactName?: string;
    orgNr?: string;
    notes?: string;
}

export interface CustomerResponse {
    data: Customer;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
