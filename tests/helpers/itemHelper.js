const faker = require('faker');
const { Item } = require('../../models/item');
const { createUser } = require('./userHelper');
const { createCategory } = require('./categoryHelper');

module.exports.createItem = async ({
  title = faker.internet.userName(),
  condition = 'unused',
  description = faker.lorem.sentences((sentenceCount = 3)),
  category,
  subcategory,
  viewed = faker.random.number(),
  status = 'active',
  user,
  itemRequester,
  latestMessageDate,
  giftedDate,
  unreadMessagesCounter = 0,
  search = faker.lorem.words(),
  archived,
  seen = false,
  deleted = false,
  photos = [
    {
      url: faker.internet.url(),
      fileName: faker.lorem.word(),
      originalname: faker.lorem.word(),
      mimetype: faker.lorem.word(),
      thumbnail: {
        url: faker.internet.url(),
        fileName: faker.lorem.word(),
        originalname: faker.lorem.word(),
        mimetype: faker.lorem.word(),
      },
    },
  ],
} = {}) => {
  if (!user) {
    user = (await createUser()).user._id;
  }
  if (!itemRequester) {
    itemRequester = (await createUser()).user._id;
  }
  if (!category) {
    category = await createCategory();
  }
  if (!subcategory) {
    subcategory = await createCategory({ parent: category._id, categoryType: 'subcategory', subcategories: [] });
  }
  return new Item({
    title,
    condition,
    description,
    category,
    subcategory,
    viewed,
    status,
    user,
    itemRequester,
    search,
    photos,
    latestMessageDate,
    giftedDate,
    unreadMessagesCounter,
    archived,
    seen,
    deleted,
  }).save();
};

module.exports.createManyItems = async ({
  title = faker.internet.password(),
  numberOfListItems = 1,
  condition = 'unused',
  status = 'active',
  user,
  itemRequester,
  description = faker.lorem.sentences((sentenceCount = 3)),
  search = faker.lorem.words(),
  category,
  subcategory,
  viewed = faker.random.number(),
  latestMessageDate,
  giftedDate,
  unreadMessagesCounter = 0,
  location = faker.lorem.word(),
  seen = false,
  deleted = false,
  photos = [
    {
      url: faker.internet.url(),
      fileName: faker.lorem.word(),
      originalname: faker.lorem.word(),
      mimetype: faker.lorem.word(),
      thumbnail: {
        url: faker.internet.url(),
        fileName: faker.lorem.word(),
        originalname: faker.lorem.word(),
        mimetype: faker.lorem.word(),
      },
    },
  ],
} = {}) => {
  const set = [];
  if (!user) {
    user = (await createUser()).user._id;
  }

  if (!itemRequester) {
    itemRequester = (await createUser()).user._id;
  }

  if (!category) {
    category = await createCategory();
  }

  if (!subcategory) {
    subcategory = await createCategory({ parent: category._id, categoryType: 'subcategory', subcategories: [] });
  }

  for (let i = 0; i < numberOfListItems; i += 1) {
    set.push({
      title,
      condition,
      description,
      category,
      subcategory,
      viewed,
      status,
      user,
      itemRequester,
      search,
      latestMessageDate,
      giftedDate,
      unreadMessagesCounter,
      location,
      seen,
      deleted,
      photos,
    });
  }
  return Item.insertMany(set);
};
