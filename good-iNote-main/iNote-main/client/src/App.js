import './App.css';
import Home from './components/Home';
import MyNotes from './components/MyNotes'
// import Addnote from './components/Addnote'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/NoteState';
import About from './components/About';

function App() {
  return (
    <NoteState>
      <Router forceRefresh={true}>
        <div>
          <Switch>
              <Route strict path="/my-notes">
                <MyNotes />
              </Route>
              {/* <Route exact path="/add-note">
                <Addnote />
              </Route> */}
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
      </Router>
      </NoteState>
  );
}

export default App;
