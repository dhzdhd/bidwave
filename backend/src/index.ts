"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    /*

    verify(token)

    */
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    io
      // .use(async (socket, next) => {
      //   try {
      //     //Socket Authentication
      //     const result = await strapi.plugins[
      //       "users-permissions"
      //     ].services.jwt.verify(socket.handshake.query.token);
      //     //Save the User ID to the socket connection
      //     socket.user = result.id;
      //     next();
      //   } catch (error) {
      //     console.log(error);
      //   }
      // })
      .on("connection", function (socket) {
        console.log("a user connected");

        socket.on("loadBids", async (data) => {
          let params = data;
          try {
            let data = await strapi
              .service("api::product.product")
              .loadBids(params.id);
            io.emit("loadBids", data);
          } catch (error) {
            console.log(error);
          }
        });
        socket.on("makeBid", async (data) => {
          let params = data;
          try {
            let found = await strapi.entityService.findOne(
              "api::product.product",
              params.product,
              { fields: "bid_price" }
            );
            const account = await strapi
              .service("api::account.account")
              .getUserAccount(socket.user);
            //Check whether user has enough more to make the bid
            if (parseInt(account.balance) >= parseInt(found.bid_price)) {
              await strapi
                .service("api::bid.bid")
                .makeBid({ ...params, account: account.id });
              let product = await strapi
                .service("api::product.product")
                .findAndUpdateBidPrice(found, params.bidValue);
              let updatedProduct = await strapi
                .service("api::product.product")
                .loadBids(product.id);
              io.emit("loadBids", updatedProduct);
            } else {
              console.log("Balance Is low");
            }
          } catch (error) {
            console.log(error);
          }
        });
        socket.on("disconnect", () => {
          console.log("user disconnected");
        });
      });
    strapi.io = io;
  },
};
