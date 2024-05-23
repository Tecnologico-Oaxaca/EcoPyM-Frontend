import React, { useState } from 'react';
import './CalendarDays.css';

function CalendarDays() {
    const daysOfWeek = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SÁB', 'DOM'];
    const days = new Array(daysOfWeek.length).fill(false); // Inicia todos deseleccionados
    const [checkedDays, setCheckedDays] = useState(days);

    const toggleDay = index => {
        const newCheckedDays = [...checkedDays];
        newCheckedDays[index] = !newCheckedDays[index];
        setCheckedDays(newCheckedDays);
    };

    return (
        <div className="calendar-container">
            {checkedDays.map((checked, index) => (
                <div className="calendar-day-container" key={index}>
                    <div className="calendar-day-name">{daysOfWeek[index]}</div>
                    <div
                        className={`calendar-day-checkbox ${checked ? 'calendar-checkbox-checked' : ''}`}
                        onClick={() => toggleDay(index)}
                    >
                        {checked ? '✔' : ''}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CalendarDays;
