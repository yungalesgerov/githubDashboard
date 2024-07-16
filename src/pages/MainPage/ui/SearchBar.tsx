import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Search repositories..."
    />
  );
};

export default SearchBar;
