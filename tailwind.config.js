/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./public/*.html"],
  theme: {
    extend: {
      colors:{
        'blue-weaterApp': '#1E213A',
        'bold-blue':'#100E1D',
        'color-info':'#A09FB1',
        'color-info-second':'#E7E7EB',
      },
      textColor:{
        'color-li':'#E7E7EB',
      },
      borderColor:{
        'input':'#E7E7EB',
      },
      height:{
        '22rem': '22rem',
        '21rem': '21rem',
        '74':'18.5rem',
      },
      gridTemplateColumns:{
        'autoG': 'repeat(auto-fit, minmax(8rem, 2fr))',
        'autoC': 'repeat(auto-fit, minmax(12rem, 2fr))',
        'autoCG': 'repeat(auto-fit, minmax(28rem, 2fr))',
        'desktop': '1fr 3fr',
        'desktopG': '1fr 2fr'
      },
    },
  },
  plugins: [],
}
