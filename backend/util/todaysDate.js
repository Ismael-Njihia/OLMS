const todaysDate = () => {
    const today = new Date();
    // current time
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const date = today.getDate() +"/"+ (today.getMonth() + 1) + '/' + today.getFullYear() 
    return time +" " +date;
}
export default todaysDate;
