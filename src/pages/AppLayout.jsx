import React from 'react';
// import AppNav from '../components/AppNav';
import styles from './AppLayout.module.css';
import SideBar from '../components/SideBar';
import Map from '../components/Map';

const AppLayout = () => {
    return (
       
        <div className={styles.app}>
            <SideBar />
            <Map />
        </div>
        
  
    );
};

export default AppLayout;