import React, {FC, SyntheticEvent, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store";
import {signupUser} from "../store/thunks/user";
import {useNavigate} from "react-router-dom";
import Reaptcha from "reaptcha";

export const SignupPage: FC = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [verify, setVerify] = useState(false)

    useEffect(() => {
        if (user) {
            navigate(`/`)
        }
    }, [user])

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!verify) return;
        if (password !== confirmPassword) {
            setHasError(true)
            return
        }
        setHasError(false)
        dispatch(signupUser({
            email,
            firstName,
            lastName,
            phone,
            password
        }))
    }

    const onVerify = (recaptchaResponse: any) => {
        setVerify(true)
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col className="col-md-5 mx-auto">
                    <Card className='mt-5'>
                        <Card.Header className='text-center'><h5>Создайте аккаунт</h5></Card.Header>
                        <Card.Body>
                            {hasError && <Alert variant='danger'>Пароли не совпадают</Alert>}
                            <Form onSubmit={submitHandler} validated={true}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Адрес электронной почты</Form.Label>
                                    <Form.Control
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        type="email"
                                        placeholder="Введите адрес электронной почты..."
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        type="text"
                                        placeholder="Введите имя..."
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        type="text"
                                        placeholder="Введите фамилию..."
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        type="text"
                                        placeholder="Введите телефон..."
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        type="password"
                                        placeholder="Введите пароль..."
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>Подтвердите пароль</Form.Label>
                                    <Form.Control
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        type="password"
                                        placeholder="Введите пароль повторно..."
                                    />
                                </Form.Group>
                                <Reaptcha
                                    sitekey='6LfBEbwfAAAAAH0-QjGme5Rnfgc7XRAwGu9v1Y4i'
                                    onVerify={onVerify}
                                />
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">
                                        Войти
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};