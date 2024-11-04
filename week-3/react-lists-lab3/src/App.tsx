import TourList from "./tourComp/TourList";
import { tours } from "./tourComp/toursData";
import "./App.css";

function App(): JSX.Element {
  return (
    <main>
      <TourList tours={tours} />
    </main>
  );
}

export default App;
