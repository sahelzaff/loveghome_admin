/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#F57B1F'
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'Outfit'],
        sourceSans: ['Source Sans Pro', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        foundersGrotesk: ['FoundersGrotesk', 'sans-serif'],
        gotham: ['gotham', 'Lora'],
      },
    },
  },
  plugins: [],
}