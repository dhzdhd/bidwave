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
  // io: {
  //   enabled: false,
  //   config: {
  //     IOServerOptions: {
  //       cors: {
  //         origin: "*",
  //         methods: ["GET", "POST"],
  //       },
  //     },
  //     contentTypes: {
  //       message: "*",
  //       chat: "*",
  //     },
  //     events: [
  //       {
  //         name: "connection",
  //         handler: ({ strapi }, socket) => {
  //           strapi.log.info(`[io] new connection with id ${socket.id}`);

  //           socket.on("loadBids", async (data) => {
  //             let params = data;

  //             try {
  //               let data = await strapi
  //                 .service("api::product.product")
  //                 .loadBids(params.id);
  //               strapi.$io.emit("loadBids", data);
  //             } catch (error) {
  //               console.log(error);
  //             }
  //           });

  //           socket.on("makeBid", async (data) => {
  //             let params = data;
  //             try {
  //               let found = await strapi.entityService.findOne(
  //                 "api::product.product",
  //                 params.product,
  //                 { fields: "bid_price" }
  //               );

  //               const account = await strapi
  //                 .service("api::account.account")
  //                 .getUserAccount(socket.user);

  //               //Check whether user has enough more to make the bid

  //               if (parseInt(account.balance) >= parseInt(found.bid_price)) {
  //                 await strapi
  //                   .service("api::bid.bid")
  //                   .makeBid({ ...params, account: account.id });
  //                 let product = await strapi
  //                   .service("api::product.product")
  //                   .findAndUpdateBidPrice(found, params.bidValue);
  //                 let updatedProduct = await strapi
  //                   .service("api::product.product")
  //                   .loadBids(product.id);
  //                 strapi.$io.emit("loadBids", updatedProduct);
  //               } else {
  //                 console.log("Balance Is low");
  //               }
  //             } catch (error) {
  //               console.log(error);
  //             }
  //           });

  //           socket.on("disconnect", () => {
  //             console.log("user disconnected");
  //           });
  //         },
  //       },
  //     ],
  //   },
  // },
});
