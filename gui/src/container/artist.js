import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function ArtistContainer({route,navigate}){
    const location = useLocation();
    const [artist, setArtist] = useState("")
    const [dateTours, setDateTours] = useState([])
    
    useEffect(()=> {
        fetchData();
    },[])

    const [columnDefs] = useState([
        { field: 'ARTIST' },
        { field: 'DATE' },
        { field: 'TITLE' },
        { field: 'VENUE' },
        { field: 'LOCATION' },
    ]);

    const gridOptions = {
        defaultColDef: {
          resizable: true,
          sortable:true
        },
        columnDefs: columnDefs,
        rowData: null,
    };

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
      }

    const fetchData = () => {
        axios.get("/api/getToursByArtist", {params: {artist: location.state.artist}}).then(results => {
            const data = _.get(results, "data", {})
            setDateTours(data)
        })
    }

    return (
        <div className="container">
            <h1>{location.state.artist}</h1>
            <div className="grid">
                <div className="ag-theme-alpine" style={{height: "60vh", width: "100%"}}>
                    <AgGridReact
                        rowData={dateTours}
                        gridOptions={gridOptions}
                        onFirstDataRendered={onFirstDataRendered} >
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}

export default ArtistContainer;