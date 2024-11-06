
'use client';

import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
import Breadcrumb from '../components/Breadcrumb';

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
     
      setSidebarOpen(!sidebarOpen);
    } else {
   
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Data User', href: '/' },
  ];

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">

          <nav className="bg-gray-900 text-white px-6 py-4 fixed w-full top-0 z-50">
            <div className="flex justify-between items-center md:justify-start">
              <h1 className="text-lg font-bold">Amanah</h1>
              <div className="flex items-center space-x-4 md:mx-40">
                <button
                  className="hidden md:flex text-white"
                  onClick={toggleSidebar}
                >
                  {sidebarCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                </button>
                <Breadcrumb items={breadcrumbItems} />
                <button
                  className="text-white md:hidden"
                  onClick={toggleSidebar}
                >
                  <GiHamburgerMenu />
                </button>
              </div>
            </div>
          </nav>

          <div className="flex flex-1 bg-gray-100">
            <aside
              className={`fixed  bg-gray-900 text-white inset-y-0 left-0  transition-all duration-300 transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } md:translate-x-0 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}          
            >
              <div className="p-4 px-6 pt-16">
                <h4 className={`text-base font-normal mb-6 ${sidebarCollapsed ? 'hidden' : ''}`}>
                  Amanah Elements
                </h4>
                <nav>
                  <ul>
                    <li className="mb-2">
                      <Link href="/" className={`block py-2 px-4 rounded hover:bg-gray-700 ${sidebarCollapsed ? 'hidden' : ''}`}>
                        Data User 
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </aside>

            <main className={`flex-1 p-6 ${sidebarCollapsed ? 'ml-auto md:ml-16 py-16' : 'ml-auto md:ml-64 py-16'}`}>
              {children}
            </main>
          </div>

          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 md:hidden"
              onClick={toggleSidebar}
            />
          )}
        </div>
      </body>
    </html>
  );
}
