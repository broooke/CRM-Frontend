import React, {FC, useEffect} from 'react';
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store";
import {useNavigate} from "react-router-dom";
import {loadUsers} from "../store/thunks/user";
import {loadOrders} from "../store/thunks/order";

export const MainPage: FC = () => {
    const user = useAppSelector(state => state.user.user)
    const users = useAppSelector(state => state.user.users)
    const orders = useAppSelector(state => state.order.orders)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            dispatch(loadUsers())
            dispatch(loadOrders(user.id))
        }
    }, [user])

    return (
        <div>
            <Row style={{columnGap: '2rem'}} className='mt-3'>
                <Col className=''>
                    <Card bg='primary' text='light' className="text-center">
                        <Card.Header><h4>Общее количество заказов</h4></Card.Header>
                        <Card.Title className='py-4'><h4>{orders.length}</h4></Card.Title>
                    </Card>
                </Col>
                <Col className=''>
                    <Card bg='success' text='light' className="text-center">
                        <Card.Header><h4>Заказов получено</h4></Card.Header>
                        <Card.Title className='py-4'>
                            <h4>{orders.filter(el => el.status === "Доставлен").length}</h4>
                        </Card.Title>
                    </Card>
                </Col>
                <Col className=''>
                    <Card bg='info' text='light' className="text-center">
                        <Card.Header><h4>Общая сумма заказов</h4></Card.Header>
                        <Card.Title className='py-4'><h4>{orders.reduce((prev, curr) => {
                            return prev + curr.summary
                        }, 0)}р.</h4></Card.Title>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col sm={5}>
                    <h4>Пользователи</h4>
                    <hr/>
                    <Card className='p-2'>
                        <Table responsive="sm">
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td><b>Пользователь</b></td>
                                    <td><b>Телефон</b></td>
                                </tr>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <Button
                                                onClick={() => navigate(`/user/${user.id}`)}
                                                variant="info"
                                                size="sm"
                                            >
                                                Аккаунт
                                            </Button>
                                        </td>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
                <Col sm={7}>
                    <h4>Последнии 5 заказов</h4>
                    <hr/>
                    <Card className='p-2'>
                        <Table responsive="sm">
                            <tbody>
                            <tr>
                                <td><b>Продукт</b></td>
                                <td><b>Дата заказа</b></td>
                                <td><b>Статус</b></td>
                                <td><b>Обновить</b></td>
                                <td><b>Удалить</b></td>
                            </tr>
                            {orders.map((order) => {

                                return (
                                    <tr key={order.id}>
                                        <td>{order.product.name}</td>
                                        <td>
                                            {order.createdAt.toString().slice(0, 10)}
                                        </td>
                                        <td>{order.status}</td>
                                        <td>
                                            <Button variant="info" size="sm">Обновить</Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" size="sm">Удалить</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};