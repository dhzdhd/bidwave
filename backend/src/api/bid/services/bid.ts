/**
 * bid service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::bid.bid", ({ strapi }) => ({
  makeBid(params) {
    return strapi.service("api::bid.bid").create({
      data: {
        value: params.bidValue,
        account: params.account,
        product: params.product,
        publishedAt: new Date(),
      },
    });
  },
}));
