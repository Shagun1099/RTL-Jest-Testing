import './app.css';
import Login from './components/Login';
import Product from './components/Product';
import Register from './components/Register';

function App() {
  return (
    <div className="app" data-testid='app'>
      <Login/>
      <hr/>
      <Register/>
      <hr/>
      <Product/>
    </div>
  );
}

export default App;
