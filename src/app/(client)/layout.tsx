import MainHeader from "@/components/landing/MainHeader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portfolio-site">
      <div className="portfolio-frame">
        <MainHeader />
        <div>{children}</div>
        <footer className="portfolio-footer">
          <p>&copy; {new Date().getFullYear()} Abraar Jihaad H.</p>
          <p>Software engineer</p>
        </footer>
      </div>
    </div>
  );
}
