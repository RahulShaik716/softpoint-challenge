import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import "./style.css";
import Loading from "./components/Loading";
import InternetStatus from "./components/InternetStatus";
function App() {
  return (
    <InternetStatus>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      </ErrorBoundary>
    </InternetStatus>
  );
}

export default App;
