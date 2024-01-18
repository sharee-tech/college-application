import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div>
      <main className="container">
        <h2>Please fill out the form to contact the development team</h2>
        <div className="container">
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
