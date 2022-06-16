import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from 'react'
import axios, { Axios } from 'axios';
import ExcelPage from './Page/ExcelPage';
import 'antd/dist/antd.css';

function App() {
  useEffect(() => {
    axios.delete('/api/delete')
  }, [])

  return (
    <div className="App">
        <ExcelPage />
    </div>
  );
}

export default App;
