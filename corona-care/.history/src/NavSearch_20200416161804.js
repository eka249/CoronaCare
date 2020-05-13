//  import React, { Component, Button } from "react";
//  import {
//     BrowserRouter as Router,
//     Route,
//     Switch,
//     Link,
//     NavLink
//   } from "react-router-dom";

//   class NavSearch extends Component(){
//       constructor(){
//           super()
//           this.state({
//               searchInput: null,
//               unfilteredRequests: this.props.requests
//           })
//       }
//   //////////////////

//   filteredRequests = () => {
//       if (this.state.searchInput === null) {
//         return this.props.unfilteredTaskList.map((task, index) => {
//           return (
//             <div>
//               <TaskDetails
//                 key={index}
//                 myTask={task}
//                 handleFetchAllTasks={this.props.handleFetchAllTasks}
//                 employees={this.props.employees}
//               />
//             </div>
//           );
//         });
//       } else {
//         let filteredList = this.props.unfilteredTaskList.filter(task => {
//           let searched = this.state.searchTask;
//           let titles = task.title
//             .split(" ")
//             .filter(word => word.toLowerCase().match(searched));
//           let clients = task.client
//             .split(" ")
//             .filter(word => word.toLowerCase().match(searched));
//           let descWords = task.description
//             .split(" ")
//             .filter(word => word.toLowerCase().match(searched));
//           return (
//             titles.length > 0 || descWords.length > 0 || clients.length > 0
//           );
//         });
//         if (filteredList.length > 0) {
//           return filteredList.map((task, index) => {
//             return (
//               <div>
//                 <TaskDetails
//                   key={index}
//                   myTask={task}
//                   employees={this.props.employees}
//                   handleFetchAllTasks={this.props.handleFetchAllTasks}
//                 />
//               </div>
//             );
//           });
//         } else {
//           return null;
//         }
//       }
//     }
//   };
//   /////////////////

//  handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
// searchNav = () =>{
//     return( <Menu.Menu position="right">
//     <Menu.Item fixed="right">
//       <Input name = "searchInput" icon="search" placeholder="Search Titles or Descriptions" onChange = {this.handleChange}/>
//     </Menu.Item>
//     </Menu.Menu>)
//   }

//   render(){
//       return
//   }

// }
// export default NavSearch
