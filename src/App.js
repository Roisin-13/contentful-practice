import { useState, useEffect } from "react";
import "./App.css";
import { SPACE_ID, ACCESS_TOKEN } from "./key";
import Axios from 'axios';

function App() {
  const [page, setPage] = useState(null);

  useEffect(() => {getPage()}, []);

  async function getPage() {
    await Axios({
      method: "POST",
      url: `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      data: {
        query: `
                  query {
                    examplePage(id: "1N0hGtxKYYydR05WnGjQ9R") {
                      exampleTitle
                      exampleLogo {
                        url
                      }
                    }
                  }
                `
      },  
 
    })
      .then((response) => { 
        console.log(response.data.data.examplePage)
        setPage(response.data.data.examplePage) 
      })
      
  }

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

