package org.example.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.repositories.ContactRepository;
import org.example.models.Contact;

@Service
public class ContactService {

    private final ContactRepository ContactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.ContactRepository = contactRepository;
    }

    public void saveContact(Contact contact) {
        ContactRepository.save(contact);
    }
}
