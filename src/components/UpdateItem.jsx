import { useState } from "react";
import PropTypes from "prop-types"; 

const UpdateItem = ({ item }) => {
  const [updatedName, setUpdatedName] = useState(item.name);
  const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/${item.id}`;

  const handleInputChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        alert(`Item updated successfully: ${updatedItem.name}`);
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={updatedName}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};


UpdateItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default UpdateItem;
