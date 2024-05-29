"use server";

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
import connectDB from "@/utils/connectDB";
import Otp from "../../models/otp";
import { getSession } from "./session";

const audienceId = process.env.RESEND_AUDIENCE_ID;

export async function sendEmailForOTP(state, formData) {
    try {
        let email = formData.get("email");
        if (!email) {
            return {
                status: 400,
                message: "Email is required",
            }
        }
        let emailDomain = email.split("@")[1];
        const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com"];
        if (!allowedDomains.includes(emailDomain)) {
            return {
                status: 400,
                message: "Only Gmail, Yahoo, and Hotmail are allowed",
            }
        }
        let otp = Math.floor(1000 + Math.random() * 9000);
        const { data, error } = await resend.emails.send({
            from: "Mohd Ramzan Shareef <admin@ramzanshareef.me>",
            to: email,
            subject: "OTP Verification",
            react: EmailTemplateForOTP({ email, otp })
        });
        if (error) {
            return {
                status: 400,
                message: error.message,
            }
        }
        await connectDB();
        if (await Otp.findOne({ email })) {
            return {
                status: 400,
                message: "OTP already sent. Please check your email.",
            }
        }
        const newEntry = await Otp.create({
            email: email,
            otp: otp,
        })
        await newEntry.save();
        return {
            status: 200,
            message: "OTP sent successfully",
            email: email,
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
        }
    }
    catch (error) {
        return {
            status: 400,
            message: error.message,
        }
    }
}

export async function sendEmailForSubscription(state, formData) {
    try {
        if (!formData.get("otp")) {
            return {
                status: 402,
                message: "OTP is required",
            }
        }
        let email = formData.get("email");
        if (!email) {
            return {
                status: 402,
                message: "Email is required",
            }
        }
        let existingOTPDoc = await Otp.findOne({ email });
        if (!existingOTPDoc) {
            return {
                status: 400,
                message: "No OTP found for this email. Please request a new OTP and verify your email first."
            }
        }
        if (parseInt(existingOTPDoc.otp) === parseInt(formData.get("otp"))) {
            const { data, error } = await resend.emails.send({
                from: "Mohd Ramzan Shareef <admin@ramzanshareef.me>",
                to: email,
                subject: "Subscription Confirmation",
                react: EmailTemplateForSubscribing({ email, firstName: formData.get("firstName"), lastName: formData.get("lastName") })
            });
            if (error) {
                return {
                    status: 400,
                    message: error.message,
                }
            }
            resend.contacts.create({
                email: email,
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                audienceId: audienceId,
                unsubscribed: false,
            });
            await Otp.findOneAndDelete({ email });
            const session = await getSession();
            session.isSub = "true";
            await session.save();
            return {
                status: 200,
                message: "Thank you for subscribing!",
            }
        }
        else {
            return {
                status: 400,
                message: "Invalid OTP. Please enter the correct OTP."
            }
        }
    }
    catch (error) {
        return {
            status: 400,
            message: error.message,
        }
    }
}

const EmailTemplateForSubscribing = ({ email, firstName, lastName }) => (
    <div style={{ backgroundColor: '#f9fafb', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <div style={{ maxWidth: '768px', margin: '32px auto', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', padding: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Welcome to My Portfolio!</h1>
            </div>
            <div style={{ padding: '24px' }}>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>Hello {firstName} {lastName},</p>
                <p style={{ marginTop: '8px', color: '#4a5568', lineHeight: '1.6' }}><b>Thank you</b> for subscribing to my portfolio website. Im thrilled to have you here!</p>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>As a subscriber, youll be the first to know about:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '16px', color: '#4a5568' }}>
                    <li>My Profile Updates</li>
                    <li>My Latest Projects and Creations</li>
                    <li>My Social Media Updates</li>
                    <li>and much more....</li>
                </ul>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>
                    Feel free to explore more on my <a href="https://ramzanshareef.me" style={{ color: '#667eea', textDecoration: 'underline' }}>website</a> or connect with me on <a href="https://linkedin.com/in/ramzanshareef" style={{ color: '#667eea', textDecoration: 'underline' }}>LinkedIn</a> and <a href="https://github.com/itisRamzan" style={{ color: '#667eea', textDecoration: 'underline' }}>GitHub</a>.
                </p>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>Looking forward to sharing my journey with you!</p>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>Best regards,</p>
                <p style={{ color: '#4a5568', fontWeight: 'bold' }}>Mohd Ramzan Shareef</p>
            </div>
            <div style={{ backgroundColor: '#edf2f7', padding: '24px', textAlign: 'center', color: '#a0aec0' }}>
                <p style={{ fontSize: '12px', margin: 0 }}>&copy; 2024 Mohd Ramzan Shareef. All rights reserved.</p>
            </div>
        </div>
    </div>
);

const EmailTemplateForOTP = ({ email, otp }) => (
    <div style={{ backgroundColor: '#f9fafb', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <div style={{ maxWidth: '768px', margin: '32px auto', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', padding: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>OTP Verification</h1>
            </div>
            <div style={{ padding: '24px' }}>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>Hello {email},</p>
                <p style={{ marginTop: '8px', color: '#4a5568', lineHeight: '1.6' }}>Your OTP for verification is <b>{otp}</b></p>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>Please enter this OTP in the verification form to complete the process.</p>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>If you did not request this OTP, please ignore this email.</p>
                <p style={{ marginTop: '16px', color: '#4a5568', lineHeight: '1.6' }}>Best regards,</p>
                <p style={{ color: '#4a5568', fontWeight: 'bold' }}>Mohd Ramzan Shareef</p>
            </div>
            <div style={{ backgroundColor: '#edf2f7', padding: '24px', textAlign: 'center', color: '#a0aec0' }}>
                <p style={{ fontSize: '12px', margin: 0 }}>&copy; 2024 Mohd Ramzan Shareef. All rights reserved.</p>
            </div>
        </div>
    </div>
);