import React, { useState } from "react";
import "./App.css";
import EvalToggle from "./components/EvalToggle";
import ModelDrop from "./components/ModelDrop";
import PromptBox from "./components/PromptBox";
import Title from "./components/Title";
import ResponseBox from "./components/ResponseBox";
import KeySection from "./components/KeySection";
import Modal from "./components/Modal";

function App() {
    var tester = ""
    const [context, setContext] = useState([]);
    const [model, setModel] = useState("gpt-3.5");
    const [resp, setResp] = useState("In the frozen outskirts of Antarctic bay,\nA community of black and white dwell and play,\nThey’re not humans, certainly not camels,\nThese are the creatures, we know as penguins.\n\nWith feathers sleek and coats of ebony and ivory,\nThey walk with righteousness, strutting nary worry,\nFeaturing a waddle, causing hearts to kindle,\nA joy to watch, their tiny twinkle.\n\nUnder poles of ice and snow, in the wilderness of white,\nIn the daytime glistening glow, or under Aurora's light,\nAbove the frozen sheets they march, with love and charm,\nWoven in the Earth’s Nordic swathe, they warm.\n\nWith bellies round and filled with krill,\nThey slide down slopes for a chilly thrill,\nA spectacle that time forgot, a dance that’s quaint,\nThey flap their wings, like a child's delight, with a restraint.\n\nThe father stands, egg on feet so snug,\nUnder his belly, safe from the icy rug,\nMother goes to sea, her hunt to fill,\nThe dance of survival, a test of will.\n\nUnderneath the water’s icy, mirror-like crust, \nThey swim exquisitely, as dive they must.\nAdmirable acrobats, agile underwater,\nDancing with the currents, amid the colder.\n\nThe stars twinkle above in the frosty ether,\nAs day and night simply blur together,\nIn the icy tundras, where they reside,\nTheir hopes and dreams, in their hearts do hide.\n\nO’ faithful creature of the Southern ice,\nLiving in an endless winter, paying the price,\nThe penguins ale, each song they sing,\nIs a testament to life, in it's simplest thing.\n\nPenguins, charming penguins, enduring the storm,\nIn your black and white coat, a perfect form,\nEmblem of harmony, symbol of survival,\nA caption of life, nature's archival.\n\nFrom Emperor to Adelie, in sizes different,\nTheir existence is truly magnificent,\nFrom rookery to sea, they carry on their way,\nIn the perpetual sunshine or under skies gray.\n\nA tale worth telling, of emperor, of adelie,\nPonder over their journey, as deep as the sea,\nEven in the harshest cold, they found their mirth,\nThat’s the art of the penguin, the song of the earth.\n\nWitness the penguins, their tale so grand,\nStriking a cord, like a symphony band,\nEnduring, thriving, beneath the southern cross,\nIn the game of survival, they’re certainly the boss.\n\nHere's to the penguins, under the iceberg's crest,\nLiving every beat, of life's constant fest,\nEver reminding us, without a single word,\nOf the splendid, chaotic harmony, in this world.\n\nThus, fares the tale of the humble penguin,\nTheir life, their love, persisting within,\nA muster of elegance, a sight so serene,\nUnder the blanket of white, a wonder unseen.");
    const [prompt, setPrompt] = useState("");
    const [modalIsToggled, toggleModal] = useState(false)

    return (
        <div className="App">
            <Modal />
            <div className="flex-container">
                <div className="row top-row">
                    <div className="column first-column">
                        <Title />
                    </div>
                    <div className="column second-column">
                        <div className="bar-options">
                            <ModelDrop model={model} setModel={setModel} />
                            <EvalToggle />
                        </div>
                    </div>
                </div>
                <div className="row middle-row">
                    <div className="column first-column">3</div>
                    <div className="column second-column">
                        <ResponseBox resp={resp} />
                    </div>
                </div>
                <div className="row bottom-row">
                    <div className="column first-column">
                        <KeySection onClick={() => {
                            toggleModal(false)
                        }} />
                    </div>
                    <div className="column second-column">
                        <PromptBox model={model} prompt={prompt} setPrompt={setPrompt} setResp={setResp} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
