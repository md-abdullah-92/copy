package org.sust_unknowns.javafest.userservices.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfiguration {

    // Bean for JavaMailSender
    @Bean
    public JavaMailSender getJavaMailSender() {
        // Email and password for the mail sender
        String mail = "abdullahalmahadiapurbo@gmail.com";
        String password = "btsluglhsxisxskd";

        // Create and configure JavaMailSenderImpl instance
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com"); // Set SMTP host
        mailSender.setPort(587); // Set SMTP port
        mailSender.setUsername(mail); // Set email address
        mailSender.setPassword(password); // Set email password

        // Set JavaMail properties
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp"); // Protocol
        props.put("mail.smtp.auth", "true"); // Enable authentication
        props.put("mail.smtp.starttls.enable", "true"); // Enable STARTTLS

        return mailSender; // Return configured mail sender
    }
}
