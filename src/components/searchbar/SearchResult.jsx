import React from 'react'

const SearchResult = ({ results, setValue, setResults }) => {
  return (
    results.length > 0 && (
      <div className='mt-4 max-h-60 overflow-y-auto'>
        {results.map((city) => (
          <div
            key={city._id}
            className='px-4 py-2 hover:bg-black/5 cursor-pointer'
            onClick={() => {
              setValue('city', city.name, { shouldValidate: true });
              setResults([]);
            }
            }                                >
            {city.name}
          </div>
        ))}
      </div>
    )

  )
}

export default SearchResult