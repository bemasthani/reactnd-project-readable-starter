import React from 'react';
import { Input } from 'reactstrap';

export const params = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'somerandomtokenfromcode'
    }
}

// transform collection (array of  objects) into one object with ids as keys
export const normalize = (collection) => {
    let normalizedData = {};
    collection.forEach(item => {
        normalizedData[item.id] = item;
    });
    return normalizedData;
}

// reverse normalizing
export const unNormalize = (obj) => Object.values(obj);

// get ids from collection
export const mapToIds = (collection) => {
    return collection.map(item => item.id);
}

export function generateId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export const filterDeleted = collection => collection.filter(item => !item.deleted);

// methods used for forms
export const validateRequired = value => value ? undefined : 'This field is required';

export const renderInputField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <Input {...input} placeholder={label} type={type} />
        <div className="error-message">{touched && error && <span>{error}</span>}</div>
    </div>
);

export const renderTextareaField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <Input {...input} placeholder={label} type="textarea" />
        <div className="error-message">{touched && error && <span>{error}</span>}</div>
    </div>
);

export const renderSelectField = ({ options, input, label, type, meta: { touched, error } }) => (
    <div>
        <Input {...input} placeholder={label} type="select">
            <option value="" disabled>Category</option>
            {options.map((option) => (
                <option key={option.name} value={option.name}>{option.name}</option>
            ))}
        </Input>
        <div className="error-message">{touched && error && <span>{error}</span>}</div>
    </div>
);
