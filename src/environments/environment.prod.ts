export const API_GATEWAY = "http://localhost:8080";

export const environment = {
  production: true,
  SERVICE: {
    PRICE_ENGINE: {
      GET_ALL_PRODUCTS: API_GATEWAY + "/price-engine",
      CALCULATE_PRICE: API_GATEWAY + "/price-engine/calculatePrice"
    }
  }
};
