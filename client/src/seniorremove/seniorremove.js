import "./senior.css";
import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";



function MyApp() {
    
    
    const [itemlist,setItemList] = useState([]);
    const [seniorid,setSeniorID] = useState(21119052);
    const [searchTerm, setSearchTerm] = useState("");
    
    

    
    
 
    useEffect(()=> {
        
        
        Axios.get(`http://localhost:3001/seniors/${seniorid}`).then((response) => {
            setItemList(response.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const deleteItem = (id) => {
        Axios.delete(`http://localhost:3001/deletesen/${id}`).then((response) => {
          setItemList(
            itemlist.filter((val) => {
              return val.ItemID !== id;
            })
          );
        });
      };

    return (
        <div className="App">
            <input 
                className="searchbar"
                type="text" 
                placeholder="Search"
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />
            
            
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Item Id</th>
                        <th>Item Name</th>
                        <th>Availability</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
            
            {itemlist.filter((val)=> {
                if (searchTerm == "") {
                    return val
                } else if (val.Item_Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).map((val,key) => {
                return (
                    <div className="item" key={key}>
                        <table className="content-table">
                        <tbody>
                        <tr>
                                <td>{val.ItemID}</td>
                                <td>{val.Item_Name}</td>
                                <td>{val.Availability}</td>
                                <td>{val.Price}</td>
                                <td><button onClick={()=> {deleteItem(val.ItemID)}}> Remove Deal </button></td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                );
            })}

        </div>
    );
}

export default MyApp;