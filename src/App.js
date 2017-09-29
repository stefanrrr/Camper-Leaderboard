import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import 'font-awesome/css/font-awesome.css'
import Table from 'react-bootstrap/lib/Table'
import Image from 'react-bootstrap/lib/Image'

class App extends Component {

  state = 
  {
    top100Days:[],
    top100AllTime:[],
    current : true
  }

  getFCCData(url,stateName)
  {
    axios.get(url)
      .then(({data}) => {
        this.setState({[stateName]:data});
        console.log(this.state.top100Days);
    })
  }

  pointChange(value)
  {
    if(this.state.current !== value)
    {
      this.setState({current:value});
    }
  }

  componentDidMount() 
  {
    this.getFCCData('https://fcctop100.herokuapp.com/api/fccusers/top/recent',"top100Days");
    this.getFCCData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime',"top100AllTime");
  }

  render() {
    const {top100Days,top100AllTime,current} = this.state;
    return (
      <div className="App container">

        <h1 className = 'title'>Camper Leaderboard</h1>
        <h5 className = 'subtitle'>Stefan Ruvceski</h5>

        <Table  bordered condensed  className = 'table'>
          
          <thead >
            <tr>
              <th className = 'first head'>#</th>
              <th className = 'first'>Camper Img</th>
              <th className = 'first'>Camper Name</th>
              <th className = 'click' onClick = {(event)=>this.pointChange(true)}>Points in 30 days {current && (<i className = "fa fa-caret-down"></i>)}</th>
              <th className = 'click' onClick = {(event)=>this.pointChange(false)}>All time points {!current && (<i className = "fa fa-caret-down"></i>)} </th>
            </tr>
          </thead>
          
          <tbody class = 'body'>
            {current &&(top100Days.map((row,index)=>(
              
              <tr key={row.username}  >
              
              <td className = 'num'>{index + 1}</td>
              <td><a  href={`https://www.freecodecamp.org/${row.username}`} ><Image src={row.img} className='imgHeight' circle alt='User' /> </a></td>
              <td><a href={`https://www.freecodecamp.org/${row.username}`} >{row.username}</a></td>
              <td>{row.recent}</td>
              <td>{row.alltime}</td>
              
            </tr>
            
            ))
            )}

            { current === false && (top100AllTime.map((row,index)=>(
              
              <tr key={row.username} >
              <td>{index + 1}</td>
              <td ><a href={`https://www.freecodecamp.org/${row.username}`} ><Image src={row.img} className='imgHeight' circle alt='User' /> </a></td>
              <td ><a  href={`https://www.freecodecamp.org/${row.username}`} >{row.username}</a></td>
              <td>{row.recent}</td>
              <td>{row.alltime}</td>
            </tr>
            ))
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
