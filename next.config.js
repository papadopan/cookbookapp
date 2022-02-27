// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig


// next.config.js
const withLess = require("next-with-less");

module.exports = withLess({
  images: {
    domains: ['images.unsplash.com'],
  },
  lessLoaderOptions: {
    /* ... */
    lessOptions: {
      /* ... */
      modifyVars: {
        "border-radius-base": "2px",
        "primary-color": "#37c06c",
        "link-color": "#1890ff", // link color
        "success-color": "#52c41a", // success state color
        "warning-color": "#faad14", // warning state color
        "error-color": "#f5222d", // error state color
        "font-size-base": "14px", // major text font size
        "heading-color": "rgba(0, 0, 0, 0.85)", // heading text color
        "text-color": "rgba(0, 0, 0, 0.65)", // major text color
        "text-color-secondary": "rgba(0, 0, 0, 0.45)", // secondary text color
        "disabled-color": "rgba(0, 0, 0, 0.25)", // disable state color
        "border-radius-base": "2px", // major border radius
        "border-color-base": "#d9d9d9", // major border color
      },
    },
  },
});