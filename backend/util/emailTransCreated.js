import nodemailer from 'nodemailer';

const sendTransactionEmail = async(email, first_Name, last_Name, transation_id, borrow_date_date, expected_return_date_date, totalCost) => {
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
    <p>You have successfully borrowed Book(s) From Our Facility:</p>
    <ul>
    <li>Transaction ID: <strong>${transation_id}</strong></li>
    <li>Borrow Date: <strong>${borrow_date_date}</strong></li>
    <li>Expected Return Date: <strong>${expected_return_date_date}</strong></li>
    <li>Cost: <strong>${totalCost}</strong></li>
    </ul>
    <p>Thank you for using our library.</p>
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
export default sendTransactionEmail;