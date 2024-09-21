package org.sust_unknowns.javafest.userservices.controller;

import lombok.extern.slf4j.Slf4j;

import org.sust_unknowns.javafest.userservices.model.User;
import org.sust_unknowns.javafest.userservices.model.RequestUser;
import org.sust_unknowns.javafest.userservices.model.VerifyUser;
import org.sust_unknowns.javafest.userservices.service.UserService;
import org.sust_unknowns.javafest.userservices.service.MailService;
import org.sust_unknowns.javafest.userservices.utils.JwtUtils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.List;

import org.sust_unknowns.javafest.userservices.utils.codeGenarator;

@RestController
@RequestMapping("api/user")
@Slf4j
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    private final codeGenarator codeGenarator;

    private final JwtUtils jwtUtils;

    public UserController(UserService userService, MailService mailService) {
        this.userService = userService;
        this.mailService = mailService;
        this.codeGenarator = new codeGenarator();
        this.jwtUtils = new JwtUtils();
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody RequestUser requestUser) {
        if (bodyCheck(requestUser)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please fill all the fields");
        }
        if (userService.checkUser(requestUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exist");
        }
        User user = new User();
        user.setName(requestUser.getName());
        user.setEmail(requestUser.getEmail());
        user.setPassword(codeGenarator.hashPassword(requestUser.getPassword()));
        user.setRole(requestUser.getRole());
        user.setCode(codeGenarator.generateCode());
        user.setVerified(false);
        user.setAddress(requestUser.getAddress());
        user.setPhone(requestUser.getPhone());
        user.setGender(requestUser.getGender());
        user.setUpazila(requestUser.getUpazila());
        user.setZila(requestUser.getZila());
        user.setOrganization(requestUser.getOrganization());
        userService.createUser(user);
        mailService.sendMail(user.getEmail(), "Agribazaar - Verification Code", formatTheMessage(user.getCode()));
        return ResponseEntity.status(HttpStatus.OK).body(user.getId());
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("File size exceeds the allowable limit!");
    }

    @PostMapping("/verify")
    public ResponseEntity<Object> verifyUser(@RequestBody VerifyUser requestUser) {
        System.out.println(requestUser.getId());
        if (!userService.checkUserByID(requestUser.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not exist");
        }
        User user = userService.getUserById(requestUser.getId());
        log.info(user.getCode());
        log.info(requestUser.getCode());
        if (user.getCode().equals(requestUser.getCode())) {
            user.setVerified(true);
            userService.updateUser(user);
            return ResponseEntity.status(HttpStatus.OK).body("User verified");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong verification code");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody RequestUser requestUser) {

        User user = userService.getUserByEmail(requestUser.getEmail());
        if (codeGenarator.checkPassword(requestUser.getPassword(), user.getPassword())) {
            String token = jwtUtils.generateToken(user.getId());
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", token);

            return ResponseEntity.status(HttpStatus.OK).headers(headers).body(token);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong password");
    }

    // get all farmers
    @GetMapping("/farmers")
    public ResponseEntity<List<User>> getAllFarmers() {
        return ResponseEntity.ok(userService.getAllUserByRole("farmer"));
    }

    @GetMapping("/getOne")
    public ResponseEntity<User> getOne(@RequestHeader("Authorization") String token, @RequestParam String role) {
        String id = jwtUtils.validateToken(token);

        if (id == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Invalid token
        }

        User user = userService.getUserById(id);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // User not found
        }

        // Check if the user's role matches the requested role
        if (!user.getRole().equalsIgnoreCase(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Role mismatch
        }

        return ResponseEntity.ok(user);
    }

    private String formatTheMessage(String code) {

        return "<html>" +
                "<head></head>" +
                "<body>" +
                "<div class='container'>" +
                // "<img src='your_logo.png' alt='KIWI Logo' class='logo'>" +
                "<h1>Hi, Welcome to <span style='color: #425119; font-family: Caveat, cursive;'>agribazaar</span></h1>"
                +
                "<p>Your verification code is: <b>" + code + "</b></p>" +
                "<p>Thank you for choosing us.</p>" +
                "<p>Visit our website at <a href='https://www.agribazaar.com'>www.agribazaar.com</a></p>" +
                "</div>" +
                "</body>" +
                "</html>";

    }

    private boolean bodyCheck(RequestUser requestUser) {
        if (requestUser == null)
            return true;
        if (requestUser.getPassword().length() < 6)
            return true;
        if (!requestUser.getEmail().contains("@"))
            return true;
        return requestUser.getRole() == null;
    }

    public void updateUser() {
    }

    public void getUser() {
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUser() {
        return ResponseEntity.ok(userService.getAllUser());
    }

    public void deleteUser() {
    }

    @PostMapping("/resend")
    public ResponseEntity<Boolean> resendCode(@RequestHeader("Authorization") String token) {
        String id = jwtUtils.validateToken(token);
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        User user = userService.getUserById(id);
        mailService.sendMail(user.getEmail(), "Agribazaar - Verification Code (Resend)",
                formatTheMessage(user.getCode()));
        return ResponseEntity.ok(true);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfileById(
            @RequestBody RequestUser updateRequest,
            @RequestParam("email") String email) {

        try {
            if (email == null || updateRequest == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email or update request is missing.");
            }
            log.info("Received email for update: {}", email);

            User user = userService.getUserByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
            log.info("Updating user with email: {}", user.getEmail());

            user.setName(updateRequest.getName());
            log.info("Updated name: {}", updateRequest.getName());

            // Hash the password only if it was changed
            if (updateRequest.getPassword() != null && !updateRequest.getPassword().isEmpty()) {
                user.setPassword(codeGenarator.hashPassword(updateRequest.getPassword()));
            }

            user.setAddress(updateRequest.getAddress());
            log.info("Updated address: {}", updateRequest.getAddress());

            user.setPhone(updateRequest.getPhone());
            user.setGender(updateRequest.getGender());
            user.setUpazila(updateRequest.getUpazila());
            user.setZila(updateRequest.getZila());
            user.setDivision(updateRequest.getDivision());
            user.setOrganization(updateRequest.getOrganization());
            log.info("Updated organization: {}", updateRequest.getOrganization());
            user.setAvatar(updateRequest.getAvatar());

            userService.updateUser(user);
            return ResponseEntity.ok(user);

        } catch (MaxUploadSizeExceededException e) {
            log.error("File upload size exceeded", e);
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("File upload size exceeded.");
        } catch (Exception e) {
            log.error("Error updating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the user.");
        }
    }
}