import AdminNav from '@/components/admin-components/admin-nav';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header className='flex flex-row justify-center'>
                <AdminNav />
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}
