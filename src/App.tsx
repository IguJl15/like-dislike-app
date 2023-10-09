import "./App.css";
import { TopicList } from "./components/TopicList";
import TopicsContextProviders from "./contexts/topics";

function App() {
  return (
    <TopicsContextProviders>
      <TopicList />
    </ TopicsContextProviders>
  );
}
export default App;
