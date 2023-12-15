import bcryptjs from 'bcryptjs';

const decryptPassword = async (password, encryptedPassword) => {
    return await bcryptjs.compare(password, encryptedPassword);
}
export default decryptPassword;