"use client"

import { useState } from "react";
import { SaveUserProps, User } from "@/components/interfaces/data";
import Link from "next/link";
import { saveNewUser } from "@/components/server-components/save-data";


const AddUserForm = () => {
    const [user, setUser] = useState<User>({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
    });

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const newUser: SaveUserProps = {
            ...user,
            password,
        };
        console.log(newUser);
        try {
            await saveNewUser(newUser);
            alert("User added successfully!");
            window.location.href="/admin/users";
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Error adding user: " + error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 border rounded shadow-lg">
            <h2 className="text-lg font-bold">Add New User</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label>City:</label>
                <input
                    type="text"
                    name="city"
                    value={user.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label>Country:</label>
                <input
                    type="text"
                    name="country"
                    value={user.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Submit and Cancel buttons */}
            <div className="flex justify-between">
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Add User
                </button>
                <Link type="button" href="/admin/users" className="p-2 bg-gray-500 text-white rounded">
                    Cancel
                </Link>
            </div>
        </form>
    );
};

export default AddUserForm;
