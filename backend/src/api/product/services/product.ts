/**
 * product service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::product.product",
  ({ strapi }) => ({
    async loadProducts(id) {
      let product = await strapi.entityService.findOne(
        "api::product.product",
        id,
        {
          fields: "*",
          populate: {
            bids: {
              limit: 5,
              sort: "createdAt:desc",
              populate: {
                account: {
                  fields: ["id"],
                  populate: {
                    user: {
                      fields: ["username"],
                    },
                  },
                },
              },
            },

            image: true,
          },
        }
      );

      return product;
    },

    async findAndUpdateBidPrice(found, price) {
      return strapi.entityService.update("api::product.product", found.id, {
        data: {
          bid_price: parseInt(found.bid_price) + parseInt(price),
        },
      });
    },
  })
);
