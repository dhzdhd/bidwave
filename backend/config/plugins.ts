module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "maildev",
        port: 1025,
        ignoreTLS: true,
      },
    },
  },
});
