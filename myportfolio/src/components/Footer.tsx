const Footer = () => (
  <footer className="border-t border-border/40 py-8">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <span className="gradient-text font-semibold">DevFolio</span>
      <span>© {new Date().getFullYear()} All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;