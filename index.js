const wrapper = document.querySelector(".wrapper");

// const server_url = "http://localhost:5000";
const server_url = "https://who-is-hotter.herokuapp.com";

const getStudents = async () => {
  const data = await fetch(`${server_url}/subjects`);
  const students = await data.json();

  return students;
};

const getCategories = async () => {
  const subjects = await getStudents();
  const categories = [];

  subjects.forEach((subject) => {
    if (!categories.includes(subject.category)) {
      categories.push(subject.category);
    }
  });

  return categories;
};

const getDescription = (categ) => {
  //category descriptions
  const [
    black,
    survivor,
    skinny,
    classy,
    brains,
    hustler,
    body,
    ambassador,
    reserved,
  ] = [
    "It doesn't matter if a cat is black so long as it catches mice 😉",
    "The 'I must make it even though it's illegal', who will save you?",
    "There's no weight limit on beauty",
    "Even though looks don't really matter on a guy, we as ladies still notice things like dresscode,character 😎",
    "Having an ancestral line that's bright is a necessity holding body factors constant",
    "In all fields of life love,money, etc",
    "If these were women,they surely would have nice bodies",
    "Every group must have ambassadors that represent the group",
    "The 'simala gogela' 😶",
  ];

  if (categ === "black") {
    return black;
  } else if (categ === "survivor") {
    return survivor;
  } else if (categ === "skinny") {
    return skinny;
  } else if (categ === "classy") {
    return classy;
  } else if (categ === "brains") {
    return brains;
  } else if (categ === "hustler") {
    return hustler;
  } else if (categ === "body") {
    return body;
  } else if (categ === "ambassador") {
    return ambassador;
  } else if (categ === "reserved") {
    return reserved;
  } else {
    return "description not avaialable";
  }
};

const createCategoriesElements = async () => {
  const categories = await getCategories();

  categories.forEach((category) => {
    const container = document.createElement("div");
    container.classList.add(`${category}`, "category-card");
    const [h2, p] = [document.createElement("h2"), document.createElement("p")];
    h2.appendChild(document.createTextNode(`${category}`));
    p.appendChild(document.createTextNode(getDescription(`${category}`)));
    container.appendChild(h2);
    container.appendChild(p);

    document.querySelector(".wrapper").appendChild(container);
  });
};

const displaySubjects = async () => {
  const categories = await getCategories();
  const subjects = await getStudents();

  categories.forEach((category) => {
    let template = "";

    subjects.forEach((subject) => {
      if (subject.category == category) {
        template += `
          <label>
            <p>${subject.name}</p> 
            <input type = "radio" disabled name = "${subject.category}" value = "${subject._id}"/>
          </label>
      `;
      }
    });

    document.querySelector(`.${category}`).innerHTML += template;
  });
};

const handleSubmit = async () => {
  const categories = await getCategories();

  categories.forEach((category) => {
    const radios = document.getElementsByName(`${category}`);

    radios.forEach(async (radio) => {
      if (radio.checked) {
        const response = await fetch(`${server_url}/add-vote/${radio.value}`, {
          method: "POST",
        });
        const message = await response.json();
        console.log(message);
      }

      document.querySelector(".submit-btn").style.backgroundColor = "orangered";
      radio.disabled = true;
    });
  });

  alert("Thanks for voting!😊");
};

window.addEventListener("DOMContentLoaded", () => {
  createCategoriesElements();
  displaySubjects();
});
