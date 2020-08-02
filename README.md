# Challenge GoMarketPlace

## Create customer

- Created customers table migration
- Created customer typeorm entity
- Registered customer's repository singleton
- Created CreateCustomer service, injecting the customers repository singleton
- Created customers controller, using the createCustomerService singleton

## Create product

- Created customers table migration
- Created product typeorm entity
- Registered product's repository singleton
- Added create and findByName methods to product typeorm repository
- Created CreateProduct service, injecting the products repository singleton
- Created products controller, using the createProductService singleton

## Create order

- Created orders table migration
- Created orders_products pivot table migration
- Created order entity
- Created orders_products entity
- Added relation to orders_products entity inside order and product entities
- Registered orders repository singleton
- Added create and findById methods to order typeorm repository
- Created createOrder service
- Created findOrder service
- Created orders controller
- Fixed updateQuantity on Products repository
