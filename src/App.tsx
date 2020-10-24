import React from "react";
import PhotoViewer from "./components/PhotoViewer";
import { PhotoViewerProvider } from "./PhotoViewerContext";

function App() {
	return (
		<PhotoViewerProvider>
			<div className="App">
				Hello Mars
				<PhotoViewer />
			</div>
		</PhotoViewerProvider>
	);
}

export default App;
