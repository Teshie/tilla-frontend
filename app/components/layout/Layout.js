import React from 'react'
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';

const Layout = ({ children }) => {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 bg-gray-100">
            <div className="bg-white p-4 rounded-lg shadow-md">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  };

export default Layout
