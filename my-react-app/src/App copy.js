import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fetchData = () => {
    setIsProcessing(true);
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => response.json())
      .then((data) => {
        setUrl(data[0].url);
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isProcessing ? (
          <>
            <p>Loading image...</p>
            <BeatLoader
              css={override}
              size={50}
              color={"#123abc"}
              loading={true}
            />
          </>
        ) : (
          <img src={url} className="App-logo" alt="logo" />
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchData();
            }}
          >
            Reload
          </button>
        </a>
      </header>
    </div>
  );
}

export default App;
