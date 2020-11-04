import React from "react";
import PhotoViewer from "./components/PhotoViewer/PhotoViewer";
import { PhotoViewerProvider } from "./PhotoViewerContext";

function App(): JSX.Element {
  return (
    <PhotoViewerProvider>
      <div className="App">
        <PhotoViewer />
      </div>
    </PhotoViewerProvider>
  );
}

export default App;
