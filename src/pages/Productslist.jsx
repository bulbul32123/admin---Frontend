import React from 'react'
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Sidebar from '../components/Sidebar';

export default function Productslist({ data, isOpenModel, productDelte }) {

    return (
        <div className="h-full w-full bg-white flex">
            <Sidebar />
            <div className="border-l-2 h-full w-full border-t-[1.3px]">
                <div className="w-[90%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                    <h2 className="text-2xl font-bold mb-4">All Products List</h2>
                    <div className="flex flex-col gap-2 w-full h-full">
                        <div className="max-lg:hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                            <b>Image</b>
                            <b>Name</b>
                            <b>Category</b>
                            <b>Price</b>
                            <b>Actions</b>
                        </div>
                        {data?.map((item) => (
                            <div key={item?._id} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
                                <img src={`/product/${item?.image}`} className='w-12' alt={item?.title} />
                                <p>{item?.title}</p>
                                <p>{item?.category}</p>
                                <p>${item?.price}</p>
                                <p className='text-right md:text-center flex  items-center text-lg'>
                                    <span className='md:hidden cursor-pointer'><MdEdit size={20} /></span>
                                    <span className='max-md:hidden cursor-pointer text-sm font-bold px-1.5 py-1 bg-black text-white' onClick={() => isOpenModel(item)}>Edit</span>
                                    <span className='md:hidden cursor-pointer'><IoClose size={20} /></span>
                                    <span onClick={() => productDelte(item._id)} className='max-md:hidden cursor-pointer text-sm text-red-500 ml-2'>Delete</span>
                                </p>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
