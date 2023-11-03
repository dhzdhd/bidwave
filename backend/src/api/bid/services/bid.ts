/**
 * bid service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::bid.bid", ({ strapi }) => ({
  makeBid(params) {
    return strapi.service("api::bid.bid").create({
      data: {
        value: params.bidValue,
        user: params.user,
        product: params.product,
        publishedAt: new Date(),
      },
    });
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
