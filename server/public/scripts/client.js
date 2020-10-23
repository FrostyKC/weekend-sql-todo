$(document).ready(handleReady);

function handleReady() {
  console.log('ready');

  $('#addButton').on('click', handleAdd);
  getTaskData();
}

function handleAdd() {
  console.log('Add clicked');
  const task = {
    task: $('#taskInput').val(),
    task_completed: 'No',
  };

  postTask(task);
  clearForm();
}

function getTaskData() {
  $.ajax({
    type: 'GET',
    url: '/todo',
  }).then(function (response) {
    console.log('GET todo list', response);

    // render data to the DOM
    render(response);
  });
}

function postTask(task) {
  $.ajax({
    type: 'POST',
    url: '/todo',
    data: task,
  })
    .then(function (response) {
      getTaskData();
    })
    .catch(function (err) {
      console.log(err);
      alert('something went wrong in POST');
    });
}

function render(todoList) {
  $('#viewTodo').empty();

  for (let task of todoList) {
    $('#viewTodo').append(`
    <tr>
      <td>${task.task}</td>
      <td>${task.task_completed}</td>
      <td><button class="js-btn-update" data-id="${task.id}" data-completed="${task.task_completed}">
      Update</button></td>
      <td><button class="js-btn-delete" data-id="${task.id}">Delete</button></td>
    </tr>
    `);
  }
}

function clearForm() {
  $('#taskInput').val('');
}
