/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        gray: colors.neutral,
        "primary": "#C8ABFF",
        "app-pink": "#F3ACFF"
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}

