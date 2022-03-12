import React from "react";
import { useState } from "react";
import "./modalSell.css";
import Axios from "axios";

function Modal({setOpenModal}) {
    
    const [userID,setuserID] = useState("");
    const [itemID,setitemID] = useState("");
    const [price, setPrice] = useState(0);
    

    const addItem = () => {
        
        if (userID=="" || itemID=="" ){
            alert("Null entries are not accepted.")
        }
        
        else {
            Axios.post("http://localhost:3001/adddeal", {
            userID:userID,
            itemID:itemID,
            price:price
            }).then(() => {
            console.log("sucess");
            });
            alert("Offer Added!");
            
        }
      };
    
    return(
    <div id="myModal" className="modal">
    <div className="modal-content">
            
            <button className="cross"
                onClick={() => {
                    setOpenModal(false);
                }}
            >
                X
            </button>

            <form>

            <label>User ID: </label>      
            <input type="text" placeholder="USER ID" onChange={(event) => {setuserID(event.target.value);}} required/>
            <br/> <br/>

            <label>Item ID: </label>      
            <input type="text" placeholder="ITEM ID" onChange={(event) => {setitemID(event.target.value);}} required/>
            <br/> <br/>
            
            
            
            <label>Price:</label>
            <input type="number" placeholder="Price" onChange={(event) => {setPrice(event.target.value);}} required/>
            

        </form>
        <div className="align-right">
            <button type="submit" className="button" onClick={addItem}>ADD</button>
        </div>
    </div>
    </div>
    );
}

export default Modal; 