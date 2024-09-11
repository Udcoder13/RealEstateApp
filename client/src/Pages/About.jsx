import React from 'react'

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <div className="max-w-4xl bg-white shadow-md rounded-lg p-8 mt-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">About Us</h1>
        <p className="text-lg text-gray-600 leading-7">
          Welcome to <span className="font-semibold text-gray-800">YourDreamHome</span>, your one-stop destination for finding
          the perfect property! We are a team of dedicated real estate professionals committed to helping you navigate
          the real estate market with ease. Whether you're searching for your next home, looking to invest, or want to list your
          property, we offer a streamlined platform designed with your needs in mind.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 leading-7">
          Our mission is to empower buyers, sellers, and renters with the information and tools they need to make informed
          decisions. We believe in transparency, accessibility, and providing a seamless experience for all our users.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-lg text-gray-600 leading-7">
          <li>Extensive database of verified property listings</li>
          <li>User-friendly interface for easy browsing</li>
          <li>Real-time updates on the latest properties</li>
          <li>Professional support from experienced agents</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-600 leading-7">
          Have any questions or need further assistance? Feel free to reach out to us via our contact page. We're here to help
          you every step of the way.
        </p>
        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition-all">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}
