import { useState, useEffect } from "react";
import "./App.css";
import { SPACE_ID, ACCESS_TOKEN } from "./key";

const query = `
{
  examplePage(id: "1N0hGtxKYYydR05WnGjQ9R") {
    exampleTitle
    exampleLogo {
      url
    }
  }
}
`;

function App() {
  const [page, setPage] = useState(null);
  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then((json) => setPage(json.data.examplePage))
  }, []);

  if (!page) {
    return "Loading...";
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={page.exampleLogo.url} className="App-logo" alt="logo" />
        <p>{page.exampleTitle}</p>
      </header>
    </div>
  );
}

export default App;

