import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook, Twitter, Heart } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Squad", href: "/squad" },
  { name: "Matches", href: "/matches" },
  { name: "Stats", href: "/stats" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/hydrebels_cricketclub" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <span className="font-display text-xl font-bold text-primary-foreground">HR</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">HYDERABAD REBELS</h3>
                <p className="text-xs text-primary font-semibold tracking-widest">CRICKET CLUB</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Dominating the local cricket scene since 2023. Join us in our journey to excellence and be part of the Rebels family.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Quick */}
          <div>
            <h4 className="font-display text-lg font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="mailto:rebels.hyd@gmail.com" className="hover:text-foreground transition-colors">
                  rebels.hyd@gmail.com
                </a>
              </li>
              <li>
                Ellesmere Reservoir Park<br />
                Scarborough, Ontario, Canada
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Hyderabad Rebels Cricket Club. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary" /> in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
};
