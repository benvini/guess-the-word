export const replaceChar = (str: string, char: string, index: number) => {
    let newStringArray = str.split("");
    newStringArray[index] = char;
    let newString = newStringArray.join("");

    return newString;
};
