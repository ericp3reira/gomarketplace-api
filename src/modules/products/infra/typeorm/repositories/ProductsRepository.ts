import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({ where: { name } });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(({ id }) => id);

    const foundProducts = await this.ormRepository.findByIds(productIds);

    // could also be:
    // const foundProducts = await this.ormRepository.find({
    //   where: { id: In(productIds) },
    // });

    return foundProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const foundProducts: Product[] = [];

    products.forEach(async ({ id, quantity }) => {
      await this.ormRepository.update(id, { quantity });

      const foundProduct = await this.ormRepository.findOne(id);

      if (foundProduct) {
        foundProducts.push(foundProduct);
      }
    });

    return foundProducts;
  }
}

export default ProductsRepository;
