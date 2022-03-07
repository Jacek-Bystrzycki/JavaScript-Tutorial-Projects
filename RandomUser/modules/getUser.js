async function getUser(url) {
  const response = await fetch(url);
  const object = await response.json();
  const userData = object.results[0];
  // console.log(object.results[0]);
  const { email, phone } = userData;
  const { first, last } = userData.name;
  const { age } = userData.dob;
  const { name, number } = userData.location.street;
  const { password } = userData.login;
  const { large } = userData.picture;
  return {
    name: `${first} ${last}`,
    email,
    phone,
    age,
    street: `${name} ${number}`,
    password,
    photo: large,
  };
}

export default getUser;
