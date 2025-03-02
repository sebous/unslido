import { createSignal } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GoogleLogin } from "./components/GoogleLogin";

function App() {
	const [count, setCount] = createSignal(0);

	const handleAuth = async () => {
		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			console.log(res);
			const data = await res.json();

			if (res.ok) {
				console.log("Auth success:", data);
			}
		} catch (error) {
			console.error("Auth failed:", error);
		}
	};

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} class="logo" alt="Vite logo" />
				</a>
				<a href="https://solidjs.com" target="_blank">
					<img src={solidLogo} class="logo solid" alt="Solid logo" />
				</a>
			</div>
			<h1>Vite + Solid</h1>
			<div class="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count()}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p class="read-the-docs">
				Click on the Vite and Solid logos to learn more
			</p>
			<GoogleLogin />
			<button type="button" onClick={handleAuth}>
				Auth
			</button>
		</>
	);
}

export default App;
