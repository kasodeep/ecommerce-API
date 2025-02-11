#### Setup Basic Express Server

-   [✔] Import express and assign to variable
-   [✔] Setup start port variable (5000) and start function

#### Connect To DB

-   [✔] Get connection string
-   [✔] Setup .env with MONGO_URL variable and assign the value
-   [✔] Import 'dotenv' and setup package
-   [✔] Import connect() and invoke in the starter
-   [✔] Restart the server

#### Basic Routes and Middleware

-   [✔] Setup / GET Route
-   [✔] Setup express.json() middleware
-   [✔] Setup 404 and errorHandler middleware
-   [✔] Import 'exress-async-errors' package

#### 404 vs ErrorHandler Middleware

#### Morgan Pacakge

-   [Morgan Package](https://www.npmjs.com/package/morgan)

#### User Model

-   [✔] Create models folder and User.js file
-   [✔] Create schema with name,email, password (all type:String)
-   [✔] Export mongoose model

#### Validator Package

-   [Validator](https://www.npmjs.com/package/validator)

#### Auth Routes Structure

-   [✔] Create controllers folder
-   [✔] Add authController file
-   [✔] Export (register, login, logout) functions
-   [✔] Create routes folder
-   [✔] Setup authRoutes file
-   [✔] Import all controllers
-   [✔] Setup three routes
-   [✔] post('/register') post('/login') get('/logout')
-   [✔] Import authRoutes as authRouter in the app.js
-   [✔] Setup app.use('/api/v1/auth', authRouter)

#### Test Routes in Postman

#### Register Controller

-   [✔] Create user
-   [✔] Send response with entire user (only while testing)
-   [✔] Check if email already in use (schema and controller)
-   [✔] Ignore 'role'
-   [✔] Alternative 'admin' setup

#### Handle Password

-   [✔] UserSchema.pre('save') - hook
-   bcrypt.genSalt - number of rounds
-   bcrypt.hash

#### JWT

-   [✔] Require 'jsonwebtoken' package
-   [✔] Create jwt - jwt.sign(payload,secret,options)
-   [✔] Verify jwt - jwt.verify(token,secret)
-   [✔] Add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
-   [✔] Refactor code, create jwt functions in utils
-   [✔] Refactor cookie code
-   [✔] Setup func attachCookiesToResponse
-   [✔] Accept payload(res, tokenUser)
-   [✔] Create token, setup cookie
-   [✔] Optionally send back the response

#### Login Route

-   [✔] Check if email and password exist, if one missing return 400
-   [✔] Find user, if no user return 401
-   [✔] Check password, if does not match return 401
-   [✔] If everything is correct, attach cookie and send back the same response as in register

#### Logout Route

-   [✔] Set token cookie equal to some string value
-   [✔] Set expires:new Date(Date.now())

#### User Routes Structure

-   [✔] Add userController file
-   [✔] Export (getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword) functions
-   [✔] Setup userRoutes file
-   [✔] Import all controllers
-   [✔] Import userRoutes as userRouter in the app.js
-   [✔] Setup app.use('/api/v1/users', userRouter)

#### GetAllUsers and GetSingleUser

-   [✔] Get all users where role is 'user' and remove password
-   [✔] Get Single User where id matches id param and remove password
-   [✔] If no user 404

#### Authenticate User Setup

#### Auth User Complete

#### Authorize Permissions Setup

-   [✔] Hardcode

#### Authorize Permissions Complete

-   [✔] Introduce params

#### ShowCurrentUser

-   [✔] Get user from req
-   [✔] Send response with user

#### UpdateUserPassword

-   [✔] Almost identical to login user
-   [✔] Add authenticateUser middleware in the route
-   [✔] Check for oldPassword and newPassword in the body
-   [✔] If one missing 400
-   [✔] Look for user with req.user.userId
-   [✔] Check if oldPassword matches with user.comparePassword
-   [✔] If no match 401
-   [✔] If everything good set user.password equal to newPassword
-   [✔] Await user.save()

#### createTokenUser in Utils

-   [✔] Create a file in utils (createTokenUser)
-   [✔] Setup a function that accepts user object and returns userToken object
-   [✔] Setup all the correct imports/exports and refactor existing code

#### updateUser with User.findOneAndUpdate()

-   [✔] Add authenticateUser middleware in the route
-   [✔] Check for name and email in the body
-   [✔] If one is missing, send 400 (optional)
-   [✔] Use findOneAndUpdate()
-   [✔] Create token user, attachCookiesToResponse and send back the tokenUser

#### updateUser with user.save()

#### Setup and Apply checkPermissions()

#### Product Model

-   [✔] Create Product.js in models folder
-   [✔] Create Schema
-   [✔] name : {type:String}
-   [✔] price: {type:Number}
-   [✔] description: {type:String}
-   [✔] image: {type:String}
-   [✔] category: {type:String}
-   [✔] company: {type:String}
-   [✔] colors: {type:[]}
-   [✔] featured: {type:Boolean}
-   [✔] freeShipping: {type:Boolean}
-   [✔] inventory:{type:Number}
-   [✔] averageRating:{type:Number}
-   [✔] user
-   [✔] Set timestamps
-   [✔] Export Product model

#### Product Structure

-   [✔] Export (createProduct, getAllProducts,
-   [✔] add productController file in controllers getSingleProduct, updateProduct, deleteProduct, uploadImage) functions
-   [✔] res.send('function name')
-   [✔] Setup productRoutes file in routes
-   [✔] Import all controllers
-   [✔] Only getAllProducts and getSingleProduct accessible to public
-   [✔] Rest only by admin (setup middlewares)
-   [✔] Typical setup
-   [✔] Router.route('/uploadImage').post(uploadImage)
-   [✔] Import productRoutes as productRouter in the app.js
-   [✔] Setup app.use('/api/v1/products', productRouter)

#### Product Routes in Postman

#### Create Product

-   [✔] Create user property on req.body and set it equal to userId (req.user)
-   [✔] Pass req.body into Product.create
-   [✔] Send back the product

#### Remaining Controllers (apart from uploadImage)

-   [✔] GetAllProducts
-   [✔] GetSingleProduct
-   [✔] UpdateProduct
-   [✔] DeleteProduct
-   [✔] Typical CRUD, utilize (task or job) project
-   [✔] Remember we check already for role 'admin'

#### Upload Image

-   [✔] If some question, re-watch 07-file-upload
-   [✔] Images folder with two images

#### Review Model

-   [✔] Create Review.js in models folder
-   [✔] Create Schema
-   [✔] rating : {type:Number}
-   [✔] title: {type:String}
-   [✔] comment: {type:String}
-   [✔] user
-   [✔] product
-   [✔] Set timestamps
-   [✔] Export Review model

#### Review Structure

-   [✔] Add reviewController file in controllers
-   [✔] Export (createReview, getAllReviews, getSingleReview, updateReview, deleteReview) functions
-   [✔] res.send('function name')
-   [✔] Setup reviewRoutes file in routes
-   [✔] Import all controllers
-   [✔] Only getAllReviews and getSingleReview accessible to public
-   [✔] Rest only to users (setup middleware)
-   [✔] Typical REST setup
-   [✔] Import reviewRoutes as reviewRouter in the app.js
-   [✔] Setup app.use('/api/v1/reviews', reviewRouter)

#### Create Review

-   [✔] Check for product in the req.body
-   [✔] Attach user property (set it equal to req.user.userId) on to req.body
-   [✔] Create review
-   [✔] Don't test yet

#### Get All Reviews and Get Single Review

-   [✔] Both public routes, typical setup

#### Delete Review

-   [✔] Get id from req.params
-   [✔] Check if review exists
-   [✔] If no review, 404
-   [✔] Check permissions (req.user, review.user)
-   [✔] Use await review.remove()
-   [✔] Send back 200

#### Update Review

-   [✔] Get id from req.params
-   [✔] Get {rating, title comment} from req.body
-   [✔] Check if review exists
-   [✔] If no review, 404
-   [✔] Check permissions
-   [✔] Set review properties equal to rating, title, comment
-   [✔] Use await review.save()
-   [✔] Send back 200

#### Populate

#### Virtuals

#### Get Single Product Reviews

#### Remove All Reviews

#### Aggregation Pipeline - Atlas and Code

#### Order Schema

-   [✔] Create Order.js in models folder
-   [✔] Create Schema
-   [✔] tax : {type:Number}
-   [✔] shippingFee: {type:Number}
-   [✔] subtotal: {type:Number}
-   [✔] total: {type:Number}
-   [✔] orderItems:[]
-   [✔] status:{type:String}
-   [✔] user
-   [✔] clientSecret:{type:String}
-   [✔] paymentId:{type:String}
-   [✔] Set timestamps
-   [✔] Export Order model

#### Order Structure

-   [✔] Add orderController file in controllers
-   [✔] Export (getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder) functions
-   [✔] res.send('function name')
-   [✔] Setup orderRoutes file in routes
-   [✔] Import all controllers
-   [✔] Authenticate user in all routes
-   [✔] GetAllOrders admin only
-   [✔] Typical REST setup
-   [✔] router.route('/showAllMyOrders').get(getCurrentUserOrders)
-   [✔] Import orderRoutes as orderRouter in the app.js
-   [✔] Setup app.use('/api/v1/orders', orderRouter)

#### Order in Postman

#### Create Order

-   [✔] Most complex

#### Get All Orders and Get Single Order

-   [✔] getAllOrders - admin only
-   [✔] getSingleOrder - chechPermissions

#### Get Current User Orders

-   [✔] Find orders where user is equal to req.user.userId

#### Update Order

-   [✔] Get order id
-   [✔] Get paymentIntentId (req.body)
-   [✔] Get order
-   [✔] If does not exist - 404
-   [✔] Set paymentIntentId and status as 'paid'
-   [✔] order.save()

#### Create Docs

-   [✔] [Docgen Library] (https://github.com/thedevsaddam/docgen)
-   [✔] Export Postman Collection
-   [✔] Docgen build -i fileName.json -o index.html
-   [✔] Create index.html in public

#### Security Packages

-   [✔] express-rate-limiter
-   [✔] helmet
-   [✔] xss-clean
-   [✔] express-mongo-sanitize
-   [✔] cors (cookies!!!!)
