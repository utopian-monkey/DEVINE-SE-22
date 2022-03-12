import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
    
    const [itemlist,setItemList] = useState([]);
    
    useEffect(()=> {
        Axios.get("http://localhost:3001/items").then((response) => {
            setItemList(response.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const deleteItem = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
          setItemList(
            itemlist.filter((val) => {
              return val.ItemID != id;
            })
          );
        });
      };

    return (
        <div className="App">
            <input type="text" placeholder="Search"/>
            <table>
                <tbody>
                    <tr>
                        <th>Item Id</th>
                        <th>Item Name</th>
                        <th>Availability</th>
                    </tr>
                </tbody>
                {itemlist.map((val,key)=> {
                    return (
                        <div className="item" key={key}>
                            <tr>
                                <td>{val.ItemID}</td>
                                <td>{val.Item_Name}</td>
                                <td>{val.Availability}</td>
                                <button onClick={()=> {deleteItem(val.ItemID)}}> Remove </button>
                            </tr>
                        </div>
                    )
                })}
            </table>
        </div>
    )
}

export default App;