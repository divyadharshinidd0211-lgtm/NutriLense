import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-lg text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Leaf className="size-4" />
            </span>
            <span className="font-display text-base font-semibold">NutriLens</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            AI-powered nutritional screening and personalized nutrition guidance.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-foreground">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/micronutrients" className="hover:text-foreground">
                Micronutrients
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Trust</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/privacy" hash="terms" className="hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" hash="disclaimer" className="hover:text-foreground">
                Medical Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/about" hash="contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        Educational screening tool — not a medical device. © {new Date().getFullYear()} NutriLens.
      </div>
    </footer>
  );
}
