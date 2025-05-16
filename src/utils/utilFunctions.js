    const getNextDates = (availableDays, totalDays=7) => {
        const days = [];
        const today = new Date();
        const options = { weekday: "long" };

        for (let i = 0; i < totalDays; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            futureDate.setHours(0, 0, 0, 0); // Ensures no timezone shift

            const dayName = futureDate.toLocaleDateString("en-US", options);

            if (availableDays?.includes(dayName)) {
                days.push({
                    date: futureDate.toLocaleDateString("en-GB").split("/").reverse().join("-"), // Corrected for local time
                    display: `${dayName} (${futureDate.toLocaleDateString("en-GB")})`,
                });
            }
        }
        return days;
    };




    export {getNextDates}