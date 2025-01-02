import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function BookingsCreate() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Booking
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <p className="dark:text-white">Create Booking</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
