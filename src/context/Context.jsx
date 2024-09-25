import React, { createContext } from 'react';
import { faker } from '@faker-js/faker';

const Cart = createContext();

const Context = ({ children }) => {

    const products = [...Array(20)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    }));

    return (
        <Cart.Provider value={{}}>
            {children}
        </Cart.Provider>
    );
}

export default Context;