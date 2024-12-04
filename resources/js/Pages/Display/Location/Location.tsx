import LocationLayout from '@/Layouts/LocationLayout';

interface ILocation {
    data: {
        id: string;
        name: string;
        displayMessage: string;
    };
}

interface ILocationProps {
    location: ILocation;
}

export default function Location({ location }: ILocationProps) {
    return (
        <LocationLayout>
            <h1>{location.data.name} will display here</h1>
            <p>{location.data.displayMessage}</p>
        </LocationLayout>
    );
}
