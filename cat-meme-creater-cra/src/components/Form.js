import React from "react";

const Form = ({ updateMainCat }) => {
    const includesEnglish = (text) => /[e-z|A-Z]/i.test(text);
    const [value, setValue] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    function handleInputChange(e) {
        const userValue = e.target.value;
        setErrorMessage("");
        if (!includesEnglish(userValue)) {
            setErrorMessage("Only english please");
        }
        setValue(userValue.toUpperCase());
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        if (value === "") {
            setErrorMessage("Empty value is not allowed");
            return;
        }
        updateMainCat(value);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Write your text"
                value={value}
                onChange={handleInputChange}
            />
            <button type="submit">Create</button>
            <p style={{ color: "red" }}>{errorMessage}</p>
        </form>
    );
};

export default Form;