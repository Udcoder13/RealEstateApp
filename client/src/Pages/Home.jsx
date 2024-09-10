import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { FiLock } from "react-icons/fi";
import { LuCreditCard } from "react-icons/lu";
import ListingCard from "../Components/ListingCard";
import backgroundImg from "../assets/Home_bg.jpg"

export default function Home() {
  const [rentList, setRentList] = useState([]);
  const [sellList, setsellList] = useState([]);

  useEffect(() => {
    const getRentListings = async () => {
      const rentListings = await fetch(`/api/listing/get?type=rent&limit=6`);
      const rentData = await rentListings.json();
      setRentList(rentData);
    };
    const getSellListings = async () => {
      const sellListings = await fetch(`/api/listing/get?type=sell&limit=6`);
      const sellData = await sellListings.json();
      setsellList(sellData);
    };
    getSellListings();
    getRentListings();
  }, []);

  return (
    <main>
      <section className="background-section mb-20 md:mb-30 xl:mb-30 p-40">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center text-gray-900 leading-normal mb-6">
          Get your dream <br />
          house now
        </h1>
        <p className="text-center text-lg text-blue-900 mb-12 font-semibold">
          Having a sweet home is everyone's dream. Have you owned your dream
          house?
        </p>
        <div className="text-center">
          <Link
            to="/search"
            className="font-semibold text-4xl text-blue-900 hover:opacity-85"
          >
            Start
          </Link>
        </div>
      </section>
      <section className="mb-20 md:mb-20 xl:mb-20">
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-md md:text-3xl text-center mb-10">
            Choice of various types of
            <br />
            house
          </h1>
          <p className="text-gray-400 text-md md:text-xl text-center mb-11">
            We provide a wide of selection of home types for you and your
            <br />
            family and are free to choose a home model
          </p>
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0 ">
                <SiTicktick className="text-green-900 text-2xl" />
              </div>
              <div class="text-center md:text-left">
                <h4 class="font-semibold text-gray-900 text-2xl mb-2">
                  Best Home Guarantee
                </h4>
                <div className="w-[600px]">
                <p class="text-gray-400 text-xl">
                  We guarantees the quality of your home you bought
                  from brandName</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0 ">
                <FiLock className="text-green-900 text-2xl" />
              </div>
              <div class="text-center md:text-left">
                <h4 class="font-semibold text-gray-900 text-2xl mb-2">
                Safe Transaction
                </h4>
                <div className="w-[600px]">
                <p class="text-gray-400 text-xl">
                Your transactions will always be kept confidential
                and will get discounted 
                </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0 ">
                <LuCreditCard className="text-green-900 text-2xl" />
              </div>
              <div class="text-center md:text-left">
                <h4 class="font-semibold text-gray-900 text-2xl mb-2">
                Low and Cost Home Taxes
                </h4>
                <div className="w-[600px]">
                <p class="text-gray-400 text-xl">
                By buying a house from D’house, you will get a tax
                discount
                </p>
                </div>
              </div>
            </div>
            </div>
        </div>
      </section>
      <section>
        <h1 className="text-5xl font-semibold text-center text-gray-700 mb-15">
          Recent places for rent
        </h1>
        <div className="flex flex-row flex-wrap pl-5 justify-around mt-10">
          {rentList.map((listing, index) => (
            <ListingCard listingInfo={listing} />
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-5xl font-semibold text-center text-gray-700 mb-15">
          Recent places for sell
        </h1>
        <div className="flex flex-row flex-wrap pl-5 justify-around mt-10">
          {sellList.map((listing, index) => (
            <ListingCard listingInfo={listing} />
          ))}
        </div>
      </section>
    </main>
  );
}
