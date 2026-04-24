import React from 'react'

const SearchBar = () => {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto group mt-4">
    <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-indigo-500 transition-colors">
      <input 
        type="text" 
        placeholder="Search ..." 
        className="w-full px-3 py-2 focus:outline-none bg-transparent"
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-focus-within:text-indigo-500 mr-2 transition-colors">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </div>
  </div>


    </>
  )
}

export default SearchBar

