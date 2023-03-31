# ToDo List App

This is a ToDo List App that allows users to create, update, and delete tasks. Users can also mark their tasks as completed.

## Installation

To run this app on your local machine, follow the steps below:

1. Clone this repository to your local machine.

```bash
git clone https://github.com:tsybko22/todo-list.git
```

2. Install the dependencies.

```bash
cd todo-list
npm install
```

3. Start the json-server on http://localhost:3000/todos

```bash
json-server --watch db.json --port 3000 --delay 500
```

4. Start the app.

```bash
npm dev
```

5. Open your browser and go to http://localhost:5173 to view the app.

## Usage

The app allows users to:

- Create new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks by their completion status

To create a new task, enter the task name in the input field and click on the "Add" button (or press enter).

To update an existing task, click on the item's name to open the edit form. Make the desired changes and press enter to update the item.

To delete a task, hover over the item and click the "Delete" button.

To mark a task as completed, click on the checkbox next to the task's name.

To filter tasks by their completion status, click on one of the three buttons at the top of the page ("All", "Active" or "Completed").

## Technologies used

This app was built using the following technologies:

- React
- React Redux
- [React Router](https://github.com/remix-run/react-router)
- [React Thunk](https://github.com/reduxjs/redux-thunk)
- [React Icons](https://github.com/react-icons/react-icons)
- [Axios](https://github.com/axios/axios)
- [json-server](https://github.com/typicode/json-server)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
