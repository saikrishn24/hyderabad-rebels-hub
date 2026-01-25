import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import hydRebelsLogo from "@/assets/hyd-rebels-logo.jpg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Squad", href: "/squad" },
  { name: "Matches", href: "/matches" },
  { name: "Stats", href: "/stats" },
  { name: "Gallery", href: "/gallery" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={hydRebelsLogo} 
            alt="HYD Rebels CC Logo" 
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
              HYD REBELS
            </h1>
            <p className="text-xs text-gold font-semibold tracking-widest -mt-1">CRICKET CLUB</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-medium text-sm transition-colors relative group ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`} 
              />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/contact">
            <Button variant="default" className="font-display tracking-wide">
              JOIN THE TEAM
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-display text-lg block py-2 border-b border-border/50 transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="font-display tracking-wide mt-2 w-full">
                  JOIN THE TEAM
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
