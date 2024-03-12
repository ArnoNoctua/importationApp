import React from 'react';
import Importateur from './Importateur';

const ImportateurList = ({ data, currentPage, getAllImportateurs }) => {
  return (
    <main className='main'>
      {data?.content?.length === 0 && <div>Aucuns importateurs. Ajouter un nouvel importateur.</div>}

      <ul className='importateur__list'>
        {data?.content?.length > 0 && data.content.map((importateur) => (
          <Importateur
            importateur={importateur}
            key={importateur.id}
            getAllImportateurs={getAllImportateurs}
          />
        ))}
      </ul>

      {data?.content?.length > 0 && data?.totalPages > 1 &&
      <div className='pagination'>
          <button onClick={() => getAllImportateurs(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</button>

          { data && [...Array(data.totalPages).keys()].map((page, index) => 
              <button onClick={() => getAllImportateurs(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</button>)}


          <button onClick={() => getAllImportateurs(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</button>
      </div>            
      }

    </main>
  )
};

export default ImportateurList;