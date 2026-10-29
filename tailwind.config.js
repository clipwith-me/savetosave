/** Tailwind is compiled ahead of time (npm run build:css) instead of using the
 *  in-browser Play CDN, which is ~400 KB of JavaScript, is not meant for
 *  production, and flashes unstyled content on slow mobile networks. */
module.exports = {
  // app.js builds most of the cards with template strings, so it must be scanned too.
  content: ["./index.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        stsRed: "#E60000",
        stsDarkRed: "#990000",
        stsObsidian: "#0A0A0D",
        stsCard: "#14151B",
        stsGold: "#F59E0B"
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        script: ["Dancing Script", "cursive"]
      }
    }
  }
};
