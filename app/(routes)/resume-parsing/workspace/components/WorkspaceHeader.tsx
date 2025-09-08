import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WorkspaceHeader = () => {
    return (
        <div className='p-4 flex justify-between shadow-md'>
            <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
            />
            <UserButton />
        </div>

    )
}

export default WorkspaceHeader