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
// 4. CONTACT FORM API ROUTE (POST)
// =========================================================
app.post('/api/contact', async (req, res) => {
    // Extract data sent from the HTML form
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        // Redirect if fields are missing. Use 'back' to maintain local URL context.
        return res.redirect('back?status=error'); 
    }

    // A. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS // IMPORTANT: Use a Gmail App Password
        }
    });

    // B. Setup Email Content
    const mailOptions = {
        from: `"${name}" <${email}>`, 
        to: process.env.RECIPIENT_EMAIL || 'your-business-email@example.com', // Where you receive the email
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
        
        // FIX: Redirect using 'back' to prevent the 'Page Not Found' error
        res.redirect('/index.html?status=success'); 
        
    } catch (error) {
        console.error('Error sending email:', error);
        
        // FIX: Redirect using 'back' for failure too
        res.redirect('/index.html?status=failure');
    }
});


// 5. Start the server
app.listen(PORT, () => {
    console.log(`Rudra Apparels Backend listening at http://localhost:${PORT}`);
    console.log(`Access the main website at http://localhost:${PORT}/index.html`);
});