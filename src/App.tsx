// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RecallDetails from "./components/RecallDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recalls/:recallNumber" element={<RecallDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
