import React, {FC, SyntheticEvent, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../store/thunks/user";
import Reaptcha from 'reaptcha';
import {setLoginError} from "../store/actions/user";

export const LoginPage: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useAppSelector(state => state.user.user)
    const error = useAppSelector(state => state.user.loginError)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [verify, setVerify] = useState(false)

    useEffect(() => {
        if (user) {
            navigate(`/`)
        }
    }, [user])

    const handleLogin = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!verify) {
            return dispatch(setLoginError('Подтвердите каптчу'))
        }
        dispatch(loginUser({email, password}))
    }

    const onVerify = (recaptchaResponse: any) => {
        setVerify(true)
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col className="col-md-5 mx-auto">
                    <Card className='mt-5'>
                        <Card.Header className='text-center'><h5>Войдите в аккаунт</h5></Card.Header>
                        <Card.Body>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleLogin} validated={true}>
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

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        type="password"
                                        placeholder="Введите пароль..." />
                                </Form.Group>
                                <Reaptcha
                                    sitekey='6LfBEbwfAAAAAH0-QjGme5Rnfgc7XRAwGu9v1Y4i'
                                    onVerify={onVerify}
                                />
                                <div className="d-grid gap-2">
                                    <Button className='mt-3' variant="primary" type="submit">
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