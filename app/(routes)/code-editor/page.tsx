// IDE page component
import React from 'react'
import EditorPanel from './components/EditorPanel'
import OutputPanel from './components/OutputPanel'
import Header from './components/Header'

const IDE = () => {
    return (
        <div className='h-full w-full'>
            <div className='max-w-[1800px] mx-auto p-4'>
                <Header />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <EditorPanel />
                    <OutputPanel />
                </div>
            </div>
        </div>
    )
}

export default IDE