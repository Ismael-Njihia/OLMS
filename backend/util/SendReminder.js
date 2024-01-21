import nodemailer from "nodemailer";


const sendReminderLate = async(email, first_Name, last_Name, transation_id, return_date_date,fine, totalCost) => {
    try {
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
            subject: 'Book Return Reminder',
            html: `
            <p>Hi ${first_Name} ${last_Name},</p>
            <p>You have not Returned Book(s) To Our Facility on or by ${return_date_date}:</p>
            <ul>
            <li>Transaction ID: <strong>${transation_id}</strong></li>
            </ul>
            <p>You will be charged a fine of ${fine} KES, This Makes it a total Cost of ${totalCost}</p>
            <p>Kindly return Book(s) to avoid further charges</p>
            <p>Regards,</p>
            <p>Oshwal Library Nairobi</p>
            `,
        };

        //send email
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    } catch (error) {
        console.log('Error occurred: ' + error.message)
        
    }
}
export default sendReminderLate;