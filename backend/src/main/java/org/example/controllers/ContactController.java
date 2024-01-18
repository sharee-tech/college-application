package org.example.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import org.example.services.ContactService;
import org.example.models.Contact;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/create")
    public void createContact(@RequestBody Contact contact) {
        contactService.saveContact(contact);
    }
}
