"use client";

import { useEffect, useState, useContext } from "react";
import { TrackingContext } from '../context/Tracking';
import Nav1 from '../components/SVG/Nav1';
import Nav2 from '../components/SVG/Nav2';
import Nav3 from '../components/SVG/Nav3';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, connectWallet } = useContext(TrackingContext);

    const navItems = [
        { title: "Home", path: "#" },
        { title: "Services", path: "#" },
        { title: "Contact Us", path: "#" },
        { title: "Erc20", path: "#" },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setIsMenuOpen(false);
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <nav className={`bg-white pb-5 md:text-sm ${isMenuOpen ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <a href="#">
                        <img src="https://www.floatui.com/logo.svg" alt="Logo" width={120} height={50} />
                    </a>
                    <div className="md:hidden">
                        <button
                            className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <Nav1 /> : <Nav2 />}
                        </button>
                    </div>
                </div>
                <div className={`flex-1 ml-10 items-center justify-center mt-8 md:mt-0 md:flex ${isMenuOpen ? "block" : "hidden"}`}>
                    <ul className="flex flex-col justify-center items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0">
                        {navItems.map((item, index) => (
                            <li key={index} className="text-gray-700 hover:text-gray-900">
                                <a href={item.path} className="block flex justify-center items-center">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        {currentUser ? (
                            <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-slate-700 active:bg-slate-900 rounded-full md:inline-flex">
                                {currentUser.slice(0, 25)}...
                            </p>
                        ) : (
                            <button onClick={connectWallet} className="flex sm:jus items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-slate-700 active:bg-slate-900 rounded-full md:inline-flex">
                                Connect Wallet <Nav3 />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
