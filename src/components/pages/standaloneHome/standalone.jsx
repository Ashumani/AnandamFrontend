/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import logo from "../../../standalone_assets/images/Anandam.png";
import heroImage from "../../../standalone_assets/images/epfo.png";
import aboutImage from "../../../standalone_assets/images/about-dec.png";

import serviceIcon01 from "../../../standalone_assets/images/service-icon-01.png";
import serviceIcon02 from "../../../standalone_assets/images/service-icon-02.png";
import serviceIcon03 from "../../../standalone_assets/images/service-icon-03.png";
import serviceIcon04 from "../../../standalone_assets/images/service-icon-04.png";

import serviceImage01 from "../../../standalone_assets/images/services-image.jpg";
import serviceImage02 from "../../../standalone_assets/images/services-image-02.jpg";
import serviceImage03 from "../../../standalone_assets/images/services-image-03.jpg";
import serviceImage04 from "../../../standalone_assets/images/services-image-04.jpg";

import portfolio01 from "../../../standalone_assets/images/img/1.jpg";
import portfolio02 from "../../../standalone_assets/images/img/2.jpg";
import portfolio03 from "../../../standalone_assets/images/img/3.jpg";
import portfolio04 from "../../../standalone_assets/images/img/4.jpg";
import portfolio05 from "../../../standalone_assets/images/img/5.jpg";
import portfolio06 from "../../../standalone_assets/images/img/4.png";

import blog01 from "../../../standalone_assets/images/blog-post-01.jpg";
import blog02 from "../../../standalone_assets/images/blog-post-02.jpg";
import blog03 from "../../../standalone_assets/images/blog-post-03.jpg";
import blog04 from "../../../standalone_assets/images/blog-post-04.jpg";
import authorImage from "../../../assets/img/3.jpg";

import phoneIcon from "../../../standalone_assets/images/phone-icon.png";
import emailIcon from "../../../standalone_assets/images/email-icon.png";
import locationIcon from "../../../standalone_assets/images/location-icon.png";

import { inquiryRegister } from "../../api/services";
import Swal from "sweetalert2";

import "./standalone.css";

const services = [
  {
    id: "epf",
    title: "EPF Consulting",
    shortTitle: "EPF",
    icon: serviceIcon01,
    image: serviceImage01,
    heading: "EPF Compliance, Returns & Employee Support",
    description:
      "Professional support for EPF-related compliance, documentation, reporting and employee claim processes. We help employers and employees navigate EPFO requirements with a structured and transparent approach.",
    points: [
      "EPF registration and compliance support",
      "Monthly contribution and return assistance",
      "Employee documentation guidance",
      "EPF claim and withdrawal assistance",
      "Compliance and reporting support",
      "Practical labour compliance guidance",
    ],
  },
  {
    id: "esic",
    title: "ESIC Consultancy",
    shortTitle: "ESIC",
    icon: serviceIcon02,
    image: serviceImage02,
    heading: "ESIC Compliance & Employee Benefit Support",
    description:
      "Comprehensive ESIC consultancy for registration, contribution calculations, return filing and employee benefit guidance. Our approach focuses on accurate documentation and timely compliance.",
    points: [
      "ESIC registration support",
      "Contribution calculation assistance",
      "Monthly return filing support",
      "Employee benefit guidance",
      "Claim process assistance",
      "Compliance documentation",
    ],
  },
  {
    id: "dsc",
    title: "Digital Signature",
    shortTitle: "DSC",
    icon: serviceIcon03,
    image: serviceImage03,
    heading: "DSC Support for EPFO Portal",
    description:
      "Digital Signature Certificates provide secure authentication for employer transactions on online portals. We provide guidance for DSC setup and EPFO portal registration.",
    points: [
      "Identity authentication",
      "EPFO portal DSC registration",
      "Secure online transactions",
      "Data integrity and authenticity",
      "Reduced paperwork",
      "Faster digital processing",
    ],
  },
  {
    id: "labour",
    title: "Labour Solutions",
    shortTitle: "LABOUR",
    icon: serviceIcon04,
    image: serviceImage04,
    heading: "Practical Labour Compliance Solutions",
    description:
      "We help organizations address labour-related documentation, compliance and employee support requirements through structured processes and practical guidance.",
    points: [
      "Compliance process guidance",
      "Employee documentation",
      "Grievance support",
      "EPF & ESIC assistance",
      "Digital and transparent solutions",
      "Compliance process improvement",
    ],
  },
  {
    id: "training",
    title: "Workshops",
    shortTitle: "TRAINING",
    icon: serviceIcon01,
    image: serviceImage01,
    heading: "Workshops & Compliance Awareness",
    description:
      "Awareness sessions and practical workshops can help employees and organizations understand EPF, ESIC and related compliance processes.",
    points: [
      "EPF awareness",
      "ESIC awareness",
      "Employee rights and benefits",
      "Documentation guidance",
      "Compliance process walkthroughs",
      "Practical Q&A sessions",
    ],
  },
];

const team = [
  portfolio01,
  portfolio02,
  portfolio03,
  portfolio04,
  portfolio05,
  portfolio06,
];

const blogs = [
  {
    image: blog01,
    category: "EPFO",
    title: "Understanding EPF compliance and employee benefits",
    description:
      "Practical information to help employers and employees understand EPF-related processes.",
  },
  {
    image: blog02,
    category: "EPF",
    title: "How to check your EPF balance",
    description:
      "An easy overview of common ways employees can access their PF information.",
  },
  {
    image: blog03,
    category: "ESIC",
    title: "Understanding ESIC benefits",
    description:
      "A simple introduction to employee benefits available under the ESIC framework.",
  },
  {
    image: blog04,
    category: "EPFO",
    title: "EPFO account and password support",
    description:
      "Helpful guidance for common EPFO account access issues.",
  },
];

const Standalone = () => {
  const [activeService, setActiveService] = useState("epf");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const selectedService =
    services.find((service) => service.id === activeService) || services[0];

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const addInquiry = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      Swal.fire({
        title: "Please complete all fields",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      const response = await inquiryRegister(form);

      if (response?.status === true) {
        Swal.fire({
          title: response.message || "Inquiry submitted successfully",
          text: "Our team will get back to you.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: response?.message || "Unable to submit your inquiry",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);

      Swal.fire({
        title: "Something went wrong",
        text: "Please try again later.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const closeMobileMenu = () => setMobileMenu(false);

  return (
    <div className="an-landing">
      {/* Top information strip */}
      <div className="an-topbar">
        <div className="an-container an-topbar-inner">
          <div className="an-topbar-info">
            <a href="mailto:anand.esipf@gmail.com">
              <i className="fa fa-envelope" />
              anand.esipf@gmail.com
            </a>
            <a href="tel:+918793143976">
              <i className="fa fa-phone" />
              +91 87931 43976
            </a>
          </div>

          <div className="an-topbar-right">
            <span>Professional EPF & ESIC Consultancy</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="an-header">
        <div className="an-container an-header-inner">
          <a href="#top" className="an-brand" onClick={closeMobileMenu}>
            <img src={logo} alt="Anandam" />
          </a>

          <button
            type="button"
            className={`an-menu-button ${mobileMenu ? "open" : ""}`}
            onClick={() => setMobileMenu((value) => !value)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`an-nav ${mobileMenu ? "open" : ""}`}>
            <a href="#top" onClick={closeMobileMenu}>Home</a>
            <a href="#about" onClick={closeMobileMenu}>About</a>
            <a href="#services" onClick={closeMobileMenu}>Services</a>
            <a href="#process" onClick={closeMobileMenu}>How It Works</a>
            <a href="#insights" onClick={closeMobileMenu}>Insights</a>
            <a href="#contact" onClick={closeMobileMenu}>Contact</a>
            <a className="an-login-btn" href="/login">
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section id="top" className="an-hero">
          <div className="an-hero-pattern" />

          <div className="an-container an-hero-grid">
            <div className="an-hero-content">
              <div className="an-eyebrow">
                <span className="an-eyebrow-dot" />
                EPF • ESIC • Labour Compliance
              </div>

              <h1>
                Simplifying
                <span> EPF & ESIC </span>
                compliance for your organization.
              </h1>

              <p className="an-hero-text">
                Professional consultancy and practical support for employers
                and employees across EPF, ESIC, digital compliance and labour
                documentation.
              </p>

              <div className="an-hero-actions">
                <a href="#contact" className="an-btn an-btn-primary">
                  Talk to an Expert
                  <i className="fa fa-arrow-right" />
                </a>

                <a href="#services" className="an-btn an-btn-secondary">
                  Explore Services
                </a>
              </div>

              <div className="an-trust-row">
                <div>
                  <strong>30+</strong>
                  <span>Years Experience</span>
                </div>
                <div>
                  <strong>EPF</strong>
                  <span>Compliance Support</span>
                </div>
                <div>
                  <strong>ESIC</strong>
                  <span>Consultancy</span>
                </div>
              </div>
            </div>

            <div className="an-hero-visual">
              <div className="an-hero-card an-card-main">
                <div className="an-card-top">
                  <span className="an-card-icon">
                    <i className="fa fa-shield" />
                  </span>
                  <span className="an-status">
                    <i /> Compliance Support
                  </span>
                </div>

                <h3>One place for your labour compliance needs.</h3>

                <div className="an-compliance-list">
                  <div>
                    <span><i className="fa fa-check" /></span>
                    EPF & Returns
                  </div>
                  <div>
                    <span><i className="fa fa-check" /></span>
                    ESIC & Benefits
                  </div>
                  <div>
                    <span><i className="fa fa-check" /></span>
                    DSC & Portal Support
                  </div>
                  <div>
                    <span><i className="fa fa-check" /></span>
                    Labour Solutions
                  </div>
                </div>
              </div>

              <div className="an-hero-image-card">
                <img src={heroImage} alt="EPF and ESIC services" />
              </div>

              <div className="an-floating-card an-floating-one">
                <i className="fa fa-check-circle" />
                <div>
                  <strong>Structured</strong>
                  <span>Process support</span>
                </div>
              </div>

              <div className="an-floating-card an-floating-two">
                <i className="fa fa-file-text-o" />
                <div>
                  <strong>Digital</strong>
                  <span>Documentation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value strip */}
        <section className="an-value-strip">
          <div className="an-container an-value-grid">
            <div>
              <span className="an-value-icon"><i className="fa fa-users" /></span>
              <div>
                <strong>Employer Support</strong>
                <span>Practical compliance assistance</span>
              </div>
            </div>
            <div>
              <span className="an-value-icon"><i className="fa fa-user" /></span>
              <div>
                <strong>Employee Support</strong>
                <span>Guidance through benefit processes</span>
              </div>
            </div>
            <div>
              <span className="an-value-icon"><i className="fa fa-file-text" /></span>
              <div>
                <strong>Documentation</strong>
                <span>Organized and transparent workflows</span>
              </div>
            </div>
            <div>
              <span className="an-value-icon"><i className="fa fa-headphones" /></span>
              <div>
                <strong>Consultancy</strong>
                <span>Experienced professional guidance</span>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="an-section an-about">
          <div className="an-container an-about-grid">
            <div className="an-about-visual">
              <div className="an-about-image">
                <img src={aboutImage} alt="Professional consultancy" />
              </div>
              <div className="an-experience-card">
                <strong>30+</strong>
                <span>Years of consultancy experience</span>
              </div>
            </div>

            <div className="an-about-content">
              <div className="an-section-kicker">ABOUT US</div>
              <h2>
                Experience that makes
                <span> compliance simpler.</span>
              </h2>

              <p>
                We are a team of professional consultants with extensive
                experience in PF and ESIC consultancy services. We support
                organizations with practical guidance across compliance,
                reporting, documentation and employee-related processes.
              </p>

              <p>
                Our focus is to make complex labour compliance processes easier
                to understand, organize and manage through clear communication
                and structured support.
              </p>

              <div className="an-feature-grid">
                <div>
                  <span><i className="fa fa-check" /></span>
                  Compliance-focused approach
                </div>
                <div>
                  <span><i className="fa fa-check" /></span>
                  Practical documentation support
                </div>
                <div>
                  <span><i className="fa fa-check" /></span>
                  Employer & employee assistance
                </div>
                <div>
                  <span><i className="fa fa-check" /></span>
                  Transparent communication
                </div>
              </div>

              <a href="#contact" className="an-text-link">
                Discuss your requirement <i className="fa fa-arrow-right" />
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="an-section an-services">
          <div className="an-container">
            <div className="an-section-heading center">
              <div className="an-section-kicker">OUR SERVICES</div>
              <h2>Professional support for your <span>compliance journey.</span></h2>
              <p>
                From EPF and ESIC compliance to digital documentation and
                labour support, explore the areas where we can help.
              </p>
            </div>

            <div className="an-service-tabs">
              {services.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  className={activeService === service.id ? "active" : ""}
                  onClick={() => setActiveService(service.id)}
                >
                  <span>
                    <img src={service.icon} alt="" />
                  </span>
                  <strong>{service.shortTitle}</strong>
                  <small>{service.title}</small>
                </button>
              ))}
            </div>

            <div className="an-service-detail">
              <div className="an-service-copy">
                <div className="an-service-number">0{services.findIndex(s => s.id === activeService) + 1}</div>
                <h3>{selectedService.heading}</h3>
                <p>{selectedService.description}</p>

                <div className="an-service-points">
                  {selectedService.points.map((point) => (
                    <span key={point}>
                      <i className="fa fa-check" />
                      {point}
                    </span>
                  ))}
                </div>

                <a href="#contact" className="an-btn an-btn-primary">
                  Enquire About This Service
                  <i className="fa fa-arrow-right" />
                </a>
              </div>

              <div className="an-service-image">
                <img src={selectedService.image} alt={selectedService.title} />
                <div className="an-image-caption">
                  <i className="fa fa-shield" />
                  Professional & structured support
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="an-section an-process">
          <div className="an-container">
            <div className="an-section-heading center">
              <div className="an-section-kicker">HOW IT WORKS</div>
              <h2>A simple process. <span>Clear communication.</span></h2>
              <p>
                We keep the engagement straightforward so you always know what
                happens next.
              </p>
            </div>

            <div className="an-process-grid">
              <div className="an-process-card">
                <span className="an-process-number">01</span>
                <i className="fa fa-comments-o" />
                <h3>Share Your Requirement</h3>
                <p>
                  Tell us about your organization, employee or compliance
                  requirement.
                </p>
              </div>

              <div className="an-process-line" />

              <div className="an-process-card">
                <span className="an-process-number">02</span>
                <i className="fa fa-search" />
                <h3>Understand & Review</h3>
                <p>
                  We review the requirement and identify the appropriate
                  process and documentation.
                </p>
              </div>

              <div className="an-process-line" />

              <div className="an-process-card">
                <span className="an-process-number">03</span>
                <i className="fa fa-cogs" />
                <h3>Provide Support</h3>
                <p>
                  We guide you through the required compliance or documentation
                  workflow.
                </p>
              </div>

              <div className="an-process-line" />

              <div className="an-process-card">
                <span className="an-process-number">04</span>
                <i className="fa fa-check-circle" />
                <h3>Close the Requirement</h3>
                <p>
                  Complete the process with clear communication and organized
                  documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="an-why">
          <div className="an-container an-why-grid">
            <div>
              <div className="an-section-kicker">WHY WORK WITH US</div>
              <h2>Built around <span>clarity, experience and support.</span></h2>
              <p>
                Compliance can be complicated. Our goal is to make the process
                easier to understand and easier to manage.
              </p>
            </div>

            <div className="an-why-items">
              <div>
                <i className="fa fa-briefcase" />
                <div>
                  <strong>Experienced Team</strong>
                  <span>Professional experience across EPF and ESIC consultancy.</span>
                </div>
              </div>

              <div>
                <i className="fa fa-file-text-o" />
                <div>
                  <strong>Structured Documentation</strong>
                  <span>Clear documentation and process-oriented support.</span>
                </div>
              </div>

              <div>
                <i className="fa fa-comments-o" />
                <div>
                  <strong>Clear Communication</strong>
                  <span>Understand your requirement and keep the next step clear.</span>
                </div>
              </div>

              <div>
                <i className="fa fa-shield" />
                <div>
                  <strong>Compliance Focus</strong>
                  <span>Support designed around compliance and employee welfare.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="an-section an-team">
          <div className="an-container">
            <div className="an-section-heading center">
              <div className="an-section-kicker">OUR TEAM</div>
              <h2>Professional people behind the <span>service.</span></h2>
              <p>
                A team focused on providing practical support for organizations
                and employees.
              </p>
            </div>

            <div className="an-team-grid">
              {team.map((member, index) => (
                <div className="an-team-card" key={index}>
                  <img src={member} alt={`Team member ${index + 1}`} />
                  <div>
                    <strong>Consultancy Team</strong>
                    <span>EPF & ESIC Support</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights */}
        <section id="insights" className="an-section an-insights">
          <div className="an-container">
            <div className="an-section-heading center">
              <div className="an-section-kicker">INSIGHTS</div>
              <h2>Useful information about <span>EPF & ESIC.</span></h2>
              <p>
                Explore practical information and resources related to employee
                benefits and compliance.
              </p>
            </div>

            <div className="an-blog-grid">
              {blogs.map((blog) => (
                <article className="an-blog-card" key={blog.title}>
                  <div className="an-blog-image">
                    <img src={blog.image} alt={blog.title} />
                    <span>{blog.category}</span>
                  </div>
                  <div className="an-blog-content">
                    <h3>{blog.title}</h3>
                    <p>{blog.description}</p>
                    <a href="#contact">
                      Learn more <i className="fa fa-arrow-right" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="an-cta">
          <div className="an-container an-cta-inner">
            <div>
              <div className="an-section-kicker light">READY TO GET STARTED?</div>
              <h2>Let's discuss your EPF or ESIC requirement.</h2>
              <p>
                Share your requirement and our team will help you understand
                the next steps.
              </p>
            </div>

            <a href="#contact" className="an-btn an-btn-white">
              Contact Us
              <i className="fa fa-arrow-right" />
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="an-section an-contact">
          <div className="an-container">
            <div className="an-section-heading center">
              <div className="an-section-kicker">CONTACT US</div>
              <h2>Have a requirement? <span>Let's talk.</span></h2>
              <p>
                Send us your requirement and we'll get back to you.
              </p>
            </div>

            <div className="an-contact-grid">
              <div className="an-contact-info">
                <div className="an-contact-info-header">
                  <span className="an-contact-badge">
                    <i className="fa fa-headphones" />
                  </span>
                  <div>
                    <strong>Let's connect</strong>
                    <span>We're here to help.</span>
                  </div>
                </div>

                <div className="an-contact-items">
                  <a href="tel:+918793143976">
                    <span><img src={phoneIcon} alt="" /></span>
                    <div>
                      <small>Call us</small>
                      <strong>+91 87931 43976</strong>
                    </div>
                  </a>

                  <a href="mailto:anand.esipf@gmail.com">
                    <span><img src={emailIcon} alt="" /></span>
                    <div>
                      <small>Email us</small>
                      <strong>anand.esipf@gmail.com</strong>
                    </div>
                  </a>

                  <div>
                    <span><img src={locationIcon} alt="" /></span>
                    <div>
                      <small>Location</small>
                      <strong>Tukdoji Square, Nagpur</strong>
                    </div>
                  </div>
                </div>

                <div className="an-contact-note">
                  <i className="fa fa-info-circle" />
                  Please include your organization or requirement details in
                  the message so we can understand your request.
                </div>
              </div>

              <form className="an-contact-form" onSubmit={addInquiry}>
                <div className="an-form-row">
                  <label>
                    Name
                    <input
                      type="text"
                      value={form.name}
                      placeholder="Your name"
                      onChange={(e) => updateForm("name", e.target.value)}
                      required
                    />
                  </label>

                  <label>
                    Email
                    <input
                      type="email"
                      value={form.email}
                      placeholder="you@example.com"
                      onChange={(e) => updateForm("email", e.target.value)}
                      required
                    />
                  </label>
                </div>

                <label>
                  Subject
                  <input
                    type="text"
                    value={form.subject}
                    placeholder="How can we help?"
                    onChange={(e) => updateForm("subject", e.target.value)}
                    required
                  />
                </label>

                <label>
                  Message
                  <textarea
                    value={form.message}
                    placeholder="Tell us about your requirement..."
                    onChange={(e) => updateForm("message", e.target.value)}
                    required
                  />
                </label>

                <button type="submit" className="an-btn an-btn-primary">
                  Send Inquiry
                  <i className="fa fa-paper-plane" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="an-footer">
        <div className="an-container an-footer-main">
          <div className="an-footer-brand">
            <img src={logo} alt="Anandam" />
            <p>
              Professional EPF, ESIC and labour compliance consultancy support
              for organizations and employees.
            </p>
          </div>

          <div className="an-footer-column">
            <h4>Quick Links</h4>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#process">How It Works</a>
            <a href="#insights">Insights</a>
          </div>

          <div className="an-footer-column">
            <h4>Services</h4>
            <a href="#services">EPF Consulting</a>
            <a href="#services">ESIC Consultancy</a>
            <a href="#services">Digital Signature</a>
            <a href="#services">Labour Solutions</a>
          </div>

          <div className="an-footer-column">
            <h4>Contact</h4>
            <a href="tel:+918793143976">+91 87931 43976</a>
            <a href="mailto:anand.esipf@gmail.com">anand.esipf@gmail.com</a>
            <span>Tukdoji Square, Nagpur</span>
          </div>
        </div>

        <div className="an-footer-bottom">
          <div className="an-container">
            <span>© {new Date().getFullYear()} Anandam. All rights reserved.</span>
            <a href="/login">Customer Login</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Standalone;
