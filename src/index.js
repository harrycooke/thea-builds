// import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
import { LocalizeProvider } from 'react-localize-redux'

//import "./index.css";
import App from "./App";
import store from "./store";
import { initAmplitude } from './utils/amplitude';

initAmplitude();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,


// 
//note to have something new to commit
//and again
//Providing localized store values  
  // (
  //   <Provider store={this.state.store}>
  //     <LocalizeProvider store={this.state.store}>
  //       <App />
  //     </LocalizeProvider>
  //   </Provider>
  // ),
  document.getElementById("root")
);

console.log("inside index.js")
serviceWorker.register({
  onUpdate: registration => {
    console.log("in on update");

    const waitingServiceWorker = registration.waiting

    if (waitingServiceWorker) {
      console.log("waitingServiceWorker");

      waitingServiceWorker.addEventListener("statechange", event => {
        console.log("state changed");

        if (event.target.state === "activated") {
          console.log("reload window");

          window.location.reload()
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
      console.log("skipped waiting");
    }
  }
});