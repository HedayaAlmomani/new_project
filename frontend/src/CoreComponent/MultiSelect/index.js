import React from 'react';
import { Form, Dropdown, ListGroup } from 'react-bootstrap';
import './style.scss'; 

const MultiSelect = ({ options, selectedValues, onChange, label , required , errorMsg}) => {
  const handleSelect = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(item => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <Form.Group className="multi-select-group">
      <Form.Label className="multi-select-label">{label}{required ? <span className='star'>*</span>:""}</Form.Label>
      <Dropdown className="multi-select-dropdown">
        <Dropdown.Toggle className="multi-select-toggle"  id="dropdown-basic">
          {selectedValues.length > 0 ? `${selectedValues.length} Selected` : 'Select options'}
        </Dropdown.Toggle>

        <Dropdown.Menu className="multi-select-menu">
          {options.map(option => (
            <Dropdown.Item
              as="button"
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`multi-select-item ${selectedValues.includes(option.value) ? 'selected' : ''}`}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <span className='error-msg-container'>{errorMsg}</span>

      {selectedValues.length > 0 && (
        <ListGroup className="multi-select-list mt-2">
          {selectedValues.map((value, index) => (
            <ListGroup.Item key={index} className="multi-select-list-item">
              {options.find(option => option.value === value).label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form.Group>
  );
};

export default MultiSelect;
