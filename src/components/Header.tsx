import React, {FC} from 'react';
import {Container, Dropdown, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../store";
import {logoutUser} from "../store/thunks/user";

const StyledBrand = styled(Navbar.Brand)`
  &:hover {
    cursor: pointer;
  }
`

export const Header: FC = () => {
    const user = useAppSelector(state => state.user.user)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAccount = () => {
        navigate(`/user/${user?.id}`)
    }

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/login')
    }

    return (
        <Navbar className='px-5' bg="dark" variant="dark">
            <StyledBrand onClick={() => navigate('/')}>CRM-Diplom</StyledBrand>
            {user ? (
                <>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>Приборная панель</Nav.Link>
                        <Nav.Link onClick={() => navigate('/products')}>Продукты</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className='d-flex align-items-center'>
                            Вошел в систему как:
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={user.firstName + ' ' + user.lastName}
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item onClick={handleAccount}>Аккаунт</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Выйти</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </>
            ) : (
                <>
                    <Nav className="me-auto"></Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link onClick={() => navigate('/login')}>
                            <Navbar.Text>Войти</Navbar.Text>
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate('/signup')}>
                            <Navbar.Text>Зарегистрироваться</Navbar.Text>
                        </Nav.Link>
                    </Navbar.Collapse>
                </>
            )}
        </Navbar>
    );
};