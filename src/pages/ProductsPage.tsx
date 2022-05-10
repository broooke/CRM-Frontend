import React, {FC, useEffect} from 'react';
import {Button, Card, Row, Table} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store";
import {loadProducts} from "../store/thunks/product";

export const ProductsPage: FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.product.products)

    useEffect(() => {
        dispatch(loadProducts())
    }, [])

    return (
        <div>
            <Card className='mt-4'>
                <h4 className='p-3'>Продукты</h4>
                <hr />
                <div className='p-3'>
                    <Table responsive="sm">
                        <tbody>
                        <tr>
                            <td><b>Продукт</b></td>
                            <td><b>Категория</b></td>
                            <td><b>Цена</b></td>
                        </tr>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}р</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    );
};