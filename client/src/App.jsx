import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [inputData, setInputData] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataArray = JSON.parse(inputData);
            const response = await axios.post('http://localhost:3000/bfhl', { data: dataArray });
            setResult(response.data);
        } catch (error) {

            console.error('Error:', error);
            setResult({ is_success: false, message: error.response?.data?.message || 'An error occurred' });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter JSON Data:
                    <input
                        type="text"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                        placeholder='e.g., ["M","1","334","4","B"]'
                    />
                </label>
                <button type="submit">Submit</button>
            </form>

            <div>
                <h2>Result:</h2>
                <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
        </div>
    );
}

export default App;
