import authenticatedClient, { client } from "./client";

export const registerCustomer = async (name, segment, email, password) => {
  const requestBody = {
    name: name,
    segment: segment,
    email: email,
    password: password,
  };
  const response = await client.post("/auth/register", requestBody);
  if (response.status === 200) {
    return { success: true, message: response.data.message };
  } else {
    throw new Error(response.data.message);
  }
};

export const loginCustomer = async (email, password) => {
  const requestBody = {
    email: email,
    password: password,
  };
  const response = await client.post("/auth/login", requestBody);
  if (response.status === 200) {
    return {
      success: true,
      message: response.data.message,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAllProducts = async () => {
  const response = await client.get("/products");
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const updateCustomer = async (
  customerId,
  customerName,
  segment,
  email
) => {
  const requestBody = {
    customerId: customerId,
    customerName: customerName,
    segment: segment,
    email: email,
  };
  const client = authenticatedClient();
  const response = await client.post("/customer", requestBody);
  if (response.status === 200) {
    return {
      success: true,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getCustomerById = async (customerId) => {
  const client = authenticatedClient();
  const response = await client.get(`/customer/${customerId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAddressByCustomerId = async (customerId) => {
  const client = authenticatedClient();
  const response = await client.get(`/address/${customerId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAllRegions = async () => {
  const client = authenticatedClient();
  const response = await client.get("/address/regions");
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAllCountriesByRegion = async (regionId) => {
  const client = authenticatedClient();
  const response = await client.get(`/address/countries/${regionId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAllStatesByCountry = async (countryId) => {
  const client = authenticatedClient();
  const response = await client.get(`/address/states/${countryId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAllCitiesByState = async (stateId) => {
  const client = authenticatedClient();
  const response = await client.get(`/address/cities/${stateId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const addAddress = async (cityId, postalCode, customerId) => {
  const requestBody = {
    cityId: cityId,
    postalCode: postalCode,
    customerId: customerId,
  };
  const client = authenticatedClient();
  const response = await client.put("/address", requestBody);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const editAddress = async (addressId, cityId, postalCode) => {
  const requestBody = {
    addressId: addressId,
    cityId: cityId,
    postalCode: postalCode,
  };
  const client = authenticatedClient();
  const response = await client.post("/address", requestBody);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAddressById = async (addressId) => {
  const client = authenticatedClient();
  const response = await client.get(`/address/id/${addressId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const sendOTPByEmail = async (email) => {
  const response = await client.post(`/auth/sendOTP/${email}`);
  if (response.status === 200) {
    return {
      success: true,
      message: response.data.message,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const changePasswordByCustId = async (
  customerId,
  otpCode,
  password,
  confirmPassword
) => {
  const requestBody = {
    customerId: customerId,
    otpCode: otpCode,
    password: password,
    confirmPassword: confirmPassword,
  };
  const client = authenticatedClient();
  const response = await client.post(
    "/auth/changePassword/custId",
    requestBody
  );
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const validateOTP = async (email, otpCode) => {
  const requestBody = {
    email: email,
    otpCode: otpCode,
  };
  const client = authenticatedClient();
  const response = await client.post(
    "/auth/forgotPassword/validateOTP",
    requestBody
  );
  if (response.status === 200) {
    return {
      success: true,
      message: response.data.message,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const changePassword = async (email, password, confirmPassword) => {
  const requestBody = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };
  const client = authenticatedClient();
  const response = await client.post(
    "/auth/forgotPassword/change",
    requestBody
  );
  if (response.status === 200) {
    return {
      success: true,
      message: response.data.message,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const placeOrder = async (
  order,
  in_addr_id,
  in_cust_id,
  in_ship_mode,
  in_ship_date
) => {
  const requestBody = {
    order,
    addr_id: in_addr_id,
    cust_id: in_cust_id,
    ship_mode: in_ship_mode,
    ship_date: in_ship_date,
  };
  const client = authenticatedClient();
  const response = await client.post("/orders", requestBody);
  if (response.status === 200) {
    return {
      success: true,
    };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAllProductCategories = async () => {
  const client = authenticatedClient();
  const response = await client.get("/products/category");
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error("Network error");
  }
};

export const getAllProductSubcategories = async (categoryId) => {
  const client = authenticatedClient();
  const response = await client.get(`products/subcategory/${categoryId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error("Network error");
  }
};

export const getOrdersByCustomerAndReturned = async (customerId, isReturned) => {
  const client = authenticatedClient();
  const isReturnedSerialized = isReturned ? '1' : '0';
  const response = await client.get(`orders?customerId=${customerId}&isReturned=${isReturnedSerialized}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error("Network error");
  }
}

export const returnOrder = async(orderId) => {
  const client = authenticatedClient();
  const response = await client.post(`orders/return/${orderId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error("Network error");
  }
}

export const getOrderDetails = async(orderId) => {
  const client = authenticatedClient();
  const response = await client.get(`orders/details/${orderId}`);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data
    };
  } else {
    throw new Error("Network error");
  }
}

export const addProduct = async (
  productName,
  unitPrice,
  market,
  subcategoryId
) => {
  const client = authenticatedClient();
  const requestBody = {
    productName: productName,
    unitPrice: unitPrice,
    market: market,
    subcategoryId: subcategoryId,
  };
  const response = await client.post("products", requestBody);
  if (response.status === 200) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw new Error(response.data.message);
  }
};
