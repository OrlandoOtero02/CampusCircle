import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCircleContext } from "../hooks/useCircleContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const CircleForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCircleContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handlePrivacyChange = (event, newValue) => {
    if (newValue !== null) {
      setIsPrivate(newValue === "private");
      console.log(newValue === "private");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const circle = {
      title,
      description,
      isPrivate,
    };

    const response = await fetch("/api/circles", {
      method: "POST",
      body: JSON.stringify(circle),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setIsPrivate(false);
      setError(null);
      setEmptyFields([]);
      console.log("New circle added", json);
      dispatch({ type: "CREATE_CIRCLE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a New Circle</h3>

      <label>Circle Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""
        }
      />

      <label>Privacy:</label>
      <ToggleButtonGroup
        value={isPrivate ? "private" : "public"} // "private" when isPrivate is true
        exclusive
        onChange={handlePrivacyChange}
      >
      <ToggleButton value="public">Public</ToggleButton>
      <ToggleButton value="private">Private</ToggleButton>
      </ToggleButtonGroup>


      <button>Add Circle</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CircleForm;
