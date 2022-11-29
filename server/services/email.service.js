const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require("path");

const emailTemplateObject = require('../emailTemplates/templates');
const {SERVER_URL} = require("../configs/config");

const sendEmail = async (userMail, emailAction, data = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD
        }
    });

    const templateParser = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'emailTemplates')
        }
    });

    const emailInfo = emailTemplateObject[emailAction];
    const html = await templateParser.render(emailInfo.templateName, {...data, serverURL: SERVER_URL});

    return transporter.sendMail({
        from: 'dev',
        to: userMail,
        subject: emailInfo.subject,
        html
    });
};

module.exports = {sendEmail};