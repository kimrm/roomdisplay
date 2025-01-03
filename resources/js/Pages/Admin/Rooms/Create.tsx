import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Location } from "@/types";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";

interface Props {
    locations: Location[];
}

export default function RoomsCreate(props: Props) {
    const { locations } = props;

    const { data, setData, post, processing, errors } = useForm({
        location_id: "",
        name: "",
        description: "",
        displayMessage: "",
        sync: "",
        calendar_id: "",
    });

    function handleChange(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) {
        setData(event.target.name as keyof typeof data, event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post("/dashboard/rooms");
    }

    function handleCancel() {
        router.visit("/dashboard/rooms");
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Opprett rom
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h3 className="mb-4 dark:text-white">
                            Registrer et nytt rom
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <select
                                    id="location_id"
                                    name="location_id"
                                    onChange={handleChange}
                                    value={data.location_id}
                                    className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Velg lokasjon</option>
                                    {locations.map((location) => {
                                        return (
                                            <option
                                                key={location.id}
                                                value={location.id}
                                            >
                                                {location.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.location_id && (
                                    <em className="block text-red-500">
                                        {errors.location_id}
                                    </em>
                                )}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="name">Navn</InputLabel>
                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-1/2"
                                />
                                {errors.name && (
                                    <em className="block text-red-500">
                                        {errors.name}
                                    </em>
                                )}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="description">
                                    Beskrivelse
                                </InputLabel>
                                <TextInput
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={data.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-1/2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="displayMessage">
                                    Visningsmelding
                                </InputLabel>
                                <textarea
                                    id="displayMessage"
                                    name="displayMessage"
                                    value={data.displayMessage}
                                    onChange={handleChange}
                                    rows={10}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mt-4">
                                <h2 className="mb-2">Synkronisering</h2>
                                <InputLabel
                                    htmlFor="sync"
                                    className="mr-2 inline"
                                >
                                    Google Calendar
                                </InputLabel>
                                <Checkbox
                                    id="sync"
                                    name="sync"
                                    value="google"
                                    checked={true}
                                    readOnly={true}
                                    onChange={handleChange}
                                />
                                <InputLabel
                                    htmlFor="calendar_id"
                                    className="mt-2"
                                >
                                    Kalender ID
                                </InputLabel>
                                <TextInput
                                    type="text"
                                    id="calendar_id"
                                    name="calendar_id"
                                    value={data.calendar_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mt-6 space-x-4">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    Lagre
                                </PrimaryButton>
                                <SecondaryButton
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={processing}
                                >
                                    Avbryt
                                </SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
