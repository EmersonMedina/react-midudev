import { useId } from 'react'
import './Filters.css'
import { useProducts } from '../hooks/useProducts'

export function Filters() {
    const { filters, setFilters } = useProducts()

    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (e) => {
        setFilters(prevState => ({
            ...prevState, 
            minPrice: e.target.value  
        }))
    }

    const handleCategory = (e) => {
        setFilters(prevState => ({
            ...prevState, 
            category: e.target.value  
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
                <input type="range" id={minPriceFilterId} min="0" max="1000" onChange={handleChangeMinPrice} value={filters.minPrice}/>
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoria</label>
                <select id={categoryFilterId} onChange={handleCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}