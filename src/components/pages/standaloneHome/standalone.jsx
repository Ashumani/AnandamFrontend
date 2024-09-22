/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import logo from "../../../standalone_assets/images/Anandam.png"
import slider from "../../../standalone_assets/images/epfo.png"
// import slider from "../../../standalone_assets/images/slider-dec.png"

import aboutdec from "../../../standalone_assets/images/about-dec.png"
import serviceicon01 from "../../../standalone_assets/images/service-icon-01.png"
import serviceicon02 from "../../../standalone_assets/images/service-icon-02.png"
import serviceicon03 from "../../../standalone_assets/images/service-icon-03.png"
import serviceicon04 from "../../../standalone_assets/images/service-icon-04.png"
// import serviceicon01 from "../../../standalone_assets/images/service-icon-01.png"                              
import servicesimage from "../../../standalone_assets/images/services-image.jpg"
import servicesimage02 from "../../../standalone_assets/images/services-image-02.jpg"
import servicesimage03 from "../../../standalone_assets/images/services-image-03.jpg"
import servicesimage04 from "../../../standalone_assets/images/services-image-04.jpg"
// import servicesimage from "../../../standalone_assets/images/services-image.jpg"                                      
// import portfolio01 from "../../../standalone_assets/images/portfolio-01.jpg"
// import portfolio02 from "../../../standalone_assets/images/portfolio-02.jpg"
// import portfolio03 from "../../../standalone_assets/images/portfolio-03.jpg"
// import portfolio04 from "../../../standalone_assets/images/portfolio-04.jpg"

import portfolio01 from "../../../standalone_assets/images/img/1.jpg"
import portfolio02 from "../../../standalone_assets/images/img/2.jpg"
import portfolio03 from "../../../standalone_assets/images/img/3.jpg"
import portfolio04 from "../../../standalone_assets/images/img/4.jpg"
import portfolio05 from "../../../standalone_assets/images/img/5.jpg"
import portfolio06 from "../../../standalone_assets/images/img/4.png"


import blogpost01 from "../../../standalone_assets/images/blog-post-01.jpg"
import authorpost from "../../../assets/img/3.jpg";
// import authorpost from "../../../standalone_assets/images/author-post.jpg"
import blogpost02 from "../../../standalone_assets/images/blog-post-02.jpg"
import blogpost03 from "../../../standalone_assets/images/blog-post-03.jpg"
import blogpost04 from "../../../standalone_assets/images/blog-post-04.jpg"
import contactdec from "../../../standalone_assets/images/contact-dec.png"
import phoneicon from "../../../standalone_assets/images/phone-icon.png"
import emailicon from "../../../standalone_assets/images/email-icon.png"
import locationicon from "../../../standalone_assets/images/location-icon.png"
// import "./standalone.css"

const standalone = () => {
  // const items = [{ "image": portfolio01, "title": "Manish", category: "T1" }, { "image": portfolio01, "title": "Manish", category: "T1" }, { "image": portfolio01, "title": "Manish", category: "T1" }];


  return (
    <div>

      <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="pre-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-8 col-7">
              <ul className="info">
                <li><a href="#"><i className="fa fa-envelope"></i>anand.esipf@gmail.com</a></li>
                <li><a href="#"><i className="fa fa-phone"></i>+91-8793143976</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-sm-4 col-5">
              <ul className="social-media">
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-behance"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="index.html" className="">
                  <img style={{width: '25%' }} src={logo} alt="" />
                </a>
                <ul className="nav">
                  <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
                  <li className="scroll-to-section"><a href="#about">About</a></li>
                  <li className="scroll-to-section"><a href="#services">Services</a></li>
                  <li className="scroll-to-section"><a href="#portfolio">Portfolio</a></li>
                  <li className="scroll-to-section"><a href="#blog">Blog</a></li>
                  <li className="scroll-to-section"><a href="#contact">Contact</a></li>
                  <li className="scroll-to-section"><div className="border-first-button"><a href="/login">Login</a></div></li>
                </ul>
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                    <div className="row">
                      <div className="col-lg-12">
                        <h6>EPF & ESIC Services</h6>
                        <h2>EPF and ESIC Assistance</h2>
                        <p>EPF and ESIC deductions ensure employees financial security and healthcare, providing essential benefits for their future and well-being.</p>
                      </div>
                      <div className="col-lg-12">
                        <div className="border-first-button scroll-to-section">
                          <a href="#contact">Free Quote</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                    <img src={slider} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div id="about" className="about section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="about-left-image  wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.5s">

                    <img src={aboutdec} alt="" />

                  </div>
                </div>
                <div className="col-lg-6 align-self-center  wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                  <div className="about-right-content">
                    <div className="section-heading">
                      <h6>About Us</h6>
                      <h4>We Are Trusted Labor Consultant <em> Since 1990</em></h4>
                      <div className="line-dec"></div>
                    </div>
                    <p>We are a team of professional consultants with over 30 years of experience in PF and ESIC consultancy services. Renowned for our efficiency, we provide top-tier legal advisory services including PF, ESIC, and PF withdrawal. Our expertise extends across all levels of organizational needs, ensuring we are the most valuable resource for our clients.</p>
                    <div className="row">
                      <div className="col-lg-4 col-sm-4">
                        <div className="skill-item first-skill-item wow fadeIn" data-wow-duration="1s" data-wow-delay="0s">
                          <div className="progress" data-percentage="90">
                            <span className="progress-left">
                              <span className="progress-bar"></span>
                            </span>
                            <span className="progress-right">
                              <span className="progress-bar"></span>
                            </span>
                            <div className="progress-value">
                              <div>
                                90%<br />
                                <span>Coding</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-4">
                        <div className="skill-item second-skill-item wow fadeIn" data-wow-duration="1s" data-wow-delay="0s">
                          <div className="progress" data-percentage="80">
                            <span className="progress-left">
                              <span className="progress-bar"></span>
                            </span>
                            <span className="progress-right">
                              <span className="progress-bar"></span>
                            </span>
                            <div className="progress-value">
                              <div>
                                80%<br />
                                <span>Photoshop</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-4">
                        <div className="skill-item third-skill-item wow fadeIn" data-wow-duration="1s" data-wow-delay="0s">
                          <div className="progress" data-percentage="80">
                            <span className="progress-left">
                              <span className="progress-bar"></span>
                            </span>
                            <span className="progress-right">
                              <span className="progress-bar"></span>
                            </span>
                            <div className="progress-value">
                              <div>
                                80%<br />
                                <span>Animation</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" className="services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading  wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
                <h6>Our Services</h6>
                <h4>What we <em>Provides</em></h4>
                <div className="line-dec"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="naccs">
                <div className="grid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="menu">
                        <div className="first-thumb active">
                          <div className="thumb">
                            <span className="icon"><img src={serviceicon01} alt="" />
                            </span>
                            EPF
                          </div>
                        </div>
                        <div>
                          <div className="thumb">
                            <span className="icon"><img src={serviceicon02} alt="" />
                            </span>
                            ESIC
                          </div>
                        </div>
                        <div>
                          <div className="thumb">
                            <span className="icon"><img src={serviceicon03} alt="" />
                            </span>
                            DSC
                          </div>
                        </div>
                        <div>
                          <div className="thumb">
                            <span className="icon"><img src={serviceicon04} alt="" />
                            </span>
                            Labor Solution
                          </div>
                        </div>
                        <div className="last-thumb">
                          <div className="thumb">
                            <span className="icon"><img src={serviceicon01} alt="" />
                            </span>
                            Workshops
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 text-justify">
                      <ul className="nacc">
                        <li className="active">
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-6 align-self-center">
                                  <div className="left-text">
                                    <h4>Expert EPF Consulting for Compliance &amp; Security</h4>
                                    <p>Our EPF consulting services simplify the complexities of the Employees' Provident Fund Organisation (EPFO) for both employees and employers. We provide expert guidance on EPF regulations, assist with compliance and reporting, and facilitate the filing of claims to ensure timely access to benefits. </p>
                                    <div className="ticks-list"><span><i className="fa fa-check"></i> Smart Solution With Experience Team</span> <span><i className="fa fa-check"></i> Complience</span> <span><i className="fa fa-check"></i> Immediate 24/ 7 emergency services</span>
                                      <span><i className="fa fa-check"></i> Quality services at affordable prices</span> <span><i className="fa fa-check"></i> Solving Labour Issue</span> <span><i className="fa fa-check"></i> Optimized Template</span></div>
                                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedr do eiusmod deis tempor incididunt.</p> */}
                                  </div>
                                </div>
                                <div className="col-lg-6 align-self-center">
                                  <div className="right-image">
                                    <img src={servicesimage} alt="" />

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-6 align-self-center">
                                  <div className="left-text">
                                    <h4>Expert ESIC Consultancy for Compliance   &amp; Employee Benefits</h4>
                                    <p>Our consultancy provides comprehensive support for the Employees State Insurance Corporation (ESIC), assisting businesses in navigating the complexities of employee benefits and compliance. We offer expert guidance on ESIC registration, contribution calculations, and timely filing of returns. Additionally, we help employees access their entitled medical and financial benefits, ensuring smooth claim processes. With tailored solutions and ongoing support, we aim to enhance organizational compliance while safeguarding the welfare of employees under the ESIC framework.</p>
                                    <div className="ticks-list"><span><i className="fa fa-check"></i> Smart Solution With Experience Team</span> <span><i className="fa fa-check"></i> Complience</span> <span><i className="fa fa-check"></i> Immediate 24/ 7 emergency services</span>
                                      <span><i className="fa fa-check"></i> Quality services at affordable prices</span> <span><i className="fa fa-check"></i> Solving Labour Issue</span> <span><i className="fa fa-check"></i> Optimized Template</span></div>
                                  </div>
                                </div>
                                <div className="col-lg-6 align-self-center">
                                  <div className="right-image">
                                    <img src={servicesimage02} alt="" />

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-6 align-self-center">
                                  <div className="left-text">
                                    <h4>DSC for EPFO Portal</h4>
                                    <p>Digital Signature Certificates (DSCs) are important for EPFO because they provide a high level of security for online transactions and communications</p>
                                    <div className="ticks-list"><span><i className="fa fa-check"></i> Authenticate identity</span> <span><i className="fa fa-check"></i> Ensure data integrity</span> <span><i className="fa fa-check"></i>Offer non-repudiation</span>
                                      <span><i className="fa fa-check"></i> Prevent fraud</span> <span><i className="fa fa-check"></i>Speed up processing</span> <span><i className="fa fa-check"></i> Reduce paperwork</span></div>
                                    <p>Employers need a secure digital signature (DSC) to submit their employee's PF transfer application online. It's like your electronic signature to ensure everything is secure and authentic. Once you have it, you have to register it on the new EPFO portal for employers.</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 align-self-center">
                                  <div className="right-image">
                                    <img src={servicesimage03} alt="" />

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-6 align-self-center">
                                  <div className="left-text">
                                    <h4>Addressing labor problems &amp; Solution</h4>
                                    <p>To effectively address labor issues related to EPF and ESIC consultancy, it is essential to ensure compliance with the latest regulations. This includes maintaining accurate employee documentation to avoid penalties and conducting regular audits to verify adherence to policies. Educating employees through workshops and providing accessible resources about their rights and benefits under these schemes can foster a more informed workforce.</p>
                                    <div className="ticks-list"><span><i className="fa fa-check"></i>Ensure Compliance</span> <span><i className="fa fa-check"></i> Streamline Claims Process</span> <span><i className="fa fa-check"></i> Establish Grievance Mechanism</span>
                                      <span><i className="fa fa-check"></i> Helping Hand For EPF &amp; ESIC</span> <span><i className="fa fa-check"></i>Digital &amp; Transparent  Solutions</span> </div>
                                    
                                  </div>
                                </div>
                                <div className="col-lg-6 align-self-center">
                                  <div className="right-image">
                                    <img src={servicesimage04} alt="" />

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-6 align-self-center">
                                  <div className="left-text">
                                    <h4>Enjoy &amp; Travel</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedr do eiusmod deis tempor incididunt ut labore et dolore kengan darwin doerski token.
                                      dover lipsum lorem and the others.</p>
                                    <div className="ticks-list"><span><i className="fa fa-check"></i> Optimized Template</span> <span><i className="fa fa-check"></i> Data Info</span> <span><i className="fa fa-check"></i> SEO Analysis</span>
                                      <span><i className="fa fa-check"></i> Data Info</span> <span><i className="fa fa-check"></i> SEO Analysis</span> <span><i className="fa fa-check"></i> Optimized Template</span></div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedr do eiusmod deis tempor incididunt.</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 align-self-center">
                                  <div className="right-image">
                                    <img src={servicesimage} alt="" />

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div id="free-quote" className="free-quote">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="section-heading  wow fadeIn" data-wow-duration="1s" data-wow-delay="0.3s">
                <h6>Get Your Free Quote</h6>
                <h4>Grow With Us Now</h4>
                <div className="line-dec"></div>
              </div>
            </div>
            <div className="col-lg-8 offset-lg-2  wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
              <form id="search" action="#" method="GET">
                <div className="row">
                  <div className="col-lg-4 col-sm-4">
                    <fieldset>
                      <input type="web" name="web" className="website" placeholder="Your website URL..." autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-4 col-sm-4">
                    <fieldset>
                      <input type="address" name="address" className="email" placeholder="Email Address..." autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-4 col-sm-4">
                    <fieldset>
                      <button type="submit" className="main-button">Get Quote Now</button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}


      <div id="portfolio" className="our-portfolio section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-heading wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.3s">
                <h6>Our Portofolio</h6>
                <h4>Here is Our <em>Expert Team</em></h4>
                <div className="line-dec"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid wow fadeIn" style={{ marginRight: '-45px' }} data-wow-duration="1s" data-wow-delay="0.7s">
  <div className="row">
    <div className="col-lg-12">
      <div className="loop owl-carousel owl-loaded owl-drag">
        <div className="owl-stage-outer">
          <div className="owl-stage">
            {/* Loop through items for better maintainability */}
            {[portfolio01, portfolio02, portfolio03,portfolio04,portfolio05,portfolio06].map((portfolioItem, index) => (
              <div className="owl-item" key={index} style={{ width: '263.8px' }}>
                <div className="item">
                  <a href="#">
                    <div className="portfolio-item">
                      <div className="thumb">
                        <img style={{ height: '320px', objectFit: 'cover' }} src={portfolioItem} alt="" />
                      </div>
                      <div className="down-content">
                        <h4>Manish Kirnapure</h4>
                        <span>Developer</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
     </div>

      {/* <div id="portfolio" className="our-portfolio section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-heading wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.3s">
                <h6>Our Portofolio</h6>
                <h4>See Our Recent <em>Projects</em></h4>
                <div className="line-dec"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
          <div className="row">
            <div className="col-lg-12">
              <div className="loop owl-carousel">
                {items.map((item, index) => (

                  <div className="item" key={index} style={{ transform: `translate3d(${index * -1846}px, 0px, 0px)` }}>
                    <a href="#">
                      <div className="portfolio-item">
                        <div className="thumb">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="down-content">
                          <h4>{item.title}</h4>
                          <span>{item.category}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div id="blog" className="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4  wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.3s">
              <div className="section-heading">
                <h6>Recent News</h6>
                <h4>Check Our Blog <em>Posts</em></h4>
                <div className="line-dec"></div>
              </div>
            </div>
            <div className="col-lg-6 show-up wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
              <div className="blog-post">
                <div className="thumb">
                  <a href="https://www.informalnewz.com/government-will-increase-epfo-salary-limit-to-%E2%82%B9-21000-employees-will-get-%E2%82%B9-1-crore-on-retirement/"><img src={blogpost01} alt="" />
                  </a>
                </div>
                <div className="down-content">
                  <span className="category">EPFO Analysis</span>
                  <span className="date">03 August 2021</span>
                  <a href="#"><h4>Government will increase EPFO ​​salary limit to ₹ 21,000! Employees will get ₹ 1 crore on retirement</h4></a>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doers itii eiumod deis tempor incididunt ut labore.</p>
                  <span className="author"><img src={authorpost} alt="" />
                    By: Manish Kirnapure</span>
                  <div className="border-first-button"><a href="https://www.informalnewz.com/government-will-increase-epfo-salary-limit-to-%E2%82%B9-21000-employees-will-get-%E2%82%B9-1-crore-on-retirement/">Discover More</a></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
              <div className="blog-posts">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="post-item">
                      <div className="thumb">
                        <a href="https://cleartax.in/s/pf-balance-check"><img src={blogpost02} alt="" />
                        </a>
                      </div>
                      <div className="right-content">
                        <span className="category">EPF Analysis</span>
                        <span className="date">24 September 2021</span>
                        <a href="https://cleartax.in/s/pf-balance-check"><h4>EPF Balance Check - PF Balance Check With and Without UAN Number</h4></a>
                        <p>For more information Read More....</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="post-item">
                      <div className="thumb">
                        <a href="https://www.esic.gov.in/information-benefits"><img src={blogpost03} alt="" />
                        </a>
                      </div>
                      <div className="right-content">
                        <span className="category">ESIC Analysis</span>
                        <span className="date">24 September 2021</span>
                        <a href="https://www.esic.gov.in/information-benefits"><h4>ESIC Benefits</h4></a>
                        <p>The section 46 of the Act envisages following six social security benefits.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="post-item last-post-item">
                      <div className="thumb">
                        <a href="https://medium.com/@forgot_password/forgot-my-epfo-password-c5b691b5b4dc"><img src={blogpost04} alt="" />
                        </a>
                      </div>
                      <div className="right-content">
                        <span className="category">EPF Analysis</span>
                        <span className="date">24 September 2021</span>
                        <a href="https://medium.com/@forgot_password/forgot-my-epfo-password-c5b691b5b4dc"><h4>Forgot My Epfo Password</h4></a>
                        <p>Struggling with a forgotten EPFO password?..Read More...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="contact-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                <h6>Contact Us</h6>
                <h4>Get In Touch With Us <em>Now</em></h4>
                <div className="line-dec"></div>
              </div>
            </div>
            <div className="col-lg-12 wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <form id="contact" action="" method="post">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="contact-dec">
                      <img src={contactdec} alt="" />

                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div id="map">
                      <iframe
                        src="https://maps.google.com/maps?q=Tukdoji+Putla+Square,+Nagpur,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="636"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen
                        title="Map"
                      ></iframe>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="fill-form">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="info-post">
                            <div className="icon">
                              <img src={phoneicon} alt="" />

                              <a href="#">010-020-0340</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="info-post">
                            <div className="icon">
                              <img src={emailicon} alt="" />

                              <a href="#">our@email.com</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="info-post">
                            <div className="icon">
                              <img src={locationicon} alt="" />

                              <a href="#">123 Rio de Janeiro</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <fieldset>
                            <input type="name" name="name" id="name" placeholder="Name" autoComplete="on" required />
                          </fieldset>
                          <fieldset>
                            <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email" required="" />
                          </fieldset>
                          <fieldset>
                            <input type="subject" name="subject" id="subject" placeholder="Subject" autoComplete="on" />
                          </fieldset>
                        </div>
                        <div className="col-lg-6">
                          <fieldset>
                            <textarea name="message" type="text" className="form-control" id="message" placeholder="Message" required=""></textarea>
                          </fieldset>
                        </div>
                        <div className="col-lg-12">
                          <fieldset>
                            <button type="submit" id="form-submit" className="main-button ">Send Message Now</button>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Copyright © 2022 DigiMedia Co., Ltd. All Rights Reserved.
                <br />Design: <a href="https://templatemo.com" target="_parent" title="free css templates">TemplateMo</a></p>
            </div>
          </div>
        </div>
      </footer>




    </div>
  );
};

export default standalone;
