import {
  FaCalendarAlt,
  FaLock,
  FaMobileAlt,
  FaStar,
  FaChair,
  FaBell
} from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
const features = [
  {
    icon: <BsGrid />,
    title: "Real-time Availability",
    description: "Check seat availability instantly for any show time across all partnered cinemas."
  },
  {
    icon: <FaLock />,
    title: "Secure Booking",
    description: "Our payment system ensures your details are always protected with bank-level security."
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Tickets",
    description: "Skip the printing queue. Show your digital ticket for hassle-free entry."
  },
  {
    icon: <FaStar />,
    title: "Exclusive Offers",
    description: "Members get early access to premieres, discounts, and special event screenings."
  },
  {
    icon: <FaChair />,
    title: "Seat Selection",
    description: "Choose your perfect spot with our interactive seating chart for every theater."
  },
  {
    icon: <FaBell />,
    title: "Upcoming Alerts",
    description: "Never miss a release with personalized notifications for your favorite genres."
  }
];

export default features