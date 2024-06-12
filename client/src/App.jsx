import "./App.css";
import AttractionList from "./components/AttractionList";

function App() {
  return (
    <div className="App flex flex-col items-center">
      <header class="text-center text-4xl text-blue-400 font-bold p-10 w-full">
        เที่ยวไหนดี
      </header>
      <AttractionList />
    </div>
  );
}

export default App;
