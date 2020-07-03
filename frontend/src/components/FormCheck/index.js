import React, { useState, useEffect } from 'react';

const FormCheck = (props) => {
    const { data, name, label } = props;

    const [checked, setChecked] = useState(null);

    useEffect( () => {
        const initialValue = data && data[name] ? data[name] : undefined;
        if(initialValue !== undefined) setChecked(!!initialValue);
    }, [name, data])

    const handleChange = (e) => {
        setChecked(!!e.target.checked);
    }

    const inputProps = {
        type: 'checkbox',
        name,
        checked: !!checked,
        onChange: handleChange,
    }

    return (
        <div className="form-group form-check">
        <label className="form-check-label">
            <input {...inputProps} />
            <span className="form-check-sign"></span>
            {label}
        </label>
    </div>
    );
}

export default FormCheck;