import React, { useState } from 'react';
import './CalendarDays.css';

function CalendarDays({ onDaySelection }) {
    const daysOfWeek = [
        { id: 1, name: 'LUN' },
        { id: 2, name: 'MAR' },
        { id: 3, name: 'MIE' },
        { id: 4, name: 'JUE' },
        { id: 5, name: 'VIE' },
        { id: 6, name: 'SÁB' },
        { id: 7, name: 'DOM' }
    ];
    
    //const days = new Array(daysOfWeek.length).fill(false); // Inicia todos deseleccionados
    const [checkedDays, setCheckedDays] = useState(new Array(daysOfWeek.length).fill(false));

    const toggleDay = index => {
        const newCheckedDays = [...checkedDays];
        newCheckedDays[index] = !newCheckedDays[index];
        setCheckedDays(newCheckedDays);
        // Mapea y filtra para enviar solo los IDs
        onDaySelection(newCheckedDays.map((checked, i) => checked ? daysOfWeek[i].id : null).filter(id => id !== null));
    };

    return (
        <div className="calendar-container">
            {daysOfWeek.map((day, index) => (
                <div className="calendar-day-container" key={day.id}>
                    <div className="calendar-day-name">{day.name}</div>
                    <div
                        className={`calendar-day-checkbox ${checkedDays[index] ? 'calendar-checkbox-checked' : ''}`}
                        onClick={() => toggleDay(index)}
                    >
                        {checkedDays ? '✔' : ''}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CalendarDays;
