import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Door from './components/Door';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Error from './components/error/Error';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <Header />
        </header>

        <main className="main">
          <Switch>
            <Route path="/" exact component={ Door } />   
            <Route path="/" component={Error} />   
          </Switch>
        </main>

        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </Router>
    );
  }
  
  export default App;
  