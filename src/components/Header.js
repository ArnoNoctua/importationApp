import React from 'react'

const Header = ({ toggleModal, nbOfImportateurs }) => {
  return (
    <header className='header'>
        <div className='container'>
            <h3>Liste d'importateurs ({nbOfImportateurs})</h3>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i className='bi bi-plus-square'></i> Ajouter un nouvel importateur
            </button>
        </div>
    </header>
  )
}

export default Header