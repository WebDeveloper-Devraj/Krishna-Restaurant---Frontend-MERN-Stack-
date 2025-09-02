import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className={styles.my_footer}>
      <div className={styles.footer_container}>
        {/* logo */}
        <div className={`${styles.section} ${styles.logoSection}`}>
          <Link
            to="/restaurant"
            className="link-body-emphasis text-decoration-none"
          >
            <div className={styles.logo_container}>
              <img src={logo} className={styles.logo} alt="logo" />
              <p className={`${styles.logo_name}`}>
                Krishna <br /> Restaurant
              </p>
            </div>
          </Link>
        </div>

        {/* Get in touch */}
        <div className={`${styles.section} ${styles.getInTouchSection}`}>
          <div className={styles.footer_list_heading}>GET IN TOUCH</div>
          <ul>
            <li>
              <IoMail /> devpujari292@gmail.com
            </li>
            <li>
              <IoMail /> devrajpujari003@gmail.com
            </li>
          </ul>
        </div>

        {/* Get in touch */}
        <div className={`${styles.section}`}>
          <div className={styles.footer_list_heading}>Policies</div>
          <ul>
            <li>
              <a
                className={styles.social_link}
                href="https://merchant.razorpay.com/policy/RCf90ZqPMs2J1V/refund"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cancellation & Refunds
              </a>
            </li>
            <li>
              <a
                className={styles.social_link}
                href="https://merchant.razorpay.com/policy/RCf90ZqPMs2J1V/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                className={styles.social_link}
                href="https://merchant.razorpay.com/policy/RCf90ZqPMs2J1V/shipping"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shipping
              </a>
            </li>
            <li>
              <a
                className={styles.social_link}
                href="https://merchant.razorpay.com/policy/RCf90ZqPMs2J1V/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                className={styles.social_link}
                href="https://merchant.razorpay.com/policy/RCf90ZqPMs2J1V/contact_us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Connect with us */}
        <div className={styles.section}>
          <div className={styles.footer_list_heading}>Connect With Us</div>
          <ul>
            <li>
              <a
                href="https://instagram.com/devrajjj.codes"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social_link}
              >
                Instagram <FaInstagram className={styles.footer_icon} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/people/Devraj-Pujari/pfbid024kZDfiYmDJ9TyNPi2WHpxWAgLe5zjesrr9nmzDcuPdEekbPFf3sHEVUtYdEW7xb8l"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social_link}
              >
                Facebook <FaFacebook className={styles.footer_icon} />
              </a>
            </li>
            {/* <li>
              Twitter <FaTwitter className={styles.footer_icon} />
            </li>
            <li>
              YouTube <FaYoutube className={styles.footer_icon} />
            </li> */}
          </ul>
        </div>
      </div>

      <hr />
      {/* copy right */}
      <p className={`mb-0 text-center ${styles.copyRight}`}>
        © 2024 Krishna Restaurant, Inc
      </p>
      <div className={styles.footer_icons}>
        {/* <FaInstagram className={styles.footer_icon} /> */}
        {/* <FaFacebook className={styles.footer_icon} />
        <FaTwitter className={styles.footer_icon} /> */}
      </div>
    </footer>
  );
};

export default Footer;
