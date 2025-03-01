import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`; 
function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URI);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          console.error("Failed to fetch item");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, []);

  return (
    <div>
      <h1>Update Door Item</h1>
      {item ? <UpdateItem item={item} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
