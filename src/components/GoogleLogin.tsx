import { onMount, onCleanup } from "solid-js";

declare global {
	interface Window {
		google: any;
	}
}

export function GoogleLogin() {
	onMount(() => {
		const initializeGoogleButton = () => {
			window.google.accounts.id.initialize({
				client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
				callback: handleCredentialResponse,
			});

			window.google.accounts.id.renderButton(
				document.getElementById("googleButton"),
				{ theme: "outline", size: "large" }
			);
		};

		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.onload = initializeGoogleButton;
		document.body.appendChild(script);

		onCleanup(() => {
			document.body.removeChild(script);
		});
	});

	const handleCredentialResponse = async (response: any) => {
		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ credential: response.credential }),
			});

			const data = await res.json();
			if (res.ok) {
				// Handle successful login
				console.log("Logged in user:", data);
			}
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return <div id="googleButton" />;
}
