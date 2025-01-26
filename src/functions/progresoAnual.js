export default function progresoAnual(habits) {
    if(!habits){
        return('no habits')
    }

    let totalDatesTracked = [];

    habits.forEach(habit => {
        totalDatesTracked = totalDatesTracked.concat(habit.datesTracked);
    });

    
    const oldestDate = new Date(Math.min(...totalDatesTracked.map(date => new Date(date).getTime())));

    return { totalDatesTracked, oldestDate };
}