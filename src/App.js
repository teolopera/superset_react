import { useEffect } from "react"
import { embedDashboard } from "@superset-ui/embedded-sdk"
import "./App.css"

function App() {
  const getToken = async () => {
    const response = await fetch("http://localhost:3001/guest-token")
    const token = await response.json()
    return token
  }

  useEffect(() => {
    const embed = async () => {
      await embedDashboard({
        id: "bf6704c0-ed92-45fe-bc8e-9c5f5b7c44d9", // given by the Superset embedding UI
        supersetDomain: "http://localhost:8088",
        mountPoint: document.getElementById("dashboard"),
        fetchGuestToken: () => getToken(),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
        },
      })
    }
    if (document.getElementById("dashboard")) {
      embed()
    }
  }, [])

  return (
    <div className="App">
      <h1>Superset Dashboard</h1>
      <div id="dashboard" />
    </div>
  )
}

export default App