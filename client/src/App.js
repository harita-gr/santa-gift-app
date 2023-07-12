import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>

        <form method="post">
          who are you?
          <input name="userid" placeholder="charlie.brown" required />
          what do you want for christmas?
          <textarea
            name="wish"
            rows="10"
            cols="45"
            maxlength="100"
            placeholder="Gifts!"
            required
          ></textarea>
          <br />
          <button type="submit" id="submit-letter">
            Send
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
