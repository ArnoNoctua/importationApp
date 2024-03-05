import React from 'react'
import { Link } from 'react-router-dom'

const Importateur = ({ importateur }) => {
  return (
    <Link to={`/importateurs/${importateur.id}`} className="importateur__item">
            <div className="importateur__header">
                <div className="importateur__image">
                    <img src={importateur.photoURL} alt={importateur.name}  />
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
  )
}

export default Importateur