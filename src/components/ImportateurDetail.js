import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getImportateur } from '../api/ImportateurService';
import { toast } from 'react-toastify';


const ImportateurDetail = ({ updateImportateur, updateImage }) => {
    const inputRef = useRef();
    const [importateur, setImportateur] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoURL: ''
    });

    const { id } = useParams();

    const fetchImportateur = async (id) => {
        try {
            const { data } = await getImportateur(id);
            setImportateur(data);
            console.log(data);
            //toastSuccess('Importateur trouvé');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const udpatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setImportateur((prev) => ({ ...prev, photoURL: `${prev.photoURL}?updated_at=${new Date().getTime()}` })); //Refresh quand nouvelle photo
            toast.success(' Photo Mise à jour ');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const onChange = (event) => {
        setImportateur({ ...importateur, [event.target.name]: event.target.value });
    };

    const onUpdateImportateur = async (event) => {
        event.preventDefault();
        await updateImportateur(importateur);
        fetchImportateur(id);
        toast.success('Importateur Sauvegardé');
    };

    useEffect(() => {
        fetchImportateur(id);
    }, [id]);

    return (
        <>
            <Link to={'/Importateurs'} className='link'><i className='bi bi-arrow-left'></i> Revenir à la liste</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={importateur.photoURL} alt={`Photo de profile de${importateur.name}`} />
                    <div className='profile__metadata'>
                        <p className='profile__name'>{importateur.name}</p>
                        <p className='profile__muted'>JPG, GIF, ou PNG. Taille max de 10MG</p>
                        <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateImportateur} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={importateur.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Nom</span>
                                    <input type="text" value={importateur.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" value={importateur.email} onChange={onChange} name="email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Téléphone</span>
                                    <input type="text" value={importateur.phone} onChange={onChange} name="phone" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Adresse</span>
                                    <input type="text" value={importateur.address} onChange={onChange} name="address" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Titre</span>
                                    <input type="text" value={importateur.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Status</span>
                                    <input type="text" value={importateur.status} onChange={onChange} name="status" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default ImportateurDetail;