import Script from 'next/script';

export function ThemeScript() {
  return (
    <Script id="theme-script" strategy="beforeInteractive">
      {`
        try {
          const theme = localStorage.getItem('theme');
          const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          
          if (theme === 'dark' || (!theme && systemDarkMode)) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
          } else if (theme === 'light' || (!theme && !systemDarkMode)) {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
          } else if (theme === 'system') {
            if (systemDarkMode) {
              document.documentElement.classList.add('dark');
              document.documentElement.classList.remove('light');
            } else {
              document.documentElement.classList.add('light');
              document.documentElement.classList.remove('dark');
            }
          }
        } catch (e) {
          console.error('Theme initialization error:', e);
        }
      `}
    </Script>
  );
}