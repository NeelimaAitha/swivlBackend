CREATE TABLE 
user(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL, 
    password TEXT NOT NULL, 
    gender VARCHAR(250), 
    location TEXT
 );

INSERT INTO user values (1,'Ganesh$07','Ganesh Kumar','ganesh$07','male','Nalgonda');

SELECT * FROM user;

CREATE TABLE recipe(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    image_url TEXT
);


INSERT INTO recipe(
    name,
    description,
    ingredients,
    instructions,
    image_url
)
VALUES(
'Chicken Biryani',
'Biryani is a fragrant and flavorful rice dish originating
from the Indian subcontinent. It typically combines long-grain
rice with marinated meat or vegetables, layered with spices,
herbs, and aromatics. Cooked slowly in a sealed pot, biryani is 
known for its rich, complex flavors and ability to bring people together 
in communal dining.',
'Basmati rice, Chicken, Yogurt, Onions, Tomatoes, Garlic, Ginger, Green chilies,
Fresh cilantro (coriander) leaves, Fresh mint leaves, Garam masala, Turmeric powder,
Red chili powder, Cumin seeds, Coriander powder, Cardamom pods, Cinnamon sticks,
Cloves, Bay leaves, Saffron strands, Milk, Ghee or cooking oil, Salt, Lemon juice.',
'To prepare biryani, start by rinsing and soaking Basmati rice in water for about 30 minutes.
While the rice is soaking, marinate chicken pieces with yogurt, ginger-garlic paste, green chilies, turmeric powder, red chili powder, coriander powder, garam masala, salt, and lemon juice.
Allow the chicken to marinate for at least 30 minutes.
Next, heat ghee or cooking oil in a large, heavy-bottomed pot.
Add whole spices like cinnamon sticks, cardamom pods, cloves, and bay leaves, and sauté until fragrant.
Then, add sliced onions and cook until golden brown.
Add chopped tomatoes and cook until softened.
Now, add the marinated chicken pieces to the pot and cook until they are partially cooked and the spices are well incorporated.
In a separate pot, bring water to a boil and cook the soaked rice until it is about 70-80% done.
Drain the rice and set aside. Layer the partially cooked rice over the chicken in the pot.
Sprinkle chopped mint and cilantro leaves over the rice.
Dissolve saffron strands in warm milk and drizzle it over the rice.
Cover the pot with a tight-fitting lid and cook on low heat for about 20-25 minutes, or until the chicken is cooked through and the rice is fully cooked and fluffy.
Once done, gently fluff the biryani with a fork, taking care not to break the rice grains.
Garnish the biryani with fried onions, chopped nuts, and additional fresh herbs if desired.
Serve hot and enjoy the flavorful and aromatic biryani with raita or a fresh salad on the side.',
'https://img.freepik.com/free-photo/close-up-appetizing-ramadan-meal_23-2151182540.jpg?t=st=1709800411~exp=1709804011~hmac=a69175395fc8b0d4f4b2033c3682dbd077a4d1424f3f31fa3fea95b8413bc89f&w=900'
);
