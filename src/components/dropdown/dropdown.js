import React, { useState } from 'react'
import './dropdown.scss'

const Dropdown = (props) => {
    const { options = [], selected } = props
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(s => !s);

    function handleChange(option) {
        props.onClick(option)
        setIsOpen(false)
    }

    const renderOption = (option) => {
        return (
            <div key={option.value}
                role="option"
                className="option"
                onClick={() => handleChange(option)}
                aria-selected={isOpen ? 'true' : 'false'}
            >
                {
                    selected.value === option.value ?
                        <span className="color-green">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="8" />
                            </svg>
                        </span>
                        :
                        <span>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            </svg>
                        </span>
                }

                {option.label}
            </div>
        )
    }

    return (
        <div className={`dropdown ${isOpen ? 'open' : ''}`}>
            <div
                className={`dropdown-selected ${selected.value || selected.label === '' ? 'bc-green' : ''}`}
                onClick={toggle}
            >
                {selected.label ? selected.label : options[0].label}
            </div>

            <div className="dropdown-content">
                {
                    options.length > 0 && options.map(o => renderOption(o))
                }
            </div>

        </div>
    )
}

export default Dropdown