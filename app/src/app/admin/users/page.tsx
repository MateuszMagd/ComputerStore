"use client"

import UserInfoRow from "@/components/admin-components/user-info-row";
import { User } from "@/components/interfaces/data";
import { fetchAllUsers } from "@/components/server-components/fetch-data";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const data = await fetchAllUsers();
                setIsLoading(false)
                setUsers(data);
            } catch (error) {
                console.log(error);
                setIsLoading(false)
                setError("User Data couldn't be fetched.");
            }
        };

        fetchUsers();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="flex flex-row justify-center min-h-screen">{error}</div>;
    }

    const handleDelete = (email: string) => {
        window.location.href = `/admin/delete-user/${email}`;
    };

    const handleModify = (email: string) => {
        window.location.href = `/admin/modify-user/${email}`;
    };

    return (
        <div className="container mx-auto">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <UserInfoRow 
                            key={index} 
                            user={user} 
                            onDelete={() => handleDelete(user.email)}
                            onModify={() => handleModify(user.email)}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr className="mt-10">
                        <td colSpan={8}>
                            <Link
                                className="flex justify-center w-full p-2 bg-green-500 text-white"
                                href="/admin/add-new-user"
                            >
                                Add New User
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default UsersPage;