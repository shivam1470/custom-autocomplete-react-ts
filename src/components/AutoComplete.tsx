/**
 * @fileoverview AutoComplete component that renders a list of suggestions based on the user input.
 *  The suggestions are filtered from the given options. The options can be fetched from an API or
 *  can be passed from mock data.
 */

import React, { useState, useEffect, useRef } from "react";
import "./AutoComplete.css";
import { AutoCompleteProps, Option } from "../types/interface";

/**
 * @param {Option[]} options - The list of options to be displayed as suggestions
 * @returns {JSX.Element} - The AutoComplete component
 */
const AutoComplete: React.FC<AutoCompleteProps> = ({ options }) => {
  // State to store the user input
  const [inputValue, setInputValue] = useState("");
  // State to store the filtered options
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  // Ref to the input element
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Filter the options based on the input value
    const filterData = async () => {
      try {
        // Filter the options based on the input value
        const filtered = options.filter((option) =>
          option.value.toLowerCase().includes(inputValue.toLowerCase())
        );

        // Update the state with the filtered options
        setFilteredOptions(filtered);
      } catch (error) {
        // If there is an error while fetching the data, log the error message
        console.error("Error while filtering data:", error);
      }
    };

    filterData();
  }, [inputValue, options]);

  // Handle the input change event
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handle the option click event
  const handleOptionClick = (value: string) => () => {
    setInputValue(value);
    // Clear the suggestions after selection
    setFilteredOptions([]);
  };

  // Handle click outside the input to close the suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setFilteredOptions([]);
      }
    };

    // Add the event listener
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener on cleanup to avoid memory leaks
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // JSX to render
  return (
    <div className="autocomplete-container" ref={inputRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      {filteredOptions.length > 0 && (
        <ul className="autocomplete-options">
          {filteredOptions.map((option) => (
            <li key={option.id} onClick={handleOptionClick(option.value)}>
              {/* Highlight the matching part of the text */}
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightText(option.value, inputValue),
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Helper function to highlight the matching text
function highlightText(text: string, query: string): string {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

export default AutoComplete;
