import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3001/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error analyzing image");
    }
  };

  return (
    <div>
      <h1>GPT-4 Vision Image Analysis</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Analyze</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default App;
