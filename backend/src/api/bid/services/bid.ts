/**
 * bid service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::bid.bid", ({ strapi }) => ({
  async makeBid(params) {
    const currentBids: any[] = await strapi.entityService.findMany(
      "api::bid.bid",
      {
        filters: { product: params.product },
      }
    );

    if (currentBids.length === 0) {
      return strapi.service("api::bid.bid").create({
        data: {
          value: params.bidValue,
          user: params.user,
          product: params.product,
          publishedAt: new Date(),
        },
      });
    } else {
      return strapi.entityService.update("api::bid.bid", currentBids[0].id, {
        data: {
          value: params.bidValue,
          user: params.user,
        },
      });
    }
  },

  getWinner(params) {
    const bids = strapi.service("api::bid.bid").findMany({
      fields: ["user", "value"],
      filters: { product: params.product },
      sort: { value: "DESC" },
    });

    console.log(bids);

    return bids;
  },
}));
