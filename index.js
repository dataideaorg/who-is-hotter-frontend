const wrapper = document.querySelector(".wrapper");

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
  const [black, light, skinny, classy, brains, curvy, other] = [
    "black ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sint!",
    "light ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sint!",
    "skinny ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sint!",
    "classy ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sint!",
    "brains ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sint!",
    "curvy ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sint!",
    "other ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sint!",
  ];

  if (categ === "black") {
    return black;
  } else if (categ === "light") {
    return light;
  } else if (categ === "skinny") {
    return skinny;
  } else if (categ === "classy") {
    return classy;
  } else if (categ === "brains") {
    return brains;
  } else if (categ === "curvy") {
    return curvy;
  } else if (categ === "other") {
    return other;
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
            <input type = "radio" name = "${subject.category}" value = "${subject._id}"/>
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

      radio.disabled = true;
    });
  });

  alert("Thanks for voting!😊");
};
window.addEventListener("DOMContentLoaded", () => {
  createCategoriesElements();
  displaySubjects();
});
