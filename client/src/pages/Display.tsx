import { useEffect, useState } from 'react';

export default function Display(){
    type Entry = {
        id: number;
        name: string;
        path: string;
    };
    const [images, setImages] = useState<Entry[]>([]);

    useEffect(()=>{
        fetch('api/display', {
                method: 'GET'
            })
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(err => console.error("Error: ", err));
    })
            

    return <>
        <div>
            <h1>List of items</h1>
            <ul>
                {images.map(img => (
                    <div key = {img.id}>
                        <img
                        src={`http://localhost:3001/${img.path}`}
                        alt={img.name}
                        width="100"
                    />
                    <h2>{img.name}</h2>
                    </div>
                    
                ))}
            </ul>
        </div> 
    </>
}