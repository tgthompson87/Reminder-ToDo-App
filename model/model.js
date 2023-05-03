import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StateContext = createContext();

//create action consts
export const ACTIONS = {
  ADD: "add",
  DEL: "del",
  TOGGLE: "toggle",
  GRP_TITLE: "edit group title",
  GRP_DESC: "edit group desc",
};

//async save state to device
const saveValueFunction = (value) => {
  //function to save the value in AsyncStorage
  if (value) {
    //To check the input not empty
    const update = JSON.stringify(value);
    //Setting data to AsyncStorage with key "async_state"
    AsyncStorage.setItem("async_state", update);
  }
};

//reducer logic patterns
export const reducer = (state, action) => {
  switch (action.type) {
    //dispatch({type: "add", payload: {data: xxxxx, title: xxxxxx}})
    case ACTIONS.ADD:
      state.map((group, index) => {
        if (group.title === action.payload.title) {
          return (state[index] = {
            ...group,
            items: [...group.items, action.payload.data],
          });
        }
        return group;
      });
      saveValueFunction(state);
    case ACTIONS.DEL:
      //dispatch({type: "delete", payload: {title: xxxxx, itemKey: xxxxxx}})
      state.map((group, index) => {
        if (group.title === action.payload.title) {
          return (state[index] = {
            ...group,
            items: group.items.filter(
              (item) => item.key !== action.payload.itemKey
            ),
          });
        }
        return group;
      });
      saveValueFunction(state);
    case ACTIONS.TOGGLE:
      //dispatch({type: "toggle", payload: {title: xxxxxx, itemKey: xxxxxx}})
      state.map((group, index) => {
        if (group.title === action.payload.title) {
          return (state[index] = {
            ...group,
            items: group.items.map((item) => {
              if (item.key === action.payload.itemKey) {
                return { ...item, complete: !item.complete };
              }
              return item;
            }),
          });
        }
        return group;
      });
      saveValueFunction(state);
    case ACTIONS.GRP_TITLE:
      //dispatch({type: "edit group", payload: {oldTitle: xxxxx, newTitle: xxxx, newDescription: xxxxx}})
      state.map((group, index) => {
        if (group.title === action.payload.oldTitle) {
          return (state[index] = {
            ...group,
            title: action.payload.newTitle,
          });
        }
        return group;
      });
      saveValueFunction(state);
    case ACTIONS.GRP_DESC:
      //dispatch({type: "edit group", payload: {oldTitle: xxxxx, newTitle: xxxx, newDescription: xxxxx}})
      state.map((group, index) => {
        if (group.title === action.payload.oldTitle) {
          return (state[index] = {
            ...group,
            description: action.payload.newDescription,
          });
        }
        return group;
      });
      saveValueFunction(state);
    default:
      return state;
  }
};

export const initialState = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28re",
    key: "bd7acbea-c1b1-46c2-aed5-3ad53abb78re",
    title: "Group 1 Title",
    description: "Example group containing TODO's",
    items: [
      {
        key: 437090948586663,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "1st todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
      {
        key: 976348976136289,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "2nd todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
      {
        key: 382472385743850,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "3rd todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
      {
        key: 873487474349545,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "4th todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
    ],
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    key: "bd7acbea-c1b1-46c2-aed5-3ad53abb9ba",
    title: "Group 2 Title",
    description: "Example group containing TODO's",
    items: [
      {
        key: 43709044485845,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "1st todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
      {
        key: 97634865561362,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "2nd todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
      // { key: 38247574385706, date: {full: new Date(), year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()}, complete: false, item: "3rd todo", description: "ultrices erat. Duis porttitor molestie nulla, id semper" },
      // { key: 87348747436911, date: {full: new Date(), year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()}, complete: false, item: "4th todo", description: "ultrices erat. Duis porttitor molestie nulla, id semper" },
      // { key: 87345647436911, date: {full: new Date(), year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()}, complete: false, item: "5th todo", description: "ultrices erat. Duis porttitor molestie nulla, id semper" },
    ],
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b",
    key: "bd7acbea-c1b1-46c2-aed5-3a3abb28b",
    title: "Group 3 Title",
    description: "Example group containing TODO's",
    items: [
      {
        key: 6770909477858,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "1st todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
      {
        key: 9763489765462,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "2nd todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
      {
        key: 3824723857430,
        date: {
          full: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
        complete: false,
        item: "3rd todo",
        description: "ultrices erat. Duis porttitor molestie nulla, id semper",
      },
    ],
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    key: "3ac68afc-c605-48d3-a4f8-fbd91aa97f61",
    title: "New Group 1",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    key: "58694a0f-3da1-471f-bd96-145571e29d76",
    title: "New Group 2",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d34",
    key: "58694a0f-3da1-471f-bd96-145571e29d34",
    title: "New Group 3",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e35d72",
    key: "58694a0f-3da1-471f-bd96-145571e35d72",
    title: "New Group 4",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "58694a0f-3da1-471f-bd96-145534e35d72",
    key: "58694a0f-3da1-471f-bd96-145534e35d72",
    title: "New Group 5",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "58694a0f-45a1-471f-bd96-145534e35d72",
    key: "58694a0f-45a1-471f-bd96-145534e35d72",
    title: "New Group 6",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "58694a0f-3da1-471f-bd96-145s34e35d72",
    key: "58694a0f-3da1-471f-bd96-145s34e35d72",
    title: "New Group 7",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "5y794a0f-3da1-471f-bdk6-145s34e90d72",
    key: "5y794a0f-3da1-471f-bdk6-145s34e90d72",
    title: "New Group 8",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "5y794a0f-3da1-471f-bdk6-145s34e93k72",
    key: "5y794a0f-3da1-471f-bdk6-145s34e93k72",
    title: "New Group 9",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
  {
    id: "5y794a0f-3da1-471f-bdk6-145s4e93k72",
    key: "5y794a0f-3da1-471f-bdk6-145s4e93k72",
    title: "New Group 10",
    description:
      'To change Group Title & Description \'tap\' "Create New"; \'select\' "Select Group" and "Edit Group Title"/"Edit Group Description" options.',
    items: [],
  },
];
