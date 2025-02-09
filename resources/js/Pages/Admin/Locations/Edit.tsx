import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { LocationData } from "@/types";

export default function RoomsCreate({
    location,
}: PageProps<{ location: LocationData }>) {
    const { data, setData, patch, processing, errors } = useForm({
        name: location.data.name,
        description: location.data.description,
        display_message: location.data.displayMessage,
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
        patch(route("locations.update", location.data.id));
    }

    function handleCancel() {
        router.visit("/dashboard/locations");
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Lokasjoner
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h3 className="mb-4 dark:text-white">
                            Rediger lokasjon
                        </h3>
                        <form onSubmit={handleSubmit}>
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
                                <textarea
                                    id="display_message"
                                    name="display_message"
                                    value={data.display_message}
                                    onChange={handleChange}
                                    rows={10}
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
