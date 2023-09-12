import { useState } from "react";

interface InputDateInterface {
    label: string;
    value?: any;
    onChange : (value: any ) => void | undefined;
}

const InputDate: React.FC<InputDateInterface> = ({ label, value, onChange }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className='date-input flex flex-col'>
            <label>{label} :</label>
            <input type="date" value={value} onChange={handleChange} />
        </div>
    )
}

export default InputDate;