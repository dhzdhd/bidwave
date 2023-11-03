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
    let interval;

    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.use(async (socket, next) => {
      try {
        //Socket Authentication
        const result = await strapi.plugins[
          "users-permissions"
        ].services.jwt.verify(socket.handshake.query.token);

        //Save the User ID to the socket connection
        socket.user = result.id;
        next();
      } catch (error) {
        console.log(error);
      }
    }).on("connection", function (socket) {
      console.log("a user connected");

      if (interval) {
        clearInterval(interval);
      }

      interval = setInterval(() => {
        io.emit("serverTime", { time: new Date().getTime() });
      }, 1000);

      socket.on("loadProducts", async (data) => {
        // id: product id
        let params = data;

        try {
          let data = await strapi
            .service("api::product.product")
            .loadProducts(params.id);

          io.emit("loadProducts", data);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("makeBid", async (data) => {
        // product: product id
        // bidValue: bid value
        // user: user id
        let params = data;

        try {
          let found = await strapi.entityService.findOne(
            "api::product.product",
            params.product,
            { fields: "bid_price" }
          );

          await strapi.service("api::bid.bid").makeBid({
            ...params,
            bidValue: params.bidValue + Number(found["bid_price"]),
          });

          let product = await strapi
            .service("api::product.product")
            .findAndUpdateBidPrice(found, params.bidValue);

          let updatedProduct = await strapi
            .service("api::product.product")
            .loadProducts(product.id);

          let updatedBid = await strapi
            .service("api::bid.bid")
            .loadBids(product.id);

          io.emit("loadProducts", updatedProduct);
          io.emit("loadBids", updatedBid);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
        clearInterval(interval);
      });
    });

    strapi.io = io;
  },
};
