
import * as React from "react";
import * as ReactDOM from "react-dom";
import { RecoilRootProvider } from "./recoilConfig/RecoilRootProvider";

const rootEl = document.getElementById("root");
ReactDOM.render(<RecoilRootProvider />, rootEl);

