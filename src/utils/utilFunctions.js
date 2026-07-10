const getNextDates = (availableDays, totalDays = 7) => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < totalDays; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        futureDate.setHours(0, 0, 0, 0); // Ensures no timezone shift

        const dayName = futureDate.toLocaleDateString("en-GB", { weekday: "long" })
        
        if (availableDays?.includes(dayName)) {
            days.push({
                date: futureDate.toLocaleDateString("en-GB").split("/").reverse().join("-"), // Corrected for local time
                display: `${dayName} (${futureDate.toLocaleDateString("en-GB")})`,
            });
        }
    }
    return days;
};




const formatTime = (time) => {
    if (!time) return '';
    return new Date(`2025-02-09T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};



export { getNextDates, formatTime }
