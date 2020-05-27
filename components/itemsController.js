const { User } = require('../../models/user');
const { Item } = require('../../models/item');
const { Category } = require('../../models/category');
const error = require('../../middlewares/errorHandling/errorConstants');
const slug = require('slug');

/**
 * @api {post} /items Add item
 * @apiVersion 1.0.0
 * @apiName addItem
 * @apiDescription Add new item
 * @apiGroup Items
 *
 * @apiParam (body) {String} title Title
 * @apiParam (body) {String} condition Condition
 * @apiParam (body) {String} description Description
 * @apiParam (body) {query} categoryId Item category Id
 * @apiParam (body) {query} subcategoryId Item subcategory Id
 * @apiParam (body) {Object[]} photos Photos
 * @apiParam (body) {String} photos.url URL
 * @apiParam (body) {String} photos.fileName File Name
 * @apiParam (body) {String} photos.originalname Original Name
 * @apiParam (body) {String} photos.mimetype Type mime
 * @apiSuccessExample Success-Response:
  HTTP/1.1 200 OK
  {
    "message": "Successfully added new item!",
    "results": {
      "viewed": 0,
      "status": "active",
      "commentedByUser": false,
      "commentedByItemRequester": false,
      "unreadMessagesCounter": 0,
      "_id": "5e6a348ac6861214e0babe0d",
      "title": "beatae",
      "condition": "unused",
      "description": "Voluptatem corporis blanditiis eum voluptates recusandae quas consequatur quo. Maiores eum omnis dicta ipsum error quam. Perspiciatis adipisci minima molestiae consequatur dolorem quia facilis odio.",
      "category": "5e7dc5316c758b22b9849ed9",
      "subcategory": "5e7dc3cc6c758b22b9849ed7",
      "photos": [
        {
          "_id": "5e6a348ac6861214e0babe0e",
          "url": "http://zola.name",
          "fileName": "omnis",
          "originalname": "ut",
          "mimetype": "officiis"
          "thumbnail": {
            "url": "https://sevapp.fra1.digitaloceanspaces.com/feb85a0f-9b12-4a8e-924f-401c82f45b1e.jpg",
            "mimetype": "image/jpeg",
            "originalname": "thumbnail_IMG-0834.jpg",
            "fileName": "feb85a0f-9b12-4a8e-924f-401c82f45b1e.jpg"
          }
        }
      ],
      "user": "5e6a3489c6861214e0babe0c",
      "search": "lo New Aliyahstad beatae unused Voluptatem corporis blanditiis eum voluptates recusandae quas consequatur quo. Maiores eum omnis dicta ipsum error quam. Perspiciatis adipisci minima molestiae consequatur dolorem quia facilis odio. tenetur",
      "createdAt": "2020-03-12T13:09:30.034Z",
      "updatedAt": "2020-03-12T13:09:30.034Z",
      "location": "New Aliyahstad",
      "seen": "false",
      "deleted": "false",
      "__v": 0
    }
  } 
 * @apiUse MissingParamsError
 * @apiUse NotAcceptable
 */
module.exports.addItem = async (req, res) => {
  const { title, condition, description, photos } = req.body;
  const { _id } = req.user;
  const { categoryId, subcategoryId } = req.query;

  // Check if required data is sent
  if (!title || !condition || !description || !categoryId || !subcategoryId || !photos) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  // Checking title and description length
  if (!title.length || title.length > 30 || description.length > 500) {
    throw new Error(error.NOT_ACCEPTABLE);
  }

  const [user, categoryObj, subcategoryObj] = await Promise.all([
    User.findOne({ _id }).lean(),
    Category.findOne({ _id: categoryId }).lean(),
    Category.findOne({ _id: subcategoryId }).lean(),
  ]);

  const search = `${user.username} ${user.name} ${user.surname} ${user.company} ${user.location} ${title} ${condition} ${description} ${categoryObj.name} ${subcategoryObj.name}`;

  const item = await new Item({
    title,
    condition,
    description,
    category: categoryObj._id,
    subcategory: subcategoryObj._id,
    photos,
    user: _id,
    deleted: false,
    search: search + slug(search),
  }).save();

  // Send response
  return res.status(200).send({
    message: 'Successfully added new item!',
    results: item,
  });
};

/**
 * @api {get} /items/:itemId Get Item
 * @apiVersion 1.0.0
 * @apiName getItem
 * @apiDescription Get Item Details Page. IMPORTANT NOTE: To fetch an Item as a not logged in user, use public endpoint by adding '/public' in front of '/items': .../public/items/:itemId
 * @apiGroup Items
 * 
 * @apiParam (params) {String} itemId Item's ID
 * 
 * @apiSuccessExample Success-Response:
  HTTP/1.1 200 OK
  {
    "message": "Item successfully found!",
    "results": {
      "_id": "5e6b7c940cc0af197022a0e0",
      "viewed": 64665,
      "status": "active",
      "commentedByUser": false,
      "commentedByItemRequester": false,
      "unreadMessagesCounter": 0,
      "title": "Florida13",
      "condition": "unused",
      "description": "Aliquid voluptatem quis cumque. Et accusamus possimus distinctio maiores. Quis quod facere ex consequuntur eum qui id.",
      "category": {
        "_id": "5e7dc5316c758b22b9849ed9",
        "name": "Odeca"
      },
      "subcategory": {
        "_id": "5e7dc3cc6c758b22b9849ed7",
        "name": "Muska odeca"
      },
      "user": {
        "_id": "5e6b7c940cc0af197022a0dd",
        "isActive": true,
        "numberGivenGifts": 0,
        "lastResetPassAttempt": "2020-03-13T12:29:07.735Z",
        "wishlist": [],
        "userType": "person",
        "username": "vi",
        "name": "hic",
        "surname": "consectetur",
        "photo": {
          "url": "https://leo.com",
          "fileName": "quia",
          "originalname": "debitis",
          "mimetype": "vel"
          "thumbnail": {
            "url": "https://sevapp.fra1.digitaloceanspaces.com/feb85a0f-9b12-4a8e-924f-401c82f45b1e.jpg",
            "mimetype": "image/jpeg",
            "originalname": "thumbnail_IMG-0834.jpg",
            "fileName": "feb85a0f-9b12-4a8e-924f-401c82f45b1e.jpg"
          }
        },
        "email": "garland.weissnat@gmail.com",
        "role": "User",
        "description": "Veniam sit commodi sint magni excepturi. Tempora sit ipsum dignissimos dolores. Ipsa deleniti reprehenderit culpa placeat minus ut.",
        "allowNotifications": true,
        "allowAnnouncements": true,
        "resetToken": "ZbOx85KvZqc1ZPk",
        "location": "Lake Ashlynn",
        "createdAt": "2020-03-13T12:29:08.212Z",
        "updatedAt": "2020-03-13T12:29:08.212Z",
        "__v": 0
      },
      "itemRequester": "5e6b7c940cc0af197022a0df",
      "search": "sint officia vel",
      "photos": [
        {
          "_id": "5e6b7c940cc0af197022a0e1",
          "url": "https://camden.com",
          "fileName": "repellat",
          "originalname": "maiores",
          "mimetype": "enim"
          "thumbnail": {
            "url": "https://sevapp.fra1.digitaloceanspaces.com/feb85a0f-9b12-4a8e-924f-401c82f45b1e.jpg",
            "mimetype": "image/jpeg",
            "originalname": "thumbnail_IMG-0834.jpg",
            "fileName": "feb85a0f-9b12-4a8e-924f-401c82f45b1e.jpg"
          }
        }
      ],
      "createdAt": "2020-03-13T12:29:08.612Z",
      "updatedAt": "2020-03-13T12:29:08.663Z",
      "location": "Lake Ashlynn",
      "seen": "false",
      "deleted": "false",
      "__v": 0
    }
  }
 *
 * @apiUse NotFound
 */
module.exports.getItem = async (req, res) => {
  const { itemId } = req.params;
  let _id;

  if (req.user) {
    _id = req.user._id;
  }

  const item = await Item.findOne({ _id: itemId }).lean();

  if (!item) {
    throw new Error(error.NOT_FOUND);
  }

  const seenQuery = { $inc: { viewed: 1 } };

  // Find Item and update the number of views
  const updatedItem = await Item.findOneAndUpdate({ _id: itemId }, seenQuery, { new: true })
    .populate('user')
    .populate('category', 'name')
    .populate('subcategory', 'name')
    .lean();

  // Send response
  return res.status(200).send({
    message: 'Item successfully found!',
    results: updatedItem,
  });
};

/**
 * @api {delete} /items/:itemId Delete Item
 * @apiVersion 1.0.0
 * @apiName deleteItem
 * @apiDescription Delete Item
 * @apiGroup Items
 * 
 * @apiParam (params) {String} itemId Item's ID
 * 
 * @apiSuccessExample Success-Response:
  HTTP/1.1 200 OK
  {
    "message": "Item successfully deleted!"
  }
 *
 * @apiUse NotFound
 */
module.exports.deleteItem = async (req, res) => {
  const { itemId } = req.params;

  // Find and Delete the Item
  const item = await Item.findByIdAndUpdate(
    { _id: itemId },
    {
      $set: {
        deleted: true,
      },
    },
    { new: true }
  ).lean();

  if (!item) {
    throw new Error(error.NOT_FOUND);
  }

  // Send response
  return res.status(200).send({
    message: 'Item successfully deleted!',
  });
};
