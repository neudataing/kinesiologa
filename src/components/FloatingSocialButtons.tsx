import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const FloatingSocialButtons: React.FC = () => {
  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-4 items-end">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/542993277906"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 text-white p-3 rounded-full shadow-lg
                  p-[12px] md:p-3"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="w-[25px] h-[25px] md:w-[50px] md:h-[50px]" />
      </motion.a>

      {/* Instagram */}
      <motion.a
        href="https://www.instagram.com/ergonomia.schenkel"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-3 rounded-full shadow-lg
                  p-[12px] md:p-3"
        aria-label="Instagram"
      >
        <FaInstagram className="w-[25px] h-[25px] md:w-[50px] md:h-[50px]" />
      </motion.a>

      {/* Facebook */}
      <motion.a
        href="https://www.facebook.com/profile.php?id=61573965166136"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg
                  p-[12px] md:p-3"
        aria-label="Facebook"
      >
        <FaFacebook className="w-[25px] h-[25px] md:w-[50px] md:h-[50px]" />
      </motion.a>
    </div>
  );
};

export default FloatingSocialButtons;