"use client";
import React, { FC } from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Footer: FC = () => {
  const router = useRouter();
  return (
    <footer className="bg-[#242625] text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Contact Section */}
        <div>
          <div className="flex items-center mb-4">
            <div className="p-2">
              <Image
                src="/icons/Logo.png"
                alt="logo"
                width={250}
                height={150}
              />
            </div>
          </div>
          <p>
            Penyedia jasa travel seluruh destinasi di Indonesia yang aman,
            cepat, dan nyaman.
          </p>
          <div className="mt-4 space-y-2">
            <p className="flex items-center">
              <FaPhone className="mr-2" /> 0812314151523
            </p>
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> UPN Veteran Jakarta
            </p>
            <p className="flex items-center">
              <FaClock className="mr-2" /> Senin - Minggu
            </p>
          </div>
        </div>

        {/* Destinations Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Destinations</h2>
          <ul className="space-y-2">
            <li>Raja Ampat</li>
            <li>Bali</li>
            <li>NTT</li>
            <li>Yogyakarta</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-xl font-bold mb-1">Join Our Newsletter</h2>
          <div className="flex h-full justify-center items-center">
            <div className="p-1">
              <div className="dark:bg-gray-800 flex flex-wrap items-center w-full max-w-5xl p-1 mx-auto text-left border border-gray-200 rounded lg:flex-nowrap md:p-8 dark:border-gray-700">
                {/* <div className="flex-1 w-full mb-5 md:mb-0 md:pr-5 lg:pr-10 md:w-1/2">
                
                </div> */}
                <div className="w-full px-1 md:w-auto lg:w-1/2">
                  <form>
                    <div className="flex flex-col sm:flex-row">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md sm:mr-5 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                        required
                      />
                      {/* <button
                        type="submit"
                        className="w-full px-6 py-2 mt-5 text-white text-lg bg-gray-900 rounded-md sm:mt-0 sm:w-auto dark:bg-gray-900"
                      >
                        Subscribe
                      </button> */}

                      <Button
                        onClick={() => router.push("./")}
                        variant={"default"}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto flex justify-between items-center flex-col md:flex-row">
          <p className="text-sm md:text-lg">© 2024 Travel Indonesia</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="#" passHref>
              <FaFacebookF className="w-5 h-5 cursor-pointer" />
            </Link>
            <Link href="#" passHref>
              <FaTwitter className="w-5 h-5 cursor-pointer" />
            </Link>
            <Link href="#" passHref>
              <FaInstagram className="w-5 h-5 cursor-pointer" />
            </Link>
            <Link href="#" passHref>
              <FaLinkedinIn className="w-5 h-5 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
