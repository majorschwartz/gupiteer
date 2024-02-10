import "./App.css";
// import Main from "./components/Main";
// import Sidebar from "./components/Sidebar";

function App() {
    return (
        <div className="App">
            <div class="flex-container">
                <div class="row top-row">
                    <div class="column first-column num-one">
                        1
                    </div>
                    <div class="column num-two">2</div>
                </div>
                <div class="row middle-row">
                    <div class="column first-column num-three">3</div>
                    <div class="column num-four">4</div>
                </div>
                <div class="row bottom-row">
                    <div class="column first-column num-five">5</div>
                    <div class="column num-six">6</div>
                </div>
            </div>
        </div>
    );
}

export default App;
