import React from 'react';
import { CartState } from '../context/Context';
import SingleProduct from './SingleProduct';
import Filters from './Filters';
import './styles.css';

const Home = () => {
    const {
        state: { products },
        productState: { sort, byStock, byFastDelivery, byRating, searchQuery }
    } = CartState();

    const transformedProducts = () => {
        let sortedProducts = products;

        if(sort) {
            sortedProducts = sortedProducts.sort((a, b) => 
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            );
        }

        if(!byStock) {
            sortedProducts = sortedProducts.filter((product) => product.inStock);
        }

        if(byFastDelivery) {
            sortedProducts = sortedProducts.filter((product) => product.fastDelivery);
        }

        if(byRating) {
            sortedProducts = sortedProducts.filter(
                (product) => product.ratings >= byRating
            )
        }

        if(searchQuery) {
            sortedProducts = sortedProducts.filter((product) => 
                product.name.toLowerCase().includes(searchQuery)
            )
        }

        return sortedProducts
    }

    return (
        <div className='home'>
            <Filters />
            <div className='productContainer'>
                {
                    transformedProducts().map((product) => {
                        return <SingleProduct key={product.id} product={product} />
                    })
                }
            </div>
        </div>
    )
}

export default Home;