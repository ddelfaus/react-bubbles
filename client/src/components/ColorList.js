import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../Utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => { 
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
      axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {

        setColorToEdit(res.data);
        setEditing(false)
        
      })
      .catch(err => console.log(err));

  };
  function refreshPage() {
    window.location.reload(false);
  }
  const deleteColor = (color) => {
    // make a delete request to delete this color

    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => {
      setColorToEdit(res.data)
      refreshPage()
    })
   
  };

   //// adding new color 
  const handleChanges = event =>{
    setNewColor({
        ...newColor,
        [event.target.name]: event.target.value
    })
  }
  const handleAddColor= e => {
  
    axiosWithAuth()
    .post("/api/colors", newColor)
    .then(res => {
        console.log(res,"post request")
        setNewColor(res.data)
    })
    .catch(err => console.log(err.response));
}

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
          
      <form onSubmit ={handleAddColor}>
           <input 
                type ="text"
                name="color"
                value ={newColor.color}
                onChange ={handleChanges}
                placeholder= "color"
            
            />
            <input 
                type ="text"
                name= "code"
                value = {newColor.code.hex}
                onChange= {e =>
                  setNewColor({
                    ...newColor,
                    code: { hex: e.target.value }
                  })
                }
                placeholder= "######"
            
            />

        <button >add new color</button>



      </form>
      
    </div>
  );
};

export default ColorList;
