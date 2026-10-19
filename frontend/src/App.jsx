
import WabaConnect from "./pages/WabaConnect";
import WabaDashboard from "./pages/WabaDashboard";

function App() {
  const isDashboardPreview =
    import.meta.env.DEV &&
    window.location.pathname === "/dashboard-preview";

  if (isDashboardPreview) {
    return <WabaDashboard />;
  }

  return <WabaConnect />;
}

export default App;
