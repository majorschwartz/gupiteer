import React, { useState } from "react";

const ModelDrop = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }
    
    return (
        <div>
            Model Drop
            <div>
                <select value={selectedValue} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    // Add more options here
                </select>
                {selectedValue && <div>You selected: {selectedValue}</div>}
            </div>

        </div>
    );
}

export default ModelDrop;