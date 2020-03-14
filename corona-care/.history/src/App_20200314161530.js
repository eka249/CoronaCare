import React from "react";
import "./App.css";
import { Button } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";

function App() {
  const ButtonExampleGroup = () => (
    <Button.Group>
      <Button onClick>Volunteer My Services</Button>
      <Button>Request a Service</Button>
    </Button.Group>
  );
  return (
    <div className="App">
      <header className="App-header">
        {/* <img
          src="https://media.giphy.com/media/WrxoaVPiq0cG4/giphy.gif"

        /> */}
        <p>CoronaCare</p>
        <br></br>
        <p>*Placeholder inspirational quote*</p>
        <ButtonExampleGroup />
      </header>
    </div>
  );
}

export default App;
