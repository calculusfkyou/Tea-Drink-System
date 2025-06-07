// 創建文件：server/scripts/removeEmailIndexMigration.js
import sequelize from '../config/database.js';

const removeEmailIndexWithMigration = async () => {
  try {
    console.log('正在連接資料庫...');
    await sequelize.authenticate();
    console.log('資料庫連接成功');

    // 使用 Sequelize 的 QueryInterface 來刪除索引
    const queryInterface = sequelize.getQueryInterface();

    console.log('正在檢查索引是否存在...');

    // 先檢查索引是否存在
    const indexes = await queryInterface.showIndex('Users');
    const emailIndexExists = indexes.some(index =>
      index.name === 'users_email_unique' ||
      index.name === 'email' ||
      (index.unique && index.fields.some(field => field.attribute === 'email'))
    );

    if (emailIndexExists) {
      console.log('找到 email 索引，正在刪除...');

      // 嘗試刪除可能的索引名稱
      const possibleIndexNames = ['users_email_unique', 'email', 'Users_email_unique'];

      for (const indexName of possibleIndexNames) {
        try {
          await queryInterface.removeIndex('Users', indexName);
          console.log(`✅ 索引 ${indexName} 已成功刪除`);
          break;
        } catch (error) {
          if (!error.message.includes("doesn't exist")) {
            console.log(`索引 ${indexName} 不存在，嘗試下一個...`);
          }
        }
      }
    } else {
      console.log('⚠️  未找到 email 相關的唯一索引');
    }

    // 顯示當前所有索引
    console.log('\n當前資料表索引:');
    const currentIndexes = await queryInterface.showIndex('Users');
    currentIndexes.forEach(index => {
      console.log(`- ${index.name}: ${index.fields.map(f => f.attribute).join(', ')} ${index.unique ? '(唯一)' : ''}`);
    });

  } catch (error) {
    console.error('❌ 操作失敗:', error.message);
  } finally {
    await sequelize.close();
    console.log('\n資料庫連接已關閉');
    process.exit();
  }
};

removeEmailIndexWithMigration();
