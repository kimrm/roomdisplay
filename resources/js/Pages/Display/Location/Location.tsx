import LocationLayout from '@/Layouts/LocationLayout';

export default function Location({
    location,
}: {
    location: { id: string; name: string };
}) {
    return <LocationLayout>{location.name} will display here</LocationLayout>;
}
