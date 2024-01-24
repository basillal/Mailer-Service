
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Nav } from '../Nav';
import { Header } from '../Header';
import DataTable from 'react-data-table-component';


export const ErrorReport = () => {
    const [data, setData] = useState([]);
    const [filterData, setfilterData] = useState(data)
    const [filter, setfilter] = useState(false)
    const [columns, setcolumns] = useState(null);
    const [Loading, setLoading] = useState(true)
  
    useEffect(()=>{
      fetchReportData();
    },[]);

    const fetchReportData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/get_FailedReportData");
          setData(response.data.data);
          const columnData = Object.keys(response.data.data[0]).map((keyName) => (
            {
              name:keyName,
              selector:(row) => row[keyName],
              sortable: true
            }
          ))
          setcolumns(columnData)
          setLoading(false)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };  
      
      function handleFilter(event){
        debugger
        
        const newData = data.filter(row =>{
          debugger
          return  Object.values(row)[1].includes(event.target.value.toLowerCase());
        })
        setfilterData(newData)
        setfilter(true)

      }
      
    
      if(Loading) return <h1>Loading</h1>
      else return (
        <>
          <Nav></Nav>
          <Header title="Error Report"></Header>
          <div className="report">
            <div className="table-data">             
              <div className='text-end'><input type="text" onChange={handleFilter} /></div>
              <DataTable key={data} title={'Error Reports'} columns={columns} data={filter ? filterData : data} 
              fixedHeader
              pagination
              responsive
              highlightOnHover
              striped
              
              
          
              />
              
            </div>
          </div>
        </>
      );
    };
    