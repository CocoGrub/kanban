import { Panel } from './components/index';
import './App.css';

function App() {
  return (
    <div className="App">
      <Panel
        items={[
          { text: 'Взять топор' },
          { text: 'Пойти в лес' },
          { text: 'Срубить дерево' },
          { text: 'Собрать бревна' },
        ]}
      />
    </div>
  );
}

export default App;
