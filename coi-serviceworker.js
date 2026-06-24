/*! coi-serviceworker v0.1.7 - MIT License - Hoanyer & gzuidhof */
if (typeof window === 'undefined') {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
    self.addEventListener("fetch", (event) => {
        if (event.request.mode === "navigate") {
            event.respondWith(
                fetch(event.request).then((response) => {
                    const newHeaders = new Headers(response.headers);
                    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
                    newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: newHeaders,
                    });
                })
            );
        }
    });
} else {
    const currentScript = document.currentScript;
    window.addEventListener("load", async () => {
        try {
            await navigator.serviceWorker.register(currentScript.src);
            if (navigator.serviceWorker.controller) {
                console.log("COI Service Worker pronto.");
            } else {
                window.location.reload();
            }
        } catch (err) {
            console.error("Errore Service Worker COI:", err);
        }
    });
}
