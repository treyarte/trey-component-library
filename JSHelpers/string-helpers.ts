    /**
     * checks if a string is null or contains white space
     */
    export const isNullOrWhitespace = (str:string|null) => {
        if(!str) return true;

        const trimmedStr = str.trim();

        return trimmedStr.length <= 0;
    }

    /**
     * Removes all special characters from a string and only keeps 
     * Alphanumeric and space characters
     * @param text 
     * @returns 
     */
    export const removeSpecialCharacters = (text:string) => {
        return text.replace(/[^A-Za-z0-9-\s]+/g, '');

    }

    /**
     * Capitalized the first letter in a string
     * @param str 
     * @param isMultiWord 
     * @returns 
     */
    export const capitalizeWord = (str:string, isMultiWord?:boolean) => {    
        if(!str) {
            return "";
        }    
        const length = str.length;


        if(length < 1) return "";

        const capitalStr = `${str.charAt(0).toUpperCase()}${str.substring(1, length)}`;

        if(!isMultiWord) {
            return capitalStr;
        }
        
        const words = str.split(" ");
        let capitalizeWordsArr:string[] = words.map(w => capitalizeWord(w));
        let capitalWords = capitalizeWordsArr.join(" ");
        return capitalWords;
    }