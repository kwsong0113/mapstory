/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{vue,js,ts}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#49A35B",
          secondary: "#AF52DE",
          accent: "#1dcdbc",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#007AFF",
          success: "#36d399",
          warning: "#F5BE41",
          error: "#C9301D",
        },
      },
    ],
  },
  theme: {
    fontFamily: {
      poppins: ['"Poppins"', "sans-serif"],
    },
  },
};
