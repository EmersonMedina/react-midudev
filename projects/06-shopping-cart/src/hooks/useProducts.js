import { useContext, useEffect, useState } from 'react'
import { products as initialProducts }from "../mocks/products.json"
import { FiltersContext } from '../context/filters'

export function useProducts() {

    console.log('Ejecutando useProducts')

    const [products, setProducts] = useState(initialProducts)

    const { filters, setFilters } = useContext(FiltersContext)
    
    const [filteredProducts, setFilteredProducts] = useState(initialProducts)

    useEffect(() => {
        console.log('Ejecutando useEffect')
        if(filters) {
            const filtered = products.filter(product => {
                return ( 
                  product.price >= filters.minPrice && 
                  (
                    filters.category === 'all' || product.category === filters.category
                  )
                )})
            setFilteredProducts(filtered)
        } else {
            setFilteredProducts(products)
        }
    },[filters, products])

    function getProducts() {
        return filteredProducts
    }

    return { getProducts, filters, setFilters, setProducts }
}