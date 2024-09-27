import React from 'react';
import { FaListCheck } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-[18%] h-full bg-white border-t-[1.3px] flex flex-col">
            <nav className="mt-6 pl-2">
                <ul className="flex flex-col space-y-4">
                    <NavLink to='/admin/product-add' className="px-4 py-2 border-y-[1.5px] border-l-[1.5px] border-red-300  cursor-pointer flex items-center">
                        <span className=" text-sm lg:text-lg flex  items-center"><IoIosAdd size={24} />
                            <span className='max-md:hidden'>Add Item</span></span>
                    </NavLink>
                    <NavLink to='/admin/products-list' className="px-4 py-2 cursor-pointer flex items-center border-y-[1.5px] border-l-[1.5px]  border-red-300 ">
                        <span className="text-sm lg:text-lg flex gap-2 items-center"> <FaListCheck size={18
                        } /> <span className='max-md:hidden'>List Items</span>
                        </span>
                    </NavLink>
                    <NavLink to='/admin/order' className="px-4 py-2 cursor-pointer flex items-center border-y-[1.5px] border-l-[1.5px] border-red-300 ">
                        <span className="text-sm lg:text-lg flex gap-2 items-center"><FaListCheck size={18
                        } />  <span className='max-md:hidden'>Orders</span></span>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
