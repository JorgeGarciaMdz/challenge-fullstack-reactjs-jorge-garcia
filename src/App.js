import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import { Controller } from './Controller/controller';

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Expenses</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Controller />
      </Container>
    </div>
  );
}

export default App;
