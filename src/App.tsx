import React, { useState } from 'react';
import './App.css';
import GameManager from './Screens/Game/GameManager';
import BunkerManager from './Services/LevelCreation/BunkerManager';
import GameSettings from './Screens/Game/GameSettings';
import Home from './Screens/Home';
import {PageNotFound} from './Screens/PageNotFound';
import { Routes, Route } from "react-router";
import CreateBunker from './Services/LevelCreation/CreateBunker';
import SnackBarMessage from './Services/SnackBar/SnackBar';
import BunkerChoice from './Screens/Game/BunkerChoice';
import ReportingHome from './Screens/Reporting/ReportingHome';
import DevLog from './Screens/Reporting/DevLog';
import GPTTesting from './Screens/GPTTesting';


function App() {
  return (
    <div>
      <SnackBarMessage />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/GPTTesting"} element={<GPTTesting />} />
        <Route path={"/Reporting"} element={<ReportingHome />} />
        <Route path={"/Reporting/DevLog"} element={<DevLog />} />
        <Route path={"/game"} element={<GameSettings />} />
        <Route path={"/game/:name"} element={<GameManager />} />
        <Route path={"/bunkerchoice"} element={<BunkerChoice />} />
        <Route path={"/gameSettings/:name"} element={<GameSettings />} />
        <Route path={"/manage"} element={<BunkerManager />} />
        <Route path={"/manage/create"} element={<CreateBunker isCreatingBunker={true} />} />
        <Route path={"/manage/edit/:name"} element={<CreateBunker isCreatingBunker={false} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
} 

export default App;
