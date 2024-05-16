import './App.css';
import Users from './Components/Users/Users';

function App() {
  return (
    <div className="container-fluid">
      <div className='container'>
        <div className='row' style={{marginTop:'20px'}}>
          <h1>Users Data</h1>
        </div>
        <br />
        <div className='row' style={{marginTop:'30px'}}>
          <div className='col-sm-10'>
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
