/**
 * Generate HTML content for email verification
 * @param {string} username - Username of the recipient
 * @param {string} verificationUrl - Verification URL
 * @returns {string} - HTML content
 */
export const generateVerificationHtml = (username, verificationUrl) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hello, ${username}!</h2>
            <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
            <p><a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block;">Verify Email</a></p>
            <p>If you did not request this, please ignore this email.</p>
        </div>
    `;
};

/**
 * Generate plain text content for email verification
 * @param {string} username - Username of the recipient
 * @param {string} verificationUrl - Verification URL
 * @returns {string} - Plain text content
 */
export const generateVerificationText = (username, verificationUrl) => {
    return `
        Hello, ${username}!
    
        Thank you for registering. Please verify your email address by clicking the link below:
        ${verificationUrl}
    
        If you did not request this, please ignore this email.
    `;
};
