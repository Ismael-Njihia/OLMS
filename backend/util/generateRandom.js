//gereate 4 random numbers
const generateRandom = () => {
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return randomNumbers;
};

export default generateRandom;