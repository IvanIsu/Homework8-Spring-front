package com.isupov.services;

import com.isupov.model.Product;
import com.isupov.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product getProductById(Long id){

        return productRepository.findById(id).orElseThrow();
    }

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    public void addProduct(String title, int price) {
        Product product = new Product();
        product.setTitle(title);
        product.setPrice(price);
        productRepository.save(product);
    }
    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public List<Product> getAllProductMinMax(Integer min, Integer max) {
        if(min == null && max == null){
            return productRepository.findAll();
        }
        if(min == null){
            return productRepository.getAllByPriceBefore(max);
        } else if (max == null) {
            return productRepository.getAllByPriceAfter(min);
        }
        return productRepository.getAllByPriceAfterAndPriceBefore(min,max);
    }
}
