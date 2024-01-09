// for setting up tailwind.css file
module.exports = {
  content: [
    './public/js/**/*.js',
    './public/js/*.js', // choose all in this folder with .js
    './views/**/*.handlebars', // choose all in this folder, then all subfolders, with .handlebars
    './views/*.handlebars', //choose all in this folder with .handlebars
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
