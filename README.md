# Recipes Backend

#### Sample Valid User Credentials

```
{
    "username":"ganesh007",
    "password":"Ganesh$07"
}
```

### API 1: Register User

#### path: `/users/`

#### Method: `POST`

**Request**

-  user id is auto incremented
```
{
    "username":"ganesh007",
    "name":"Ganesh Kumar",
    "password":"Ganesh$07",
    "gender":"male",
    "location":"Nalgonda"
}
```

- **Scenario 1**

  - **Description**:

    If user already registered

  - **Response**
    ```
    User Already Exists
    ```

- **Scenario 2**

  - **Description**:

    If user doesn't exist

  - **Response**

    ```
    User Registered Successfully
    ```

### API 2: Login User

#### Path: `/login/`

#### Method: `POST`

**Request**

```
{
    "username":"ganesh007",
    "password":"Ganesh$07"
}
```

- **Scenario 1**

  - **Description**:

    If an unregistered user tries to login

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid user
      ```

- **Scenario 2**

  - **Description**:

    If the user provides an incorrect password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid password
      ```

- **Scenario 3**

  - **Description**:

    Successful login of the user

  - **Response**

    Return the JWT Token

    ```
    {
      "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5c......"
    }
    ```

### Authentication with Token

- **Scenario 1**

  - **Description**:

    If the token is not provided by the user or an invalid token

  - **Response**
    - **Status code**
      ```
      401
      ```
    - **Body**
      ```
      Invalid JWT Token
      ```

- **Scenario 2**
  After successful verification of token proceed to next middleware or handler

### API 3: Get User Profile

#### Path: `/profile/`

#### Method: `GET`

#### Description:

Returns the user details

#### Response

```
{
  "id": 3,
  "username": "ganesh007",
  "name": "Ganesh Kumar",
  "gender": "male",
  "location": "Nalgonda"
}
```

### API 4: Get Multiple Recipes

#### Path: `/recipes/`

#### Method: `GET`

#### Description:

Returns a list of recipes

#### Response

```
[
  {
    "id": 15,
    "name": "Chicken Biryani",
    "description": "Biryani is a fragrant and flavorful rice dish............."
    "ingredients": "Basmati rice, Chicken, Yogurt, Onions, Tomatoes, Garlic, Ginger,.........",
    "instructions": "To prepare chicken biryani, start by marinating chicken pieces.......",
    "imageUrl": "https://img.freepik.com/premium-photo/arabic-food-kabsa-with-chicken-almonds-closeup-plate-generative-ai_779468-4840.jpg?w=900"
  },.....
]
```

### API 5: Get Specific Recipe

#### Path: `/recipes/:id`

#### Method: `GET`

#### Description:

Returns a specific recipe based on recipe ID

#### Response

```
{
    "id": 15,
    "name": "Chicken Biryani",
    "description": "Biryani is a fragrant and flavorful rice dish............."
    "ingredients": "Basmati rice, Chicken, Yogurt, Onions, Tomatoes, Garlic, Ginger,.........",
    "instructions": "To prepare chicken biryani, start by marinating chicken pieces.......",
    "imageUrl": "https://img.freepik.com/premium-photo/arabic-food-kabsa-with-chicken-almonds-closeup-plate-generative-ai_779468-4840.jpg?w=900"
  }
```

### API 6: Add Recipe

#### Path: `/recipes/`

#### Method: `POST`

#### Description:

Adds a Recipe to the database

#### Request
- recipe id is auto incremented
```
{
    "name":"Palak Panneer",
    "description":"Palak Paneer is a North Indian dish featuring paneer...",
    "ingredients":"Spinach, Paneer (Indian cottage cheese), Onion, Tomato, Ginger...",
    "instructions":"To prepare Palak Paneer, start by blanching fresh spinach...",
    "imageUrl":"https://img.freepik.com/free-photo/flat-lay-pakistani-food-arrangement_23-2148825110.jpg?t=st=1709816530~exp=1709820130~hmac=35629e7e0212f0c42b371d5e2afd9f0238c33988e0e4894de86fbd5701211aa0&w=826"
}
```

#### Response

```
Recipe added successfully
```

### API 7: Update Recipe

#### Path: `/recipes/:id/`

#### Method: `PUT`

#### Description:

Updates a specific recipe based on recipe ID

#### Request

```
{
    "name":"Fish Ftry",
    "description":"Fish fry is a popular dish made by marinating fish fillets...",
    "ingredients":"Fish fillets, Lemon juice or vinegar, Ginger-garlic paste (optional)...",
    "instructions":"To prepare fish fry, start by marinating fish fillets with lemon juice....",
    "imageUrl":"https://img.freepik.com/free-photo/front-close-view-fried-fishes-lemon-slices-brown-plate-spices-tomatoes-oil-bottle-mix-colors-table-with-free-space_179666-18174.jpg?t=st=1709821481~exp=1709825081~hmac=582171d9296445c82191389913ea71bb2c24a96affcd7a3e1bd805c09576776a&w=900"
}

```

#### Response

```
Recipe updated successfully
```

### API 8: Delete Recipe

#### Path: `/recipes/:id/`

#### Method: `DELETE`

#### Description:

Deletes specific recipe based on the recipe ID

#### Response

```

Recipe deleted successfully

```

<br/>

Use `npm install` to install the packages.

Run `node index.js` to run the project
