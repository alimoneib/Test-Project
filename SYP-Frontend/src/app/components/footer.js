import React, {Component} from 'react';
import '../styles/components.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faTwitter, faInstagram, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    return <footer className="site-footer">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-9">
                    <h6>About</h6>
                    <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam dictum ex ut bibendum auctor. Sed maximus nec nunc et gravida.
                        Vestibulum nec odio augue. Sed consequat turpis quis imperdiet accumsan.
                        Pellentesque vulputate neque porta, tincidunt felis id, sagittis metus. Interdum
                        et malesuada fames ac ante ipsum primis in faucibus. Fusce sodales enim ultrices
                        condimentum mattis. Nunc aliquam tortor ante.
                    </p>
                </div>
                <div className="col-xs-6 col-md-3">
                    <h6>Quick Links</h6>
                    <ul className="footer-links">
                        <li>
                            <a href="http://scanfcode.com/about/">About Us</a>
                        </li>
                        <li>
                            <a href="http://scanfcode.com/contact/">Contact Us</a>
                        </li>
                        <li>
                            <a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a>
                        </li>
                        <li>
                            <a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="http://scanfcode.com/sitemap/">Sitemap</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by 
                            <a href="#" style={{color: 'white'}}> Obelisk94</a>.
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li>
                                <a className="facebook" href="#">
                                <FontAwesomeIcon icon={faFacebookF}/>
                                </a>
                            </li>
                            <li>
                                <a className="twitter" href="#">
                                <FontAwesomeIcon icon={faTwitter}/>
                                </a>
                            </li>
                            <li>
                                <a className="dribbble" href="#">
                                <FontAwesomeIcon icon={faInstagram}/>
                                </a>
                            </li>
                            <li>
                                <a className="linkedin" href="#">
                                <FontAwesomeIcon icon={faLinkedinIn}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}