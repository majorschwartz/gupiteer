import "./App.css";
import EvalToggle from "./components/EvalToggle";
import ModelDrop from "./components/ModelDrop";
import Title from "./components/Title";

function App() {
    return (
        <div className="App">
            <div class="flex-container">
                <div class="row top-row">
                    <div class="column first-column">
                        <Title />
                    </div>
                    <div class="column">
                        <div className="bar-options">
                            <ModelDrop />
                            <EvalToggle />
                        </div>
                    </div>
                </div>
                <div class="row middle-row">
                    <div class="column first-column">3</div>
                    <div class="column">4</div>
                </div>
                <div class="row bottom-row">
                    <div class="column first-column">5</div>
                    <div class="column">6</div>
                </div>
            </div>
        </div>
    );
}

export default App;
