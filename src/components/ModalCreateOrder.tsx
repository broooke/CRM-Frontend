import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store";
import {loadProducts} from "../store/thunks/product";
import {createOrder, updateOrder} from "../store/thunks/order";
import {useParams} from "react-router-dom";
import {Order, StatusOrder} from "../store/reducers/order";

interface Props {
    show: boolean;
    onHide: () => void;
    update: number | undefined;
}

export const ModalCreateOrder: FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const products = useAppSelector(state => state.product.products)
    const orders = useAppSelector(state => state.order.orders)
    const [quantity, setQuantity] = useState(1);
    const [selectItem, setSelectItem] = useState<number>();
    const [status, setStatus] = useState<StatusOrder>('Создан');

    useEffect(() => {
        dispatch(loadProducts())
    }, [])

    useEffect(() => {
        if (props.update) {
            const order = orders.find(el => el.id === props.update)
            if (order) {
                setSelectItem(order.productId)
                setQuantity(order.quantity)
                setStatus(order.status)
            }
        }
    }, [props.update, id])

    useEffect(() => {
        if (products.length && products[0].id) {
            setSelectItem(products[0].id)
        }
    }, [products])

    const handleChangeSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as StatusOrder);
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectItem(Number(e.target.value));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (quantity === 0) {
            return
        }
        if (selectItem && !props.update) {
            dispatch(createOrder({
                productId: selectItem,
                quantity,
                ownerId: Number(id)
            }))
            props.onHide()
            return;
        }
        if (selectItem && props.update) {
            dispatch(updateOrder({
                body: {
                    productId: selectItem,
                    quantity,
                    status
                },
                id: props.update
            }))
            props.onHide()
            return;
        }
    }

    return (
        <Form>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Разместите заказ
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {quantity === 0 && <Alert variant='danger'>Количество продукта должно быть больше 0</Alert>}
                    <Form.Group className="mb-3" controlId="formBasicProduct">
                        <Form.Label>Продукт</Form.Label>
                        <Form.Select value={selectItem} onChange={handleChangeSelect} aria-label="Default select example">
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                        <Form.Label>Количество товара&nbsp;<b>{quantity}</b></Form.Label>
                        <Form.Range value={quantity} onChange={handleChange} />
                    </Form.Group>
                    {props.update && (
                        <Form.Group className="mb-3" controlId="formStatus">
                            <Form.Label>Статус</Form.Label>
                            <Form.Select value={status} onChange={handleChangeSelectStatus} aria-label="Default select example">
                                <option value='Создан'>Создан</option>
                                <option value='Отправлен'>Отправлен</option>
                                <option value='Доставлен'>Доставлен</option>
                            </Form.Select>
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.onHide}>Закрыть</Button>
                    <Button onClick={handleSubmit}>Разместить заказ</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};