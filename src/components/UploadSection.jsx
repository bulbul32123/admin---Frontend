import React from 'react';

const UploadSection = ({ imageInputRef }) => {
    return (
        <div className="flex space-x-2">
            {Array(1).fill(0).map((_, index) => (
                <div key={index}>
                    <label htmlFor={`image${index}`}>
                        <img src="/uploadimg.png" className='w-20 cursor-pointer' alt="Upload Field" />
                    </label>
                    <input type="file" name="image" ref={imageInputRef} accept="image/*" id={`image${index}`} />
                </div>
            ))}
        </div>
    );
};

export default UploadSection;