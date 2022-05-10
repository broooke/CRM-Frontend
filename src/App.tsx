import React, {useEffect} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage";
import {MainPage} from "./pages/MainPage";
import styled from "styled-components";
import {Header} from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {SignupPage} from "./pages/SignupPage";
import {ProductsPage} from "./pages/ProductsPage";
import {UserPage} from "./pages/UserPage";
import {useAppDispatch} from "./store";
import {loadUser} from "./store/thunks/user";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #ebeff5;
`

const MainBlock = styled(Container)`
`

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadUser())
    }, [])

  return (
      <Wrapper>
            <Header />
          <MainBlock className='px-5' fluid={true}>
              <Routes>
                  <Route path='' element={<MainPage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/signup' element={<SignupPage />} />
                  <Route path='/products' element={<ProductsPage />} />
                  <Route path='/user/:id' element={<UserPage />} />
                  <Route path='*' element={<Navigate replace to='' />} />
              </Routes>
          </MainBlock>
      </Wrapper>
  );
}

export default App;
