import {fakerEN as faker } from "@faker-js/faker";

let posts = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  title: faker.company.catchPhrase(),
  banner: faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
  avatar: faker.image.avatar(),
  date: faker.date.past(1),
  username: faker.internet.username(),
  content: faker.lorem.paragraphs({min:25,max:30}),
}));

const getPosts = (req, res) => {
  try {
    return res.json({ success: true, message: posts });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default getPosts;
