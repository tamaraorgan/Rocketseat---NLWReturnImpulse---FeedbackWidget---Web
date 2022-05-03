module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        brand: {
          1: '#011627',
          2: '#2EC4B6',
          3: '#FDFFFC',
          4: '#25E3D0'
        }
      },
      borderRadius: {
        md: '4px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')]
}
