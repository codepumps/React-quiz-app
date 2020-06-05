import React from 'react'
import DropdownData from "../data.json";


function dropdown({ defValue, data, handleEdit }) {
    return (
        <select defaultValue={defValue} className="dropdown" onChange={(e) => handleEdit(e.target.value)} >
            <option disabled hidden>{defValue}</option>
            {Object.keys(DropdownData[data]).map((keyValue, index) => (
                <option key={index} value={keyValue}>{DropdownData[data][keyValue]}</option>
            ))}
        </ select>
    )
}

export default dropdown
