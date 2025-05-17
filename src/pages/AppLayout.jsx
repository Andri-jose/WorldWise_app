import React from 'react';
// import AppNav from '../components/AppNav';
import styles from './AppLayout.module.css';
import SideBar from '../components/SideBar';
import Map from '../components/Map';
import LogOut from '../components/LogOut';

const AppLayout = () => {
    return (
       
        <div className={styles.app}>
            <SideBar />
            <Map />
            <LogOut />
        </div>
        
  
    );
};

export default AppLayout;