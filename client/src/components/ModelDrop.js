import React from "react";
import { useKeys } from "../providers/KeyContext";

const ModelDrop = ({ model, setModel }) => {
    const { keys } = useKeys();

    const key_list = ["openai-key", "gemini-key", "anthropic-key"];
    const available = key_list.map((key) => keys[key] ? 0 : 1);
    
    return (
        <div className="model-comps">
            <div className="model-select">
                <select
                    value={model}
                    onChange={(e) => {
                        setModel(e.target.value);
                    }}
                >
                    <optgroup label="OpenAI">
                        <option disabled={available[0]} value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
                        <option disabled={available[0]} value="gpt-4">GPT-4</option>
                        <option disabled={available[0]} value="gpt-4-32k">GPT-4-32k</option>
                        <option disabled={available[0]} value="gpt-4-0125-preview">
                            GPT-4-0125-Preview
                        </option>
                        <option disabled={available[0]} value="gpt-4o">GPT-4o</option>
                        <option disabled={available[0]} value="o1-mini">o1 Mini</option>
                    </optgroup>

                    <optgroup label="Anthropic">
                        <option disabled={available[2]} value="claude-3-opus-20240229">
                            Claude 3 Opus
                        </option>
                        <option disabled={available[2]} value="claude-3-sonnet-20240229">
                            Claude 3 Sonnet
                        </option>
                        <option disabled={available[2]} value="claude-3-haiku-20240307">
                            Claude 3 Haiku
                        </option>
                    </optgroup>

                    <optgroup label="Google">
                        <option disabled={available[1]} value="google-gemini">Google Gemini</option>
                    </optgroup>
                </select>
            </div>
        </div>
    );
};

export default ModelDrop;
