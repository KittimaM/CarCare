import React from "react";

const SelectCar = () => {
  const buttons = [
    { id: 1, label: 'Button 1' },
    { id: 2, label: 'Button 2' },
    { id: 3, label: 'Button 3' },
  ];

  const handleSelectCar = (value) => {
    console.log(value);
  }

  return (
    <div className="button-group">
      {buttons.map((button) => (
        <button key={button.id} onClick={() => handleSelectCar(button.id)} >{button.label} </button>
      ))}
    </div>
  );
};

export default SelectCar;
