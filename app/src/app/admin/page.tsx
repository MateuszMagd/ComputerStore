"use client"

import { fetchIsUserAdmin } from "@/components/server-components/fetch-data";
import { clearToken } from "@/components/server-components/logger-handler";
import { useEffect, useState } from "react";

const AdminPage = () => {
    useEffect(() => {
        const checkIfAdmin = async () => {
            try {
                const responseData = await fetchIsUserAdmin();
                if (!responseData) {
                    clearToken();
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Error checking if user is admin:", error);
                clearToken();
                window.location.href = "/login";
            }
        };
        checkIfAdmin();
    }, []);


    return (
        <div className="min-h-screen">
            There should be a admin page...
        </div>
    )
}

export default AdminPage;