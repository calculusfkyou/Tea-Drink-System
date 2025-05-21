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

// 管理員 - 獲取所有產品 (包含可用和不可用)
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      status: 'success',
      results: products.length,
      data: products
    });
  } catch (error) {
    console.error('獲取管理員產品列表時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '服務器錯誤',
      error: error.message
    });
  }
};

// 管理員 - 創建新產品
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // 驗證必要欄位
    if (!productData.name || !productData.category) {
      return res.status(400).json({
        status: 'fail',
        message: '產品名稱和分類為必填欄位'
      });
    }

    // 確保至少有中杯或大杯價格
    if (productData.priceM === null && productData.priceL === null) {
      return res.status(400).json({
        status: 'fail',
        message: '至少需要設定中杯或大杯價格'
      });
    }

    const newProduct = await Product.create(productData);

    return res.status(201).json({
      status: 'success',
      data: newProduct
    });
  } catch (error) {
    console.error('創建產品時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '無法創建產品',
      error: error.message
    });
  }
};

// 管理員 - 更新產品
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到產品'
      });
    }

    // 確保至少有中杯或大杯價格
    if (productData.priceM === null && productData.priceL === null) {
      return res.status(400).json({
        status: 'fail',
        message: '至少需要設定中杯或大杯價格'
      });
    }

    await product.update(productData);

    return res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    console.error('更新產品時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '無法更新產品',
      error: error.message
    });
  }
};

// 管理員 - 切換產品可用狀態
export const toggleProductAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到產品'
      });
    }

    // 切換狀態
    product.isAvailable = !product.isAvailable;
    await product.save();

    return res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    console.error('切換產品可用性時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '無法更新產品狀態',
      error: error.message
    });
  }
};

// 管理員 - 刪除產品
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到產品'
      });
    }

    await product.destroy();

    return res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    console.error('刪除產品時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '無法刪除產品',
      error: error.message
    });
  }
};
