import React, { useState } from 'react';
import GameManager from './Screens/Game/GameManager';
import BunkerManager from './Screens/LevelManagement/LevelManager';
import GameSettings from './Screens/Game/GameSettings';
import Home from './Screens/Pages/Home';
import {PageNotFound} from './Screens/Pages/PageNotFound';
import { Routes, Route } from "react-router";
import CreateBunker from './Services/LevelManagement/CreateBunker';
import SnackBarMessage from './Services/SnackBar/SnackBar';
import BunkerChoice from './Screens/Game/BunkerChoice';
import ReportingHome from './Screens/Reporting/ReportingHome';
import DevLog from './Screens/Reporting/DevLog';
import GPTTesting from './Screens/GPT/GPTTesting';
import AppSettings from './Screens/Pages/AppSettings';
import CreateLevel from './Screens/LevelManagement/LevelCreation/CreateLevel';

function App() {
  return (
    <div>
      <SnackBarMessage />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/GPTTesting"} element={<GPTTesting />} />
        <Route path={"/AppSettings"} element={<AppSettings />} />
        <Route path={"/Reporting"} element={<ReportingHome />} />
        <Route path={"/Reporting/DevLog"} element={<DevLog />} />
        <Route path={"/game"} element={<GameSettings />} />
        <Route path={"/game/:name"} element={<GameManager />} />
        <Route path={"/bunkerchoice"} element={<BunkerChoice />} />
        <Route path={"/gameSettings/:name"} element={<GameSettings />} />
        <Route path={"/manage"} element={<BunkerManager />} />
        <Route path={"/manage/create"} element={<CreateBunker isCreatingBunker={true} />} />
        <Route path={"/manage/CreateLevel"} element={<CreateLevel isCreatingBunker={true}/>} />
        <Route path={"/manage/edit/:name"} element={<CreateBunker isCreatingBunker={false} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
} 

export default App;
