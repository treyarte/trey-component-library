/**
 * Gets the current year in full (i.e. 2024, 2030, etc)
 * @returns 
 */
export const getFullYear = () => ((new Date).getFullYear().toString());

/**
 * Adds the number of days to the passed in date
 * @param date 
 * @param days 
 * @returns 
 */
export const addDaysToDate = (date:Date, days:number) => {
    const dateVal = date.setDate(date.getDate() + days);
    return new Date(dateVal);
}

/**
 * Subtract n amount of years from a given date
 * @param date 
 * @param years 
 */
export const subtractYearsFromDate = (date:Date, years:number) => {
    return new Date(date.setFullYear(date.getFullYear() - years));
}