"use client";

import { useEffect, useState } from "react";
import { User, SaveUserProps } from "@/components/interfaces/data";
import { fetchUserByEmail } from "@/components/server-components/fetch-data";
import { updateUser } from "@/components/server-components/update-data";

const ModifyUserPage = ({params}: {params: {id: string}}) => {
    const [user, setUser] = useState<SaveUserProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            const email = params.id;
            if (email) {
                try {
                    alert();
                    const data = await fetchUserByEmail(email);
                    const userWithPassword: SaveUserProps = {
                        ...data,
                        password: "",
                    };
                    setUser(userWithPassword);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        if (newPassword && newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const updatedUser = { ...user, password: newPassword || user.password };
            await updateUser(updatedUser, decodeURIComponent(params.id));
            alert("User updated successfully!");
            window.location.href = "/admin/users";
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Error updating user." + error);
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
           {user && (
                <form onSubmit={handleSubmit}>
                    {/* Form fields for user details */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={user.phoneNumber}
                            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={user.address}
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={user.city}
                            onChange={(e) => setUser({ ...user, city: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                            Country
                        </label>
                        <input
                            type="text"
                            id="country"
                            value={user.country}
                            onChange={(e) => setUser({ ...user, country: e.target.value })}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default ModifyUserPage;
