import { createContext, useState } from "react";

// 1. Create the context
// This is what we have to consume
export const FiltersContext = createContext();

//2. Provide the context
export const FiltersProvider = ( { children } ) => {

    const [filters, setFilters] = useState({
        category: "all",
        minPrice: 0,
    })

    return ( 
        <FiltersContext.Provider value={{
            filters, 
            setFilters
        }}> 
            { children }
        </FiltersContext.Provider>
    )
}