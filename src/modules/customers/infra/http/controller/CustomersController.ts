import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    // TO-DO: Use lib for better validations
    if (!name?.trim()) {
      throw new AppError('Name cannot be empty');
    }

    if (!email?.trim()) {
      throw new AppError('E-mail cannot be empty');
    }

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, email });

    return response.json(customer);
  }
}
