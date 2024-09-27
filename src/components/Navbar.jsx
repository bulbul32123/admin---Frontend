import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='py-4 pl-2 pr-9 flex justify-between items-center'>
            <h3 className='font-extrabold text-xl'>NodeStore</h3>
            <div className="flex gap-5">
                <ul className='flex gap-3 items-center'>
                    <Link to='/'>Home</Link>
                    <Link to='/admin/product-add'>Add Products</Link>
                </ul>
                <button className='py-2 px-6 rounded-full text-sm font-medium bg-slate-600 text-white'>Logout</button>
            </div>
        </div>
    )
}
