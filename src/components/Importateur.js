import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteImportateur } from '../api/ImportateurService';
import { toast } from 'react-toastify';

const Importateur = ({ importateur, getAllImportateurs }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = async (callback) => {
        try {
            await deleteImportateur(importateur.id);
            toast.success('Importateur supprimé avec succès');
            // Optionally fetch the list of importateurs again after deletion
            if (callback) {
                await callback();
                // Optionally update the state with the new list of importateurs
                // setImportateurs(updatedImportateurs);
            }
        } catch (error) {
            console.log(error);
            toast.error('Une erreur s\'est produite lors de la suppression de l\'importateur');
        }
    };

    return (
        <div className="importateur__item">
            <Link to={`/importateurs/${importateur.id}`} className="importateur__link">
                <div className="importateur__header">
                    <div className="importateur__image">
                        <img src={importateur.photoURL} alt={importateur.name} />
                    </div>
                    <div className="importateur__details">
                        <p className="importateur_name">{importateur.name.substring(0, 15)} </p>
                        <p className="importateur_title">{importateur.title}</p>
                    </div>
                </div>
                <div className="importateur__body">
                    <p><i className="bi bi-envelope"></i> {importateur.email.substring(0, 20)} </p>
                    <p><i className="bi bi-geo"></i> {importateur.address}</p>
                    <p><i className="bi bi-telephone"></i> {importateur.phone}</p>
                    <p>{importateur.status === 'Actif' ? <i className='bi bi-check-circle'></i> :
                        <i className='bi bi-x-circle'></i>} {importateur.status}</p>
                </div>
            </Link>
            {/* Display delete button */}
            <button onClick={() => setConfirmDelete(true)} className='btn btn-danger'>Supprimer</button>
            {/* Display delete confirmation button only when confirmDelete is true */}
            {confirmDelete && (
                <div className='importateur__actions'>
                    <button onClick={() => handleDelete(getAllImportateurs)} className='btn btn-danger'>Confirmer la suppression</button>
                    <button onClick={() => setConfirmDelete(false)} className='btn btn-secondary'>Annuler</button>
                </div>
            )}
        </div>
    );
}

export default Importateur;