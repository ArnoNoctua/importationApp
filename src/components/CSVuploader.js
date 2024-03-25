import React, { useState } from 'react';
import { uploadCSV } from '../api/ImportateurService'; // Import your API function for uploading CSV
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CSVUploader = () => {
    const [file, setFile] = useState(null);
    const [rowData, setRowData] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

const handleUpload = async () => {
  if (!file) {
    alert("Please select a file to upload");
    return;
  }

  try {
    // Call your API function to upload the CSV file
    const response = await uploadCSV(file);
    console.log(response); // Log the entire response
    console.log(typeof response); // Log the type of response

    // Check if response is an array
    if (Array.isArray(response)) {
      console.log(response); // Log the data

      // Transform the data into the expected format
      const transformedData = response.map(item => {
        const [Nom, Millesime, Pays, Region, Prix, Quantite] = item["Nom;Millesime;Pays;Region;Prix;Quantite"].split(";");
        return { Nom, Millesime, Pays, Region, Prix, Quantite };
      });

      // Set the transformed data to the state
      setRowData(transformedData);
    } else {
      console.error("Invalid response data:", response);
    }
  } catch (error) {
    console.error("Error uploading CSV:", error);
  }
};

    

      const columnDefs = [
        { headerName: 'Nom', field: 'Nom;Millesime;Pays;Region;Prix;Quantite'.split(';')[0] },
        { headerName: 'Millesime', field: 'Nom;Millesime;Pays;Region;Prix;Quantite'.split(';')[1] },
        { headerName: 'Pays', field: 'Nom;Millesime;Pays;Region;Prix;Quantite'.split(';')[2] },
        { headerName: 'Region', field: 'Nom;Millesime;Pays;Region;Prix;Quantite'.split(';')[3] },
        { headerName: 'Prix', field: 'Nom;Millesime;Pays;Region;Prix;Quantite'.split(';')[4] },
        { headerName: 'Quantite', field: 'Nom;Millesime;Pays;Region;Prix;Quantite'.split(';')[5] },
      ];

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <button onClick={handleUpload}>Upload CSV</button>
            <div className="ag-theme-alpine" style={{ width: '100%', minWidth: '1200px', height: '400px' }}>
    <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
    />
</div>

        </div>
    );
};

export default CSVUploader;

