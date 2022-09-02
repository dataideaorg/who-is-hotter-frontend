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
  const [black, light, skinny, classy, brains, curvy, other] = [
    "Black is beauty, black is bold, but who has got most of this character?",
    "The lightest girls of our class, who is giving you the 'thigh power'?",
    "They say skinny women have sekzual agility, pick a petite",
    "Some consider these ladies untouchable, but you have alot of 'game', who are you gonna play?",
    "Women contribute largest to the level of intelligence of children, who will be your brilliant baby mama?",
    "We cannot deplete the reasons why a 'curvy woman' in public, who is the fanta?",
    "These are the other notables, but who was noticed?",
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

const getTotalVotes = async () => {
  const categories = await getCategories();
  const subjects = await getStudents();

  const totals = {};

  categories.forEach((category) => {
    let sum = 0;
    subjects.forEach((subject) => {
      if (subject.category === category) {
        sum += subject.votes;
      }
    });
    totals[`${category}`] = sum;
  });

  console.log(totals);
  return totals;
};

const displaySubjects = async () => {
  const categories = await getCategories();
  const subjects = await getStudents();
  const totals = await getTotalVotes();

  categories.forEach((category) => {
    let template = "";
    const category_total = totals[`${category}`];

    subjects.forEach((subject) => {
      if (subject.category == category) {
        template += `
          <label>
            <p>${subject.name}</p> 
            <div class = "progress-container">
            <p class = "percent-score">${Math.round(
              (subject.votes / category_total) * 100
            )}%</p>
            <div class = "progress-bar-container">
            <progress value = "${
              subject.votes
            }" max = "${category_total}" ></progress>
            </div>
            </div>
          </label>
      `;
      }
    });

    document.querySelector(`.${category}`).innerHTML += template;
  });
};

// const handleSubmit = async () => {
//   const categories = await getCategories();

//   categories.forEach((category) => {
//     const radios = document.getElementsByName(`${category}`);

//     radios.forEach(async (radio) => {
//       if (radio.checked) {
//         const response = await fetch(`${server_url}/add-vote/${radio.value}`, {
//           method: "POST",
//         });
//         const message = await response.json();
//         console.log(message);
//       }

//       document.querySelector(".submit-btn").style.backgroundColor = "orangered";
//       radio.disabled = true;
//     });
//   });

//   alert("Thanks for voting!😊");
// };
window.addEventListener("DOMContentLoaded", () => {
  createCategoriesElements();
  displaySubjects();
});
