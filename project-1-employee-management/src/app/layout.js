import "./globals.css";

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <ThemeContext.Provider value="Hello">

      
      <body
        className={` antialiased`}
      >
        {children}
      </body></ThemeContext.Provider>
    </html>
  );
}
