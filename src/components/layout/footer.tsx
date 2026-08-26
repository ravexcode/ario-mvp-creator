export default function Footer() {
  return (
    <footer className="border-t border-border py-4 bg-background">
      <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ario. All rights reserved.
      </div>
    </footer>
  );
}
