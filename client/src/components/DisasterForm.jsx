import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisasterForm() {
    const [type, setType] = useState('');
    const [place, setPlace] = useState('');
    const [images, setImages] = useState([]);
    useEffect(() => console.log(images), [images])
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setImages(prevImages => [...prevImages, selectedFile]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('type', type);
        formData.append('place', place);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await axios.post('http://localhost:4010/post/disaster', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);

            // Reset form fields after successful submission
            setType('');
            setPlace('');
            setImages([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Type:</label>
                <input type="text" value={type} onChange={e => setType(e.target.value)} /><br />
                <label>Place:</label>
                <input type="text" value={place} onChange={e => setPlace(e.target.value)} /><br />
                <label>Images:</label>
                <input type="file" onChange={handleImageChange} /><br />
                {images.length > 0 && (
                    <button type="button" onClick={() => document.querySelector('input[type="file"]').click()}>
                        Add More
                    </button>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DisasterForm;
