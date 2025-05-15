import http from 'http';
// const http = require("http");
// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  }
});

async function sendEmail(to, subject, html){
    try{
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to, //list of recievers
            subject,
            html
        });
        return {success: true, messageId: info.messageId};
    }catch (error){
        console.error('Error sending email:', error);
        return ({success: false, message : error.message})
    }
}

export  {sendEmail};