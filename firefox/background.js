/*
7/03/2026 Developed by Lachlan Davis, 
Automatically removes ".mcas.ms" from urls containing ".mcas.ms/v5/ui/", 
Enabling users to Download/Upload consent forms other documents on that page.
*/

function removeMcas(details) {
	
	// Effectively shortens details.url to url for code readability
  let url = new URL(details.url);

	// Remove ".mcas.ms" from the url
	url.hostname = url.hostname.replace(".mcas.ms", "");
	
	// Returns the corrected url
	return { redirectUrl: url.href };
}

/*
The listener triggers just before the browser sends a request to a webserver containing ".mcas.ms/v5/ui" in the url"
When triggered the listener will run the removeMcas function above, which then returns the corrected url
Finally the listener sends a new request with the corrected url instead.
*/
browser.webRequest.onBeforeRequest.addListener(
  removeMcas, // Runs the removeMcas function when triggered
  { urls: ["*://*.mcas.ms/v5/ui/*"], types: ["main_frame"] }, // Filter to only trigger on webpages containing ".mcas.ms/v5/ui/"
  ["blocking"] // Stops the initial request that included .mcas.ms (Prevents double entries in your browser history)
);

