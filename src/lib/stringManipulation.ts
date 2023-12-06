const trimText = (text: string | undefined, max: number) => {
    if (!text) {
        return "";
    }
    if (text.length > max+2) {
        return text.slice(0, max) + "..";
    } else {
        return text;
    }
};

export { trimText } 