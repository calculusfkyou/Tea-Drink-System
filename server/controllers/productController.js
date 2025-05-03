import Product from '../models/productModel.js';

// 獲取所有產品
export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    // 如果提供了類別，則按類別過濾
    const whereClause = category ? { category } : {};

    const products = await Product.findAll({
      where: whereClause,
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      status: 'success',
      results: products.length,
      data: products
    });
  } catch (error) {
    console.error('獲取產品時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '服務器錯誤',
      error: error.message
    });
  }
};

// 獲取單一產品
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到該產品'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    console.error('獲取產品時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '服務器錯誤',
      error: error.message
    });
  }
};

// 獲取推薦產品
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category: 'recommended' },
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      status: 'success',
      results: products.length,
      data: products
    });
  } catch (error) {
    console.error('獲取推薦產品時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '服務器錯誤',
      error: error.message
    });
  }
};

// 獲取不同類別的產品
export const getCategoryProducts = async (req, res) => {
  try {
    // 獲取所有產品並按類別分組
    const allProducts = await Product.findAll({
      order: [['id', 'ASC']]
    });

    // 將產品按類別分組
    const groupedProducts = allProducts.reduce((groups, product) => {
      const category = product.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
      return groups;
    }, {});

    return res.status(200).json({
      status: 'success',
      data: groupedProducts
    });
  } catch (error) {
    console.error('獲取分類產品時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '服務器錯誤',
      error: error.message
    });
  }
};
