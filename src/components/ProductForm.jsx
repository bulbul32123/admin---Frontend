import React, { useRef, useState } from 'react';
import UploadSection from './UploadSection';
import Sidebar from './Sidebar';


const ProductForm = ({ getAllProducts }) => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('Men');
    const [productPrice, setProductPrice] = useState('');
    const [sizes, setSizes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const imageInputRef = useRef(null);
    const [bestseller, setBestseller] = useState(false);

    const toggleSize = (size) => {
        if (sizes.includes(size)) {
            setSizes(sizes.filter((s) => s !== size));
        } else {
            setSizes([...sizes, size]);
        }
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // Use FormData for file uploads

        // Add text fields to formData
        formData.append('title', productName);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        formData.append('category', category);

        // Add single image to formData
        const imageFile = e.target.elements.image.files[0]; // Get the single image file
        if (imageFile) {
            formData.append('image', imageFile); // Append the file with field name 'image'
        } else {
            setErrorMessage('Please upload an image');
            return;
        }
        console.log(formData);

        const res = await fetch('http://localhost:8000/admin/add-products', {
            method: 'POST',
            body: formData, // Send FormData instead of JSON
        });

        if (res.status === 400) {
            const result = await res.json();
            setErrorMessage(result.message || 'No files uploaded');
        } if (res.status === 200) {
            const result = await res.json();
            setErrorMessage('');
            setProductName('');
            setSuccessMessage(result.message)
            setProductDescription('');
            setProductPrice('');
            setCategory('Men');
            if (imageInputRef.current) {
                imageInputRef.current.value = '';
            }
        }
        getAllProducts()
    };

    return (
        <div className="h-full w-full bg-white flex">
            <Sidebar />
            <div className="border-l-2 h-full w-full border-t-[1.3px]">

                <form onSubmit={handleOnSubmit} encType="multipart/form-data" className="bg-white w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                    {errorMessage && <div className='py-7 px-4 bg-gray-300 text-red-500 flex gap-4 items-center absolute top-0 left-[40%] text-xl'>{errorMessage} <span className='text-red-500 pl-5 text-sm ' onClick={() => setErrorMessage('')}>X</span></div>}
                    {successMessage && <div className='py-7 px-4 bg-gray-300 text-green-500 flex gap-4 items-center absolute top-0 left-[40%] text-xl'>{successMessage} <span className='text-red-500 pl-5 text-sm ' onClick={() => setSuccessMessage('')}>X</span></div>}
                    {/* Upload Image Section */}
                    <UploadSection imageInputRef={imageInputRef} />

                    {/* Product Name */}
                    <div div className="mt-4 w-full" >
                        <label className="block text-gray-700">Product Title</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Type here"
                            name='title'
                            required
                            className="w-full max-w-[500px]  mt-1 p-2 border-2 border-[#c2c2c2] rounded-md outline-[#c586a5]"
                        />
                    </div>

                    {/* Product Description */}
                    <div className="mt-4">
                        <label className="block text-gray-700">Product description</label>
                        <textarea
                            required
                            name='description'
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            placeholder="Write content here"
                            className="w-full max-w-[500px]  mt-1 p-2 border-2 border-[#c2c2c2] rounded-md outline-[#c586a5]"
                        />
                    </div>

                    {/* Product Category */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                        <div className="">
                            <label className="block text-gray-700">Product category</label>
                            <select value={category}
                                name='category'
                                onChange={(e) => setCategory(e.target.value)} className="w-full mt-1 p-2 border-2 border-[#c2c2c2] rounded-md outline-[#c586a5]">
                                <option>Men</option>
                                <option>Women</option>
                                <option>Kids</option>
                            </select>
                        </div>
                        <div className="">
                            <label className="block text-gray-700">Sub category</label>
                            <select disabled className="w-full mt-1 p-2 border-2 border-[#c2c2c2] rounded-md outline-[#c586a5]">
                                <option>Topwear</option>
                                <option>Bottomwear</option>
                                <option>Footwear</option>
                            </select>
                        </div>
                        <div className="">
                            <label className="block text-gray-700">Product Price</label>
                            <input
                                type="number"
                                name='price'
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                className="w-full mt-1 p-2 border-2 border-[#c2c2c2] rounded-md outline-[#c586a5]"
                                placeholder="Price"
                            />
                        </div>
                    </div>

                    {/* Product Sizes */}
                    <div className="mt-4">
                        <label className="block text-gray-700">Product Sizes</label>
                        <div className="flex space-x-2 mt-1">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => toggleSize(size)}
                                    value={sizes}
                                    disabled
                                    name='sizes'
                                    className={`px-3 py-1 border rounded-md ${sizes.includes(size) ? 'bg-gray-200' : ''}`}
                                >

                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Bestseller */}
                    <div className="mt-4 flex items-center space-x-2">
                        <input
                            type="checkbox"
                            disabled
                            checked={bestseller}
                            onChange={(e) => setBestseller(e.target.checked)}
                        />
                        <label className="text-gray-700">Add to bestseller</label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
