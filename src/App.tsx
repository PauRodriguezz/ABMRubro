
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes"
import NavBarChef from './components/NavBar-Chef/NavBarChef';
import Footer from "./components/Footer/Footer";
import { Container, ToastContainer } from 'react-bootstrap';
import { Suspense } from 'react';
import Loader from './components/Loader/Loader';

function App() {
 

  return (
    <>
      
    <ToastContainer/>
    <Router>
      <NavBarChef/>
      <Container style={{minHeight: '100vh', minWidth: '100%', padding:'0'}}>
            <Suspense fallback={<Loader/>}>
              <AppRoutes/>
            </Suspense>
          </Container>
      <Footer/>
    </Router>
    </>
  )
}

export default App
