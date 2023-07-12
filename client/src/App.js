import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseURL = "https://santa-gift-app.onrender.com";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName || !wish) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors

    axios
      .post(`${baseURL}/submit`, {
        userName,
        wish,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(`${response.data}`);
        }
      })
      .catch((error) => {
        setError(`${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>

        {error && <p className="error">{error}</p>}

        <form method="post" onSubmit={handleSubmit}>
          who are you?
          <input
            name="userid"
            placeholder="charlie.brown"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          what do you want for christmas?
          <textarea
            name="wish"
            rows="10"
            cols="45"
            maxLength="100"
            placeholder="Gifts!"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
          ></textarea>
          <br />
          <button type="submit" id="submit-letter" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </main>

      <footer>
        Made with
        <a href="https://glitch.com">Glitch</a>!
      </footer>
    </div>
  );
}

export default App;
