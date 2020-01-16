module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    ({ addUtilities }) => {
      const intervals = [200, 250, 300, 500, 700, 750, 1000];

      const newUtilities = {};

      intervals.forEach((x) => {
        newUtilities[`.transition-${x}`] = { transition: `${x}ms` };
      });

      addUtilities(newUtilities, ['responsive']);
    },
  ],
};
