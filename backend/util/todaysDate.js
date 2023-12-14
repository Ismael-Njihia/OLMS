const todaysDate = () => {
    const today = new Date();
    //date in epoch time
    const date = today.getTime();
    return date;
}
export default todaysDate;


