import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { Nav } from '../Nav';
// import { Header } from '../Header';

import $ from 'jquery';
import 'datatables.net';


export const SuccesReports = () => {
  const [data, setData] = useState([]);
  const [filter, setfilter] = useState(false)
  const [filterData, setfilterData] = useState([])


  const fetchReportData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get_SuccessReportData");
      setData(response.data.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);


  const searchThroughEmail = (searchString) => {
    debugger
    const filtered = data.filter((payload) =>{ 
        debugger
      if(payload.recipient_email.includes(searchString) === true) return payload
      else if(JSON.parse(payload.body).AppName.includes(searchString) === true) return payload
    })
    setfilter(true)
    setfilterData(filtered)
  }

  const resetFilters = () => {
    setfilter(false)
    setfilterData([])
  }

  const ItemMapper = ({ item }) => {
    return (
      <tr>
        <td>{item.timestamp}</td>
        <td>{item.recipient_email}</td>
        <td>{item.body && JSON.parse(item.body).AppName}</td>
        <td>{item.body && JSON.parse(item.body).AppNo}</td>
        <td>{item.body && JSON.parse(item.body).AppProg}</td>
        <td>{item.body && JSON.parse(item.body).AppRem}</td>
        <td>{item.body && JSON.parse(item.body).Attachment}</td>
      </tr>
    )
  }


  return (
    <>
      {/* <Nav />
      <Header /> */}
      <div className="report">
        <input type="text" onChange={(e) => searchThroughEmail(e.target.value)} />
        <button onClick={resetFilters}>RESET FILTERS</button>
        <table className=" table display" id="exampleTable">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Recipient Email</th>
              <th>AppName</th>
              <th>AppNo</th>
              <th>AppProg</th>
              <th>AppRem</th>
              <th>Attachment</th>
            </tr>
          </thead>
          <tbody key={data}>
            {filter ? filterData.map((item, index) => <ItemMapper item={item} />)
              : data.map((item, index) => <ItemMapper item={item} />)}
          </tbody>
        </table>
      </div>

    </>
  )
}