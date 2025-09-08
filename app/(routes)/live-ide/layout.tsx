import React from 'react';
import Navbar from '@/liveidecomponents/Navbar';
import StreamVideoProvider from '@/components/providers/StreamClientProvider';


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <StreamVideoProvider>
            <Navbar />
            {children}
        </StreamVideoProvider>
    );
}
