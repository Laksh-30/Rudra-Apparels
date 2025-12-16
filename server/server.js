// Load environment variables from .env file
require('dotenv').config();

// 1. Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); 
const path = require('path'); 

// 2. Initialize the Express application
const app = express();
// Use port 3000 unless specified in .env
const PORT = process.env.PORT || 3000; 

// 3. Middleware setup
// Allows Express to read data sent in the request body (JSON and form data)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Serve Static Files (Your Frontend HTML/CSS/JS) ---
// This tells the server to look for static files (like index.html, style.css) 
// in the directory one level up ('..'), which is your project root.
app.use(express.static(path.join(__dirname, '..')));


// =========================================================
// 4. CONTACT FORM API ROUTE (POST) - MODIFIED FOR ASYNC/JSON
// =========================================================
app.post('/api/contact', async (req, res) => {
    // Extract data sent from the HTML form
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        // FIX 1: Return JSON error status instead of redirect
        return res.status(400).json({ 
            status: 'failure', // The status string your JavaScript looks for
            message: 'Validation Error: Please fill in all required fields.' 
        }); 
    }

    // A. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS
        }
    });

    // B. Setup Email Content
    const mailOptions = {
        from: `"${name}" <${email}>`, 
        // Use the environment variable for the recipient email
        to: process.env.RECIPIENT_EMAIL || 'your-business-email@example.com', 
        subject: `[Rudra Inquiry] ${subject}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

    // C. Send the Email and handle success/failure
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent from ${email} regarding: ${subject}`);
        
        // FIX 2: Return JSON success status instead of redirect
        res.json({ status: 'success', message: 'Email sent successfully!' });
        
    } catch (error) {
        console.error('Error sending email:', error);
        
        // FIX 3: Return JSON failure status instead of redirect
        res.status(500).json({ 
            status: 'failure', 
            message: 'Internal server error. Failed to send email.' 
        });
    }
});


// 5. Start the server
app.listen(PORT, () => {
    console.log(`Rudra Apparels Backend listening at http://localhost:${PORT}`);
    console.log(`Access the main website at http://localhost:${PORT}/index.html`);
});