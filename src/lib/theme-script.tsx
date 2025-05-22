// This script ensures the theme is applied immediately on page load to prevent flashing
export function ThemeScript() {
  const themeScript = `
    (function() {
      function getThemePreference() {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme-preference')) {
          return localStorage.getItem('theme-preference');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      function setTheme(theme) {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      var theme = getThemePreference();
      setTheme(theme);
      
      // Mark as mounted to enable transitions
      document.documentElement.classList.add('theme-mounted');
    })();
  `

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}
