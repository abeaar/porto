import {
  EmailIcon,
  ExternalLinkIcon,
} from "@/components/icons/PlatformIcons";

export default function ContactSection() {
  return (
    <section id="contact" className="portfolio-section contact-section">
      <div className="portfolio-section__inner">
        <div className="skills-section__head">
          <div>
            <h2 className="editorial-heading">Contact</h2>
          </div>
        </div>

        <div className="contact-section__side">
          <p>
            I&apos;m open to freelance work, full-time roles, and thoughtful side
            projects. If the problem is useful and the ambition is real,
            let&apos;s talk.
          </p>
          <a href="mailto:abraarjh@gmail.com" className="portfolio-button">
            Start a conversation <EmailIcon size={17} />
          </a>
          <div className="contact-section__links">
            <a
              href="https://github.com/abeaar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ExternalLinkIcon size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/abraarjh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ExternalLinkIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
