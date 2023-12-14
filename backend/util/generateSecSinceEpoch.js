const generateSecondSinceEpoch = () => {
    const uuid =  Math.floor(Date.now() / 1000);
    return uuid;
};

export default generateSecondSinceEpoch;
