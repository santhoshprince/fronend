import React, { useState, useEffect } from 'react';
import { Button, Drawer, Input, Form, message } from 'antd';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch products on component load
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCreateProduct = (values) => {
    axios.post('http://localhost:5000/api/products', values)
      .then(response => {
        setProducts([...products, response.data.product]);
        setDrawerVisible(false);
        form.resetFields(); // Reset form after submission
        message.success('Product created successfully!');
      })
      .catch(error => {
        console.error('Error creating product:', error);
        message.error('Error creating product');
      });
  };

  return (
    <div>
      <h1>Product List</h1>
      <Button type="primary" onClick={() => setDrawerVisible(true)}>
        Create Product
      </Button>

      <Drawer
        title="Create New Product"
        width={400}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleCreateProduct}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter the product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Product Description"
            rules={[{ required: true, message: 'Please enter the product description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <ul className='new-list'>
        {products.map(product => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <small>{new Date(product.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
