import { Button } from '@/components/ui/button'
import React from 'react'
import UploadDialog from './components/UploadDialog'

const ResumeParsing = () => {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <UploadDialog><Button>+ Upload Pdf</Button></UploadDialog>
        </div>
    )
}

export default ResumeParsing