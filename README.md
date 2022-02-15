# Light Saber Webshop

- This is my solution for the **Digital Solutions** Code Creator Assessment.

## Outline

- [Technologies and Libraries](#technologies-and-libraries)
- [Instructions](#instructions)
- [Structure](#structure)
- [Implementation Details](#implementation-details)
  - [API Details](#api-details)

## Technologies and Libraries

This project was build using React & Node.js using the following list of technologies and libraries:

- [Express](https://expressjs.com/)
- [Joi Validation](https://joi.dev/api/?v=17.6.0)
- [express-xml-bodyparser](https://www.npmjs.com/package/express-xml-bodyparser)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [cors](https://www.npmjs.com/package/cors)
- [MUI](https://mui.com/)
- [uuidv4](https://www.npmjs.com/package/uuidv4)
- [typewriter-effect](https://www.npmjs.com/package/typewriter-effect)

---

## Instructions

For the _Back-end_ we are using a **Secure Sockets Layer** and to do so we generated a **self-signed SSL certificate**.
So if you want to use our API you will need to generate your own self-signed SSL certificate.
**To do so, follow the snippet code below**.

First create a new Folder called **ssl**.

> openssl genrsa -out key.pem

Once you give the following command, you will be asked some questions answer as much as you can!

> openssl req -new -key key.pem -out csr.pem

> openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

---

## Structure

> ```
> client
> ├── public
> |   └── favicon.ico
> |   └── index.html
> └── src
> |   └── assets
> |       └── app-bg.jpg
> |       └── jedi-master.jpg
> |       └── padawan.png
> |       └── Inputsabers.xml
> |   └── components
> |       └── FlipCard.js
> |       └── Header.js
> |       └── Orders.js
> |       └── Pagination.js
> |       └── Sabers.js
> |   └── routes
> |       └── CreateLightSaber.js
> |       └── DisplayOrders.js
> |       └── DisplaySabers.js
> |       └── JediMaster.js
> |       └── MainGif.js
> |       └── Padawan.js
> |       └── SaberShopping.js
> |   └── utils
> |       └── sendXML.js
>         App.js
>         index.css
>         index.js
> server
> └── controllers
>     └── jediMaster.js
>     └── lightSabers.js
> └── models
>     └── crystal.js
>     └── lightSabers.js
>     └── order.js
> └── routes
>     └── jediMaster.js
>     └── lightSabers.js
> └── utils
>     └── priceFormula.js
> └── validation
>     └── crystalValidationSchema.js
>     └── lightsaberValidationSchema.js
>     └── validator.js
>     app.js
> ```

- `controllers` this contains the handlers function for each resource we have.
- `models` this contains the Mongoose Schema to create the collection for crystals, lightsabers & orderlightsabers.
- `routes` this contains the resources for both _/Jedisabershop_ & _/JediMaster_.
- `utils` this contains the logic for calculating the _saber price_ depending on the _padawan age_.
- `validation` this contains every Joi validation schema for each kind of data the user gonna provide, in addition to the _validator_ function which either gonna validate the data and move to the API functions or gonna send the _ValidationError_ with statusCode _422_.
- `app.js` this contains setting up our server using express & https.

---

## Implementation Details

### API Details

#### Listing all existing crystals

<details>
 <summary><code>GET</code> <code><b>/JediMaster/crystal</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                                |
> | --------- | ------------------ | ------------------------------------------------------- |
> | `200`     | `application/json` | `json`                                                  |
> | `500`     | `application/json` | `{ msg: 'app could not retrieve data from database!' }` |

##### Example

> ```Postman
>  GET -> https://localhost:7000/JediMaster/crystal
> ```

</details>

#### Creating a new crystal

<details>
 <summary><code>POST</code> <code><b>/JediMaster/crystal</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                         |
> | --------- | ------------------ | ------------------------------------------------ |
> | `201`     | `application/json` | `The ${newCrystal.name} Crystal has been added!` |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`           |
> | `500`     | `application/json` | `{ message: error.message }`                     |

##### Example

> ```Postman
>  POST -> https://localhost:7000/JediMaster/crystal
>  Body -> {    "name": "Hurrikaine", "color": "purple", "mode": "Moral ambiguity", "f": 25, "cr": 50
>          }
> ```

</details>

#### Updating an existing crystal

<details>
  <summary><code>PATCH</code> <code><b>/JediMaster/crystal</b></code> <code>(update only the mode value for a particular crystal)</code></summary>

##### Parameters

> | name | type     |
> | ---- | -------- |
> | name | required |

##### Responses

> | http code | content-type       | response                                            |
> | --------- | ------------------ | --------------------------------------------------- |
> | `200`     | `application/json` | `The ${crystalNameQuery} Crystal has been updated!` |
> | `400`     | `application/json` | `No content was provided!`                          |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`              |
> | `500`     | `application/json` | `{ message: error.message }`                        |

##### Example

> ```Postman
>  PATCH -> https://localhost:7000/JediMaster/crystal?name=Ilum
>  Query Params: KEY -> name, VALUE -> Ilum
>  Body -> {
>             "mode": "Evil and power"
>          }
> ```

</details>

#### Deleting an existing crystal

<details>
  <summary><code>DELETE</code> <code><b>/JediMaster/crystal</b></code> <code>(deletes a particular crystal)</code></summary>

##### Parameters

> | name | type     |
> | ---- | -------- |
> | name | required |

##### Responses

> | http code | content-type       | response                                            |
> | --------- | ------------------ | --------------------------------------------------- |
> | `200`     | `application/json` | `The ${crystalNameQuery} Crystal has been deleted!` |
> | `404`     | `application/json` | `The ${crystalNameQuery} Crystal is not found!`     |
> | `500`     | `application/json` | `{ message: error.message }`                        |

##### Example

> ```Postman
>  DELETE -> https://localhost:7000/JediMaster/crystal?name=Kadril
>  Query Params: KEY -> name, VALUE -> Kadril
> ```

</details>

#### Listing all existing orders

<details>
 <summary><code>GET</code> <code><b>/JediMaster/orders</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                                |
> | --------- | ------------------ | ------------------------------------------------------- |
> | `200`     | `application/json` | `json`                                                  |
> | `500`     | `application/json` | `{ msg: 'app could not retrieve data from database!' }` |

##### Example

> ```Postman
>  GET -> https://localhost:7000/JediMaster/orders
> ```

</details>

#### Listing an existing crystal

<details>
 <summary><code>GET</code> <code><b>/JediMaster/crystal/:color</b></code></summary>

##### Parameters

> | name  | type     |
> | ----- | -------- |
> | color | required |

##### Responses

> | http code | content-type       | response                                                   |
> | --------- | ------------------ | ---------------------------------------------------------- |
> | `200`     | `application/json` | `json`                                                     |
> | `404`     | `application/json` | `The Crystal with the color ${crystalColor} is not found!` |
> | `500`     | `application/json` | `{ msg: 'app could not retrieve data from database!' }`    |

##### Example

> ```Postman
>  GET -> https://localhost:7000/JediMaster/crystal/:color
>  Path Variables: KEY -> color, VALUE -> green
> ```

</details>

#### Listing all existing lightsabers

<details>
 <summary><code>GET</code> <code><b>/Jedisabershop/saber</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                                |
> | --------- | ------------------ | ------------------------------------------------------- |
> | `200`     | `application/json` | `json`                                                  |
> | `500`     | `application/json` | `{ msg: 'app could not retrieve data from database!' }` |

##### Example

> ```Postman
>  GET -> https://localhost:7000/Jedisabershop/saber
> ```

</details>

#### Listing an existing lightsaber

<details>
 <summary><code>GET</code> <code><b>/JediMaster/saber/:id"</b></code></summary>

##### Parameters

> | name | type     |
> | ---- | -------- |
> | id   | required |

##### Responses

> | http code | content-type       | response                                               |
> | --------- | ------------------ | ------------------------------------------------------ |
> | `200`     | `application/json` | `json`                                                 |
> | `404`     | `application/json` | `The Lightsaber with the ID ${filterID} is not found!` |
> | `500`     | `application/json` | `{ message: error.message }`                           |

##### Example

> ```Postman
>  GET -> https://localhost:7000/Jedisabershop/saber/:id
>  Path Variables: KEY -> id, VALUE -> 4456
> ```

</details>

#### Creating a new lightsaber

<details>
 <summary><code>POST</code> <code><b>/Jedisabershop/saber</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                               |
> | --------- | ------------------ | ------------------------------------------------------ |
> | `205`     | `application/json` | `The ${newLightSaber.name} LightSaber has been added!` |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`                 |
> | `500`     | `application/json` | `{ message: error.message }`                           |

##### Example

> ```Postman
>  POST -> https://localhost:7000/Jedisabershop/saber
>  Body -> {  "id": "4456", "name": "Sith Saber", "available": 27, "crystal": [{ "name": "Kadril saber", "color": "blue" }]
>          }
> ```

</details>

#### Updating an existing lightsaber

<details>
  <summary><code>PATCH</code> <code><b>/Jedisabershop/saber</b></code> <code>(update the name/available/crystal value for a particular lightsaber)</code></summary>

##### Parameters

> | name | type     |
> | ---- | -------- |
> | name | required |

##### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `The ${saberNameQuery} Saber has been updated!` |
> | `400`     | `application/json` | `No content was provided!`                      |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`          |
> | `500`     | `application/json` | `{ message: error.message }`                    |

##### Example

> ```Postman
>  PATCH -> https://localhost:7000/Jedisabershop/saber?name=Chris Fayad
>  Query Params: KEY -> name, VALUE -> Chris Fayad
>  Body -> { "name": "Christina" }
> ```

</details>

#### Deleting an existing lightsaber

<details>
  <summary><code>DELETE</code> <code><b>/Jedisabershop/saber</b></code> <code>(deletes a particular lightsaber)</code></summary>

##### Parameters

> | name | type     |
> | ---- | -------- |
> | name | required |

##### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `The ${saberNameQuery} Saber has been deleted!` |
> | `404`     | `application/json` | `The ${saberNameQuery} Saber is not found!`     |
> | `500`     | `application/json` | `{ message: error.message }`                    |

##### Example

> ```Postman
>  DELETE -> https://localhost:7000/Jedisabershop/saber?name=Christina
>  Query Params: KEY -> name, VALUE -> Christina
> ```

</details>

#### Creating a new lightsabers

<details>
 <summary><code>POST</code> <code><b>/Jedisabershop/sabers</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                               |
> | --------- | ------------------ | -------------------------------------- |
> | `201`     | `application/json` | `The LightSabers has been added!`      |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }` |
> | `500`     | `application/json` | `{ message: error.message }`           |

##### Example

> ```Postman
>  POST -> https://localhost:7000/Jedisabershop/sabers
>  Body -> xml file
> ```

</details>

#### Creating a new order

<details>
 <summary><code>POST</code> <code><b>/Jedisabershop/order/saber/:name</b></code></summary>

##### Parameters

> | name | type     |
> | ---- | -------- |
> | name | required |

##### Responses

> | http code | content-type       | response                                               |
> | --------- | ------------------ | ------------------------------------------------------ |
> | `205`     | `application/json` | `The ${newLightSaber.name} LightSaber has been added!` |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`                 |
> | `500`     | `application/json` | `{ message: error.message }`                           |

##### Example

> ```Postman
>  POST -> https://localhost:7000/Jedisabershop/order/saber/:name
>  Path Variables: KEY -> name, VALUE -> Sith Saber
>  Body -> { "Padawan_Name": "Rey", "Padawan_Age": 10 }
> ```

</details>
