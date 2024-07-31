import Link from "next/link";
import React from "react";
import "../styles/globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="ko">
      <head>
        <title>Sample Next App</title>
      </head>
      <body>
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-white via-gray-100 to-gray-200 text-white">
          <header className="flex justify-between items-center p-4 bg-opacity-40 bg-gray-800 shadow-lg">
            <h1 className="text-2xl font-bold">Task Selector</h1>
            <nav className="absolute top-4 right-4 md:relative md:top-auto md:right-auto">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow flex justify-center items-center">{children}</main>
          <footer className="p-4 bg-opacity-40 bg-gray-800 text-center">
            <p>&copy; 2024 Task Selector. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
