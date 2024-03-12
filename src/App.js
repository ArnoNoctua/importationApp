import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import ImportateurList from './components/ImportateurList';
import { getImportateurs, saveImportateur, udpatePhoto } from './api/ImportateurService';
import { Routes, Route, Navigate } from 'react-router-dom';
import ImportateurDetail from './components/ImportateurDetail';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';

function App() {
  const modalRef = useRef();
  const fileRef = useRef(); //Pour cleaner le form, la ref va éviter les ''cookies''
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
  });

  const getAllImportateurs = async (page = 0, size = 6) => {
    try {
      setCurrentPage(page);
      const { data } = await getImportateurs(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };


  const handleNewImportateur = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveImportateur(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoURL } = await udpatePhoto(formData); //data: photoUrl pour pas clash avec le form data de base
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
      })
      getAllImportateurs();
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  const updateImportateur = async (importateur) => {
    try {
      const { data } = await saveImportateur(importateur);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoURL } = await udpatePhoto(formData);
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllImportateurs();
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    localStorage.removeItem('token');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    //setuserData(initialState) reset les username '' ou email '' pour ne pas laisser de place dans les forms?
  };
  
  return (
    <>
      {!loggedIn && <Login onLogin={handleLogin} />} {/* Show login form if not logged in */}
      {loggedIn && (
        <>
          <Header toggleModal={toggleModal} nbOfImportateurs={data.totalElements} handleLogout={handleLogout} />
          <main className='main'>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Navigate to={'/importateurs'} />} />
                <Route path="/importateurs" element={<ImportateurList data={data} currentPage={currentPage} getAllImportateurs={getAllImportateurs} />} />
                <Route path="/importateurs/:id" element={<ImportateurDetail updateImportateur={updateImportateur} updateImage={updateImage} />} />
              </Routes>
            </div>
          </main>
  
          {/* Modal */}
          <dialog ref={modalRef} className="modal" id="modal">
            <div className="modal__header">
              <h3>Nouvel Importateur</h3>
              <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
            </div>
            <div className="divider"></div>
            <div className="modal__body">
              <form onSubmit={handleNewImportateur}>
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Nom</span>
                    <input type="text" value={values.name} onChange={onChange} name='name' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Email</span>
                    <input type="text" value={values.email} onChange={onChange} name='email' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Titre</span>
                    <input type="text" value={values.title} onChange={onChange} name='title' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Numéro de téléphone</span>
                    <input type="text" value={values.phone} onChange={onChange} name='phone' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Adresse</span>
                    <input type="text" value={values.address} onChange={onChange} name='address' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Status d'importation</span>
                    <input type="text" value={values.status} onChange={onChange} name='status' required />
                  </div>
                  <div className="file-input">
                    <span className="details">Photo</span>
                    <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
                  </div>
                </div>
                <div className="form_footer">
                  <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Fermer</button>
                  <button type='submit' className="btn">Sauvegarder</button>
                </div>
              </form>
            </div>
          </dialog>
          <ToastContainer
            className="toast-position"
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      )}
    </>
  );
}

export default App;
