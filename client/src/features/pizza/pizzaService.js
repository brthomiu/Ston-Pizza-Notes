import axios from "axios";

const API_URL = "/api/pizzas/";

// Create pizza
const createPizza = async (pizzaData) => {
  const response = await axios.post(API_URL, pizzaData);
  
  return response.data;
};

// Delete pizza
const deletePizza = async (pizzaId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/:${pizzaId}`, config);

  return response.data;
};

const pizzaService = {
  createPizza,
  deletePizza,
};

export default pizzaService;
