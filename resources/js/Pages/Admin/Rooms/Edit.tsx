import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Location, RoomResponse } from "@/types";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import Select from "@/Components/Select";
import { router, useForm } from "@inertiajs/react";

interface Props {
    roomResponse: RoomResponse;
    locations: Location[];
}

export default function RoomsCreate({ locations, roomResponse }: Props) {
    const { data: room } = roomResponse;

    const { data, setData, patch, processing, errors } = useForm({
        location_id: room.location?.id,
        name: room.name,
        description: room.description,
        display_message: room.displayMessage,
        sync: room.service,
        calendar_id: room.calendarId,
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
        patch("/dashboard/rooms/" + room.id);
    }

    function handleCancel() {
        router.visit("/dashboard/rooms");
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Rom
                </h2>
            }
        >
            <div className="py-12 dark:text-white">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h3 className="mb-4">Rediger {room.name}</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Select
                                    id="location_id"
                                    name="location_id"
                                    defaultValue={data.location_id}
                                    onChange={handleChange}
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
                                </Select>
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
                                <InputLabel htmlFor="display_message">
                                    Visningsmelding
                                </InputLabel>
                                <TextArea
                                    id="display_message"
                                    name="display_message"
                                    value={data.display_message}
                                    onChange={handleChange}
                                    rows={10}
                                />
                            </div>
                            <div className="my-4">
                                <h2 className="mb-2">Synkronisering</h2>
                                <div className="mb-4">
                                    <input
                                        type="radio"
                                        id="off"
                                        name="sync"
                                        value=""
                                        onChange={handleChange}
                                        checked={data.sync === ""}
                                    />
                                    <label htmlFor="off" className="ml-1">
                                        Av
                                    </label>
                                    <input
                                        type="radio"
                                        id="google"
                                        name="sync"
                                        value="google"
                                        onChange={handleChange}
                                        checked={data.sync === "google"}
                                        className="ml-4"
                                    />
                                    <label htmlFor="google" className="ml-1">
                                        Google Calendar
                                    </label>
                                </div>
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
                                    disabled={data.sync !== "google"}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-neutral-800 sm:text-sm"
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
