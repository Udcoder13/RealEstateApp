import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h2 className="text-2xl font-semibold">YourCompany</h2>
        <p className="mt-4 text-gray-400">
          Providing reliable tech solutions since 1990. Join thousands of satisfied customers around the globe.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium">Quick Links</h3>
        <ul className="mt-4 space-y-2">
          <li><Link to="#" className="hover:text-gray-300">About Us</Link></li>
          <li><Link to="#" className="hover:text-gray-300">Services</Link></li>
          <li><Link to="#" className="hover:text-gray-300">Blog</Link></li>
          <li><Link to="#" className="hover:text-gray-300">Contact</Link></li>
          <li><Link to="#" className="hover:text-gray-300">FAQs</Link></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium">Follow Us</h3>
        <ul className="mt-4 flex space-x-4">
          <li><Link to="#" className="hover:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6.03c-.77.35-1.6.58-2.47.69a4.34 4.34 0 0 0 1.92-2.4c-.86.51-1.82.87-2.83 1.08a4.31 4.31 0 0 0-7.4 3.93 12.23 12.23 0 0 1-8.87-4.5 4.31 4.31 0 0 0 1.33 5.75c-.69-.02-1.34-.21-1.91-.53v.05c0 2.1 1.49 3.84 3.47 4.24a4.31 4.31 0 0 1-1.93.07 4.32 4.32 0 0 0 4.03 3 8.63 8.63 0 0 1-5.34 1.84c-.35 0-.7-.02-1.04-.06a12.19 12.19 0 0 0 6.6 1.93c7.92 0 12.25-6.56 12.25-12.25 0-.19 0-.37-.01-.56.84-.61 1.57-1.37 2.15-2.23z"/></svg></Link></li>
          <li><Link to="#" className="hover:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.45-9.96 9.96 0 4.4 2.86 8.15 6.81 9.49.5.09.69-.22.69-.49v-1.72c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.02-2.7-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.74 1.03A9.65 9.65 0 0 1 12 7.86c.85.01 1.71.12 2.51.34 1.9-1.3 2.74-1.03 2.74-1.03.56 1.42.21 2.46.1 2.72.64.71 1.02 1.61 1.02 2.7 0 3.83-2.35 4.67-4.58 4.91.36.31.68.93.68 1.88v2.79c0 .27.18.59.7.49A10.02 10.02 0 0 0 22 12c0-5.52-4.48-9.96-10-9.96z"/></svg></Link></li>
          <li><Link to="#" className="hover:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.555v-5.568c0-1.327-.028-3.038-1.849-3.038-1.849 0-2.131 1.445-2.131 2.94v5.666H9.355V9h3.414v1.561h.05c.475-.898 1.637-1.848 3.368-1.848 3.603 0 4.269 2.369 4.269 5.455v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.771 13.019H3.566V9h3.542v11.452zM22.225 0H1.771C.79 0 0 .78 0 1.743v20.514C0 23.22.789 24 1.771 24h20.451C23.21 24 24 23.22 24 22.257V1.743C24 .78 23.21 0 22.225 0z"/></svg></Link></li>
          <li><Link to="#" className="hover:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163C6.477 2.163 2 6.64 2 12.163c0 4.993 3.657 9.128 8.437 9.88v-6.987H7.896V12.16h2.541v-2.096c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46H15.51c-1.238 0-1.622.77-1.622 1.56v1.87h2.762l-.441 2.896h-2.32v6.985C18.343 21.291 22 17.156 22 12.163c0-5.523-4.477-10-10-10z"/></svg></Link></li>
        </ul>
      </div>
    </div>

    <div className="mt-8 border-t border-gray-700 pt-4">
      <p className="text-center text-gray-400">&copy; 2024 YourCompany. All rights reserved.</p>
    </div>
  </div>
</footer>
  )
}
