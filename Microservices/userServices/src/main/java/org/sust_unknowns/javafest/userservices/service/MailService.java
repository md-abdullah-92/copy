package org.sust_unknowns.javafest.userservices.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(String to, String subject, String text) {
        try {
            // Creating a MimeMessageHelper to support HTML content and file attachments
            MimeMessageHelper msg = new MimeMessageHelper(javaMailSender.createMimeMessage(), true);

            // Set the recipient email address, subject, and HTML content of the email
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(text, true); // Set to true to indicate HTML content

            // Send the email using the JavaMailSender instance
            javaMailSender.send(msg.getMimeMessage());

            // Print a success message to the console
            System.out.println("Email sent successfully to " + to);
        } catch (Exception e) {
            // Print an error message if sending fails
            System.out.println("Failed to send email to " + to + ": " + e.getMessage());
            System.out.println(e.getMessage());
        }
    }

    // You can add additional methods here for more complex email functionalities
}
