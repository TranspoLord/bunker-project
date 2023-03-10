import React, { useState } from 'react';
import './App.css';
import GameManager from "./GameManager"
import BunkerManager from "./BunkerManager"
import Home from "./Home"
import PageNotFound from './PageNotFound';
import { Routes, Route } from "react-router";
import CreateBunker from './CreateBunker';
import SnackBarMessage from './SnackBar';


function App() {
  return (
    <div>
      <SnackBarMessage />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/game"} element={<GameManager />} />
        <Route path={"/manage"} element={<BunkerManager />} />
        <Route path={"/manage/create"} element={<CreateBunker isCreatingBunker={true} />} />
        <Route path={"/manage/edit"} element={<CreateBunker isCreatingBunker={false} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App;
