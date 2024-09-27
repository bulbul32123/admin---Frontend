import React, { useState } from 'react'

export default function UpdateForm({ setopenModel, getAllProducts, item }) {
    const [title, settitle] = useState(item.title);
    const [productDescription, setProductDescription] = useState(item.description);
    const [category, setCategory] = useState(item.category);
    const [productPrice, setProductPrice] = useState(item.price);
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // Use FormData for file uploads

        // Add text fields to formData
        formData.append('title', title);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        formData.append('category', category);

        const imageFile = e.target.elements.image.files[0]; 
        if (imageFile) {
            formData.append('image', imageFile); // Append the file with field name 'image'
        } else {
            setErrorMessage('Please upload an image');
            return;
        }

        // Remove Content-Type header as it will be set automatically for FormData
        const res = await fetch(`http://localhost:8000/admin/update-product/${item._id}`, {
            method: 'PUT',
            body: formData,
        });

        if (res.status === 400) {
            const result = await res.json();
            setErrorMessage(result.message || 'No files uploaded');
        } else if (res.status === 200) {
            const result = await res.json();
            setErrorMessage('');
            settitle('');
            setSuccessMessage(result.message);
            setProductDescription('');
            setProductPrice('');
            setCategory('Men');
        }

        getAllProducts();
        setopenModel(false);
    };
    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                {errorMessage && <div className='py-7 px-4 bg-gray-300 text-red-500 flex gap-4 items-center absolute top-0 left-[40%] text-xl'>{errorMessage} <span className='text-red-500 pl-5 text-sm ' onClick={() => setErrorMessage('')}>X</span></div>}
                {successMessage && <div className='py-7 px-4 bg-gray-300 text-green-500 flex gap-4 items-center absolute top-0 left-[40%] text-xl'>{successMessage} <span className='text-red-500 pl-5 text-sm ' onClick={() => setSuccessMessage('')}>X</span></div>}

                <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Add Product</h2>

                    <form className="space-y-4" onSubmit={handleOnSubmit} encType="multipart/form-data">
                        {/* Drop Image Field */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Upload Image
                            </label>
                            <img src={`/product/${item?.image}`} className='h-14' alt="" />
                            <input
                                type="file"
                                name='image'
                                // value={}
                                accept="image/*"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                            />
                        </div>

                        {/* Title Field */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name='title'
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                placeholder="Enter product title"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        {/* Title Field */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                name='description'
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                placeholder="Enter product description"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>

                        {/* Category Field */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                value={category}
                                name='category'
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>

                        {/* Price Field */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                name='price'
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                placeholder="Enter product price"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setopenModel(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
