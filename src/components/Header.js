import React from 'react'

const Header = ({ toggleModal, nbOfImportateurs, handleLogout }) => {
  return (
    <header className='header'>
        <div className='container'>
            <h3>Liste d'importateurs ({nbOfImportateurs})</h3>
            <button onClick={handleLogout} className='btn btn-danger'>Déconnexion</button>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i className='bi bi-plus-square'></i> Ajouter un nouvel importateur
            </button>
        </div>
    </header>
  )
}

export default Header