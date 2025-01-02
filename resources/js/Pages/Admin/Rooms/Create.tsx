import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Location } from "@/types";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { router } from "@inertiajs/react";

interface Props {
    locations: Location[];
}

export default function RoomsCreate(props: Props) {
    const { locations } = props;
    const [formData, setFormData] = useState({
        location_id: "",
        name: "",
        description: "",
        displayMessage: "",
        sync: "google",
        calendar_id: "",
    });

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(formData);
        router.post("/dashboard/rooms", formData);
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
                        <form onSubmit={handleSubmit}>
                            <div>
                                <select
                                    id="location_id"
                                    name="location_id"
                                    onChange={handleChange}
                                    value={formData.location}
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
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="name">Navn</InputLabel>
                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="description">
                                    Beskrivelse
                                </InputLabel>
                                <TextInput
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="displayMessage">
                                    Visningsmelding
                                </InputLabel>
                                <TextInput
                                    id="displayMessage"
                                    name="displayMessage"
                                    type="text"
                                    value={formData.displayMessage}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <h2>Synkronisering</h2>
                                <label htmlFor="sync">Google Calendar</label>
                                <input
                                    type="radio"
                                    id="sync"
                                    name="sync"
                                    value="google"
                                    checked={true}
                                    readOnly={true}
                                />
                                <label htmlFor="calendar_id">Kalender ID</label>
                                <input
                                    type="text"
                                    id="calendar_id"
                                    name="calendar_id"
                                    value={formData.calendar_id}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-6 space-x-4">
                                <PrimaryButton type="submit">
                                    Lagre
                                </PrimaryButton>
                                <SecondaryButton type="button">
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
