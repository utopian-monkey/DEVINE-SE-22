import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "./Components/Modal";

function App() {
    
    const [itemlist,setItemList] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
            
            <button type="button" className="openModalBtn" onClick={()=> {
                setModalOpen(true);
            }}    
            >ADD ITEM</button>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
            
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Item Id</th>
                        <th>Item Name</th>
                        <th>Availability</th>
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
                                <td><button onClick={()=> {deleteItem(val.ItemID)}}> Remove </button></td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                );
            })}

        </div>
    );
}

export default App;