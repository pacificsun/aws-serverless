import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCustomer = async (customerData) => {
  // Create a new customer object
  console.log('createCustomer');
  try {
    const customer = await stripe.customers.create(customerData);
    console.log(customer);
    return customer;
  } catch (error) {
    console.log(`create Customer process interrupted!`);
    throw new Error(error);
  }
};

export const updateCustomer = async (customerId, customerData) => {
  console.log('updateCustomer');
  try {
    const customer = await stripe.customers.update(customerId, customerData);
    console.log(customer);
    return customer;
  } catch (error) {
    console.log(`update Customer process interrupted!`);
    throw new Error(error);
  }
};

export const createSource = async (sourceData) => {
  console.log('createSource');
  try {
    const source = await stripe.sources.create(sourceData);
    console.log(source);
    return source;
  } catch (error) {
    console.log(`create Source process interrupted!`);
    throw new Error(error);
  }
};

export const createCharge = async (chargeData) => {
  console.log('createCharge', chargeData);
  try {
    const stripeCharge = await stripe.charges.create(chargeData);
    console.log(stripeCharge);
    return stripeCharge;
  } catch (error) {
    console.log(`create charge process interrupted!`);
    throw new Error(error);
  }
};

export async function createPrice(name, amount, description) {
  //create product
  const stripeProduct = await stripe.products.create({
    name,
    description,
  });

  try {
    // Create price
    const stripePrice = await stripe.prices.create({
      currency: 'eur',
      unit_amount: amount, // in cents
      recurring: {
        interval: 'month',
      },
      product: stripeProduct.id,
    });

    return stripePrice;
  } catch (error) {
    console.log(`create price process interrupted!`);
    throw new Error(error);
  }
}

export async function createSubscription(customer, subsPlan, domain) {
  console.log('createSubscription');
  try {
    const body = {
      customer,
      items: [{ price: subsPlan }],
      metadata: { companyname: domain },
    };
    const subscription = await stripe.subscriptions.create(body);
    return subscription;
  } catch (error) {
    console.log(`create subscription process interrupted!`);
    throw new Error(error);
  }
}

export async function updateSubscription(subscriptionId, subsData) {
  console.log('updateSubscription');
  try {
    const subscription = await stripe.subscriptions.update(
      subscriptionId,
      subsData
    );

    return subscription;
  } catch (error) {
    console.log(`update subscription process interrupted!`);
    throw new Error(error);
  }
}

export async function cancelSubscription(subscriptionId) {
  console.log('cancelSubscription');
  try {
    const subscription = await stripe.subscriptions.del(subscriptionId);
    return subscription;
  } catch (error) {
    console.log(`cancel subscription process interrupted!`);
    throw new Error(error);
  }
}

export async function retrieveSubscription(subscriptionId) {
  console.log('retrieveSubscription');
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.log(`retrieve subscription process interrupted!`);
    throw new Error(error);
  }
}
