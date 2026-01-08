import { useState } from 'react';

export default function Upload(){
    const [name, setName] = useState("");
    const [category, setCategory] = useState("pilsēta")
    const [picture, setPicture] = useState<File|null>(null);

    const handlePictureChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files && e.target.files.length>0){
            setPicture(e.target.files[0]);
        }
    }

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();

        if(!picture){
            alert("Pievienojiet attēlu!")
        }
        else if(!picture.type.startsWith("image/")){
            alert("Pievienotais fails nav attēls!")
        }
        else{
            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category)
            formData.append("picture", picture);


            const res = await fetch('api/upload', {
                method: 'POST',
                body: formData
            });
            if(res.status!=200){
                alert("Notikusi kļūda");
            }
            else{
                const data = await res.json();
                console.log(data);
                alert(data.name+" added")
            }
        }
    }

    return <>
        <div className='stacked'>
            <h1>Upload your files here!</h1>
            <form onSubmit={handleSubmit}>
                <input type = "text" value={name} onChange={e => setName(e.target.value)} placeholder='Enter your name'></input>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="Pilsēta">Pilsēta</option>
                    <option value="Novads">Novads</option>
                </select>
                <input type = "file" onChange={handlePictureChange}></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
        
    </>
}