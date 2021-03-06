import React, { useEffect, useState } from 'react';
import Auth from './Auth.jsx';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import RecipeDetailsGrid from './RecipeDetailsGrid.jsx';
import HomePageGrid from './HomePageGrid.jsx';
import RecipeSearchGrid from './RecipeSearchGrid.jsx';
import axios from 'axios';
import getUserCalendar from './helpers/getUserCalendar.js';
import AddToCalendar from './AddToCalendar.jsx';
const auth = firebase.auth();

const App = (props) => {
  const [user] = useAuthState(auth);
  const [schedule, setSchedule] = useState([]);
  const [searchPage, setSearch] = useState(false);
  const [detailPage, setDetail] = useState(false);
  const [currentRecipe, setRecipe] = useState({});

  const goToDetailsPage = (recipe) => {
    setDetail(true);
    setSearch(false);
    setRecipe(recipe);
    return (
      <div>
        <RecipeDetailsGrid recipe={currentRecipe} />
      </div>
    );
  };

  const [display, setDisplay] = useState('home');
  const [userInfo, setUserInfo] = useState({});
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  const [topTen, setTopTen] = useState([]);

  const getPreviousSunday = () => {
    const date = new Date();
    const day = date.getDay();
    let prevSunday = new Date();
    if (date.getDay() === 0) {
      prevSunday.setDate(date.getDate() - 8);
    }
    else {
      prevSunday.setDate(date.getDate() - day);
    }
    return prevSunday.toLocaleString();
  };

  const updateCalendar = (id) => {
    var sunday = new Date(new Date(getPreviousSunday()).setHours(0, 0, 0, 0)).toLocaleString()

    var currentDate = new Date()
    ///var today = currentDate.setHours(0, 0, 0, 0)
    var saturday = new Date((new Date(sunday).setDate(new Date(sunday).getDate() + 7))).toLocaleString()
    console.log('saturday: ', saturday)


    if (id !== undefined) {
      getUserCalendar(id).then((data) => {
        const mappedToDay = {
          Sunday: [],
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        };
        data.forEach((meal) => {
          const date = new Date(meal.date).getDay();
          const day = days[date];
          if (day[date] !== undefined) {
            if (new Date(meal.date) > new Date(sunday)
                 && new Date(meal.date) < new Date(saturday)) {
              console.log('its the correct week')
              mappedToDay[day].push(meal);
            }
          }
        });
        setSchedule(mappedToDay);
      });
    }
  };

  const getBoard = (id, val) => {
    val = val || 'time';
    axios
      .get(`/api/recipes/${id}?filter=${val}`)
      .then((response) => {
        console.log('got leaderboard data: ', response.data);
        setTopTen(response.data);
      })
      .catch((err) => {
        console.log('err in axios get recipe leaderboards');
      });
  };

  useEffect(() => {
    const newUser = {
      name: user && user.displayName,
      email: user && user.email,
      friends: [],
      date: new Date(),
    };
    !user && setSchedule([])

    user &&
      axios
        // .get(`/api/users/girlfiery@chefslist.com/userInfo`)
        .get(`/api/users/${user.email}/userInfo`)
        .then((res) => {
          if (!res.data.length) {
            axios.post('/api/users', newUser).then((response) => {
              console.log('NEW USER ADDED TO DATABASE');
              setUserInfo(response.data[0]);
              return response.data[0];
            });
          } else {
            setUserInfo(res.data[0]);
            return res.data[0];
          }
        })
        .then((userInfo) => {
          getBoard(userInfo._id)
          updateCalendar(userInfo._id);
        });
  }, [user]);

  const changeDisplay = () => {
    display === 'home' ? setDisplay('list') : setDisplay('home');
  };
  if (!searchPage && !detailPage) {
    return (
      <div>
        {display === 'home' ? (
          <div>
            <HomePageGrid
              getBoard={getBoard}
              schedule={schedule}
              searchPage={searchPage}
              setSearch={setSearch}
              topTen={topTen}
              userId={userInfo._id}
              updateCalendar={updateCalendar}
              changeDisplay={changeDisplay}
            />
          </div>
        ) : null}
        {display === 'list' ? (
          <div>
            <AddToCalendar schedule={schedule} changeDisplay={changeDisplay}/>
          </div>
        ) : null}
      </div>
    );
  } else if (searchPage) {
    return (
      <div>
        <RecipeSearchGrid
          searchPage={searchPage}
          detailPage={detailPage}
          setSearch={setSearch}
          goToDetailsPage={goToDetailsPage}
          user={user}
          userId={userInfo._id}
          updateCalendar={updateCalendar}
        />
      </div>
    );
  } else if (detailPage) {
    return (
      <div>
        <RecipeDetailsGrid
          searchPage={searchPage}
          detailPage={detailPage}
          userId={userInfo._id}
          updateCalendar={updateCalendar}
          setDetail={setDetail}
          setSearch={setSearch}
          recipe={currentRecipe}
          user={user}
        />
      </div>
    );
  }
};

export default App;

// Axios requests:

// axios.get(`/api/users/GirlFiery@chefslist.com`)

//   .then((response) => {
//     console.log('this is response.data: ', response.data)
//     // var userId = response.data._id
//   })
//   .catch((err) => {
//     console.log('error in axios.get: ', err)
//   })

// GET CALENDAR ENTRIES FOR SPECIFIC USER
// axios.get('/api/recipes/calendar/60a828914c20a51c8065bb49')
// .then((response) => {
//   console.log('got calendar entries!: ', response.data)
// })
// .catch((err) => {
//   console.log('err getting calendar entries!: ', err)
// })

// POST USER'S RECIPE OF CHOICE TO DATABASE
// var fakeEntry = {
//   userId: "60ae667772fdbd15f82280d6",
//   recipeId: "60a8289ee9432a1c8262eead",
//   date: new Date(),
//   cookTime: 45,
//   ingredientList: [
//     "2 pounds skin-on, boneless chicken thighs",
//     "1 cup thinly sliced red onion",
//     "2 tablespoons minced garlic",
//     "2 tablespoons minced peeled ginger",
//     "1/4 cup soy sauce",
//     "1/4 cup fresh tangerine or orange juice",
//     "Freshly ground pepper",
//     "Vegetable oil, for the grill"
//   ],
//   recipeName: "Dirty P's Garlic-Ginger Chicken Thighs"
// }

// axios.post('/api/recipes/calendar', fakeEntry)
//   .then((response) => {
//     console.log('posted calendar entry!')
//   })
//   .catch((err) => {
//     console.log('err in axios post calendar entry:', err)
//   })
