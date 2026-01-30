import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  const siteUrl = "https://configura-pro.vercel.app/";

  const quickLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Orders", href: "/orders" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://linkedin.com" },
    { icon: <FaTwitter />, href: "https://twitter.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaGithub />, href: "https://github.com" },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 py-8 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-start space-y-2">
          <a href={siteUrl} 
             target="_blank"
             rel="noopener noreferrer"className="flex items-center space-x-2">
            <img src="/logo.png" alt="ConfiguraPro Logo" className="h-12 w-auto" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ConfiguraPro
            </span>
          </a>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Reliable Industrial Materials, Delivered Efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Quick Links</h3>
          <ul className="space-y-1">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-start space-y-3">
          <h3 className="font-semibold mb-1 text-slate-800 dark:text-slate-100">
            Connect With Us
          </h3>
          <div className="flex space-x-3">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-xl"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-sm">
            Contact:{" "}
            <a
              href="mailto:support@configura-pro.com"
              className="hover:text-blue-500 dark:hover:text-blue-400"
            >
              support@configura-pro.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 border-t border-slate-300 dark:border-slate-700 pt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} ConfiguraPro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
