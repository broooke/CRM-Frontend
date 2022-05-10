import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store";
import {loadUsers} from "../store/thunks/user";
import {User} from "../store/reducers/user";
import {deleteOrder, loadOrders} from "../store/thunks/order";
import {ModalCreateOrder} from "../components/ModalCreateOrder";

export const UserPage: FC = () => {
    const { id } = useParams();
    const users = useAppSelector(state => state.user.users)
    const instance = useAppSelector(state => state.user.user)
    const orders = useAppSelector(state => state.order.orders)
    const dispatch = useAppDispatch()
    const [user, setUser] = useState<User>()
    const [modalShow, setModalShow] = React.useState(false);
    const [updateOrderId, setUpdateOrderId] = React.useState<undefined | number>(undefined)

    useEffect(() => {
        const candidate = users.find(el => el.id === Number(id))
        if (candidate) {
            setUser(candidate)
        }
    }, [users, id])

    useEffect(() => {
        if (user) {
            dispatch(loadOrders(user.id))
        }
        dispatch(loadUsers())
    }, [user?.id])

    const hideHandler = () => {
        setModalShow(false)
        setUpdateOrderId(undefined)
    }

    if (!id) {
        return <div/>
    }

    return (
        <div>
            <ModalCreateOrder update={updateOrderId} show={modalShow} onHide={hideHandler} />
            <Row style={{columnGap: '2rem'}} className='mt-3'>
                {instance && instance.id === Number(id) && (
                    <Col>
                        <Card style={{height: '100%'}} className='p-3'>
                            <Card.Title>Пользователь</Card.Title>
                            <hr />
                            <Button
                                onClick={() => {
                                    setModalShow(true)
                                    setUpdateOrderId(undefined)
                                }}
                                variant="outline-info"
                                className='mt-2'
                                size="sm"
                            >
                                Разместить заказ
                            </Button>
                        </Card>
                    </Col>
                )}
                <Col>
                    <Card style={{height: '100%'}} className="p-3">
                        <Card.Title>Информация о пользователе</Card.Title>
                        <hr />
                        <Card.Text>Адрес эл. почты: {user?.email}</Card.Text>
                        <Card.Text>Телефон: {user?.phone}</Card.Text>
                        <Card.Text>ФИО: {user?.firstName} {user?.lastName}</Card.Text>
                    </Card>
                </Col>
                <Col>
                    <Card style={{height: '100%'}} className="p-3">
                        <Card.Title>Общее количество заказов</Card.Title>
                        <hr />
                        <Card.Text
                            style={{height: '100%'}}
                            className='text-center d-flex justify-content-center align-items-center'
                        >
                            <h2>{orders.length}</h2>
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <h4>Заказы</h4>
                    <hr/>
                    <Card className='p-2'>
                        <Table responsive="sm">
                            <tbody>
                            <tr>
                                <td><b>Продукт</b></td>
                                <td><b>Дата заказа</b></td>
                                <td><b>Статус</b></td>
                                <td><b>Количество</b></td>
                                <td><b>Стоимость</b></td>
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
                                        <td>{order.quantity}</td>
                                        <td>{order.summary}р.</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                size="sm"
                                                onClick={() => {
                                                    setModalShow(true)
                                                    setUpdateOrderId(order.id)
                                                }}
                                            >
                                                Обновить
                                            </Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => dispatch(deleteOrder(order.id))} variant="danger" size="sm">Удалить</Button>
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