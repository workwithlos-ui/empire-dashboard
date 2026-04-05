import './globals.css';

export const metadata = {
  title: 'Empire Dashboard Suite',
  description: 'Command center for the Empire ecosystem - Revenue, QUORUM, Content, Factory, Assessment, and Calculator tools.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
