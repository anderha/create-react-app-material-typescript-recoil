import * as React from "react";
import {
	RecoilRoot
} from 'recoil';
import App from "../App";
import { DebugObserver } from "./DebugObserver";

export function RecoilRootProvider() {
	return (
		<RecoilRoot>
			<DebugObserver />
			<App />
		</RecoilRoot>
	);
}
