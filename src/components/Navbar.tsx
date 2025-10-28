import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { Product } from "@/contexts/CartContext";
import { formatUSD } from "@/lib/utils";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Celulares", path: "/celulares" },
    { name: "Pods", path: "/pods" },
    { name: "Perfumes", path: "/perfumes" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-wider hover:opacity-80 smooth-transition">
            MANIA GROUP
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => searchQuery && setShowResults(true)}
                className="pl-10 bg-background/10 border-background/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-card rounded-md shadow-xl border border-border overflow-hidden">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/${product.category}`}
                    className="flex items-center gap-3 p-3 hover:bg-accent smooth-transition"
                    onClick={() => {
                      setSearchQuery("");
                      setShowResults(false);
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{formatUSD(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium smooth-transition hover:opacity-70 ${
                  location.pathname === link.path ? "opacity-100" : "opacity-90"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart Icon */}
          <Link
            to="/carrito"
            className="relative p-2 hover:bg-background/10 rounded-full smooth-transition ml-4"
          >
            <ShoppingCart className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-around pb-3 border-t border-background/20 pt-3 mt-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-medium smooth-transition ${
                location.pathname === link.path ? "opacity-100" : "opacity-70"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
