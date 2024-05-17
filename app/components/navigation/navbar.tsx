import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-blue-900 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Your logo or brand */}
          <Link href="/">
            <p>
              <img src="/svg/book.svg" alt="Logo" />
            </p>
          </Link>

          {/* Navigation links */}
          <ul className="hidden md:flex gap-x-6 text-white">
            <li>
              <Link href="/diary">
                <p>Diary</p>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <p>Services</p>
              </Link>
            </li>
            <li>
              <Link href="/contacts">
                <p>Contacts</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
