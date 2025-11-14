import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/contexts/CartContext";
import { Index, Celulares, Vapes, Perfumes, Carrito, NotFound } from "./pages";
import { Navbar, Footer, ErrorBoundary } from "./components";
import SecurityWrapper from "./components/SecurityWrapper";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <SecurityWrapper>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/celulares" element={<Celulares />} />
                  <Route path="/vapes" element={<Vapes />} />
                  <Route path="/perfumes" element={<Perfumes />} />
                  <Route path="/carrito" element={<Carrito />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>            </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
    </SecurityWrapper>
  </ErrorBoundary>
);

export default App;
