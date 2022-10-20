// import { Component } from 'react';
import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list-component';
import SearchBox from './components/search-box/search-box-component';


import './App.css';

const App = () => {
  
  //useState - encapsulate local state in a functional component
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  //any fetch call is a side effect so we use Use Effect

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())// every .then() that returns a value is going to return another resolved promise so we can chain another .then like so
      .then((users) => setMonsters(users));
  }, []);


  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
    
  }, [monsters, searchField]);

  
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }; 
  

  return (
    <div className='App'>
      {/* <input 
        className='search-box'
        type='search'
        placeholder='search monsters'
        onChange={onSearchChange}
      /> 
      { filteredMonsters.map((monster) => {
          return (
            <div key={monster.id} > 
              <h1> { monster.name } </h1> 
            </div>
          );
        })} */}
        <h1 className='app-title'> Monsters Rolodex Project </h1>
        <SearchBox  
          className='monsters-search-box'
          placeholder='search monsters'
          onChangeHandler={onSearchChange}
        />
        <CardList 
          monsters = { filteredMonsters }
        />
    </div>
  )
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())// every .then() that returns a value is going to return another resolved promise so we can chain another .then like so
//       .then((users) => 
//         this.setState(
//           () => {
//             return { monsters: users };
//           },
//           () => {
//             console.log(this.state);
//           }
//       )
//     );
//   }


//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//         return { searchField };
//       });
//   }

//   render() {
    
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
    
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });
    
//     return (
//       <div className='App'>
//         {/* <input 
//           className='search-box'
//           type='search'
//           placeholder='search monsters'
//           onChange={onSearchChange}
//         /> */}
//         {/* { filteredMonsters.map((monster) => {
//             return (
//               <div key={monster.id} > 
//                 <h1> { monster.name } </h1> 
//               </div>
//             );
//           })} */}
//           <h1 className='app-title'> Monsters Rolodex Project </h1>
//           <SearchBox  
//             className='monsters-search-box'
//             placeholder='search monsters'
//             onChangeHandler={onSearchChange}
//           />
//           <CardList 
//             monsters = { filteredMonsters }
//           />
//       </div>
//     );
//   }
// }

export default App;
