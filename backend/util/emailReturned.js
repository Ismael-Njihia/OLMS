import nodemailer from 'nodemailer';

const sendReturnEmail = async(email, first_Name, last_Name, transation_id, return_date_date) => {
 try{
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: '2003701@students.kcau.ac.ke',
        pass: 'Njihia7507?'
    },
 });

 const message = {
    from: 'Oshwal Library Nairobi <2003701@students.kcau.ac.ke>',
    to: `${first_Name} ${last_Name} <${email}>`,
    subject: 'Book Successfully Borrowed',
    html: `
    <p>Hi ${first_Name} ${last_Name},</p>
    <p>You have successfully Returned Book(s) To Our Facility on ${return_date_date}:</p>
    <ul>
    <li>Transaction ID: <strong>${transation_id}</strong></li>
    </ul>
    <p>Thank you for using our library. Welcome Again</p>
    <p>Regards,</p>
    <p>Oshwal Library Nairobi</p>
    `,
 };

 //send email
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}catch(error){
    console.log('Error occurred: ' + error.message)
}
};
export default sendReturnEmail;