import React, { useState } from 'react';
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { state: { cart }, dispatch, productDispatch } = CartState();
    const navigate = useNavigate();

    const handleGoToCart = () => {
        setShowDropdown(false);
        navigate('/cart');
    }

    return (
        <Navbar bg='dark' variant='dark' style={{ height: '80px' }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <FormControl
                        style={{ width: 500 }}
                        type='search'
                        placeholder='Search a Product'
                        className='m-auto'
                        aria-label='search'
                        onChange={(e) => {
                            productDispatch({
                                type: 'FILTER_BY_SEARCH',
                                payload: e.target.value
                            })
                        }}
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown align='end' show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
                        <Dropdown.Toggle variant='success'>
                            <FaShoppingCart color='white' fontSize='25px' />
                            <Badge bg='success'>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {
                                cart.length > 0 ? (
                                    <>
                                        {
                                            cart.map(product => (
                                                <span className='cartitem' key={product.id}>
                                                    <img
                                                        src={product.image}
                                                        className='cartItemImg'
                                                        alt={product.name}
                                                    />
                                                    <div className='cartItemDetail'>
                                                        <span>{product.name}</span>
                                                        <span>{product.price.split(".")[0]}</span>
                                                    </div>
                                                    <AiFillDelete
                                                        fontSize='20px'
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            dispatch({
                                                                type: 'REMOVE_FROM_CART',
                                                                payload: product
                                                            })
                                                        }}
                                                    />
                                                </span>
                                            ))
                                        }
                                        <Button style={{ width: '95%', margin: '0 10px' }} onClick={handleGoToCart}>
                                            Go To Cart
                                        </Button>
                                    </>
                                ) : (
                                    <span style={{ padding: 10 }}>Cart is Empty!</span>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header