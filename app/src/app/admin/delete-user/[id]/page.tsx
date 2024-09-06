"use client";

import { useEffect, useState } from "react";
import { fetchUserByEmail } from "@/components/server-components/fetch-data";
import { deleteUserByEmail } from "@/components/server-components/delete-data";
const DeleteUserPage = ({ params }: { params: { id: string } }) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            const email = decodeURIComponent(params.id);

            if (email) {
                try {
                    const data = await fetchUserByEmail(email);
                    if (!data) {
                        throw new Error("User data couldn't be fetched.");
                    }
                    setUserName(`${data.name} ${data.lastName}`);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                    setError("User data couldn't be fetched.");
                }
            }
        };

        fetchUser();
    }, [params.id]);

    const handleDelete = async () => {
        const email = decodeURIComponent(params.id);
        if (email) {
            try {
                await deleteUserByEmail(email);
                alert("User deleted successfully!");
                window.location.href = "/admin/users";
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Error deleting user." + error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold">Delete User</h1>
            <div className="my-4">
                <p>Are you sure you want to delete the user: <strong>{userName}</strong>?</p>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteUserPage;
