import React from 'react'
import Sidebar from '../components/Sidebar'

export default function Order() {
    return (
        <div className="h-full w-full bg-white flex">
            <Sidebar />
            <div className="border-l-2 h-full w-full border-t-[1.3px]">
                <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                    <h2 className="text-2xl font-bold mb-4">Orders</h2>
                </div>
            </div>
        </div>
    )
}
