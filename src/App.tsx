/**
 * @fileoverview App component that renders the AutoComplete component.
 */
import React, { useEffect, useState } from "react";
import data from "./data/mockData.json";
import AutoComplete from "./components/AutoComplete";
import "./App.css";
import { Option } from "./types/interface";

const App: React.FC = () => {
  // State to store the users fetched from the API
  const [users, setUser] = useState<Option[]>([]);

  useEffect(() => {
    // Fetch the users from the API
    const getUser = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        // Map the users to the required format
        const users = data.map((user: any) => ({
          value: user.name,
          id: user.id,
        }));
        // Update the state with the users
        setUser(users);
      } catch (error) {
        // If there is an error while fetching the data, log the error message
        console.error("Error while fetching user:", error);
      }
    };

    getUser();
  }, []);

  // Render the AutoComplete component
  return (
    <div className="main">
      <h1>AutoComplete Component</h1>
      <div className="auto-complete-wrapper">
        <>
          Data from mockData
          <AutoComplete options={data} />
        </>
        <>
          Data from API
          <AutoComplete options={users} />
        </>
      </div>
    </div>
  );
};

export default App;
