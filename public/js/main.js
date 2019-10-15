function createToDo() {
    if (window.location.pathname === '/api/notes') $('#ModalTodoForm').modal('show');
    else window.location = '/api/notes';
}

function deleteToDo(event) {
    event.preventDefault();
    // const result = confirm('Delete this card?');
    if (confirm('Delete this card?') === true) {
        // console.log('event.target.id ', event.target.id);

        fetch(`/api/notes/${event.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .finally(() => {
            window.location.href = '/';
        });
    }
}

function submitAddTODO(event) {
    let toDoName = document.getElementById('toDoName').value;
    let toDoText = document.getElementById('form8').value;
    let toDo = {};
    toDo['toDoName'] = toDoName;
    toDo['toDoText'] = toDoText;

    event.preventDefault();
    // console.log("toDo", toDo);

    fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(toDo),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(() => {
        window.location.href = '/';
    });
}

function openCard(event) {
    const dataset_id = event.currentTarget.dataset.id;
    // console.log('dataset_id = ', dataset_id);
    // console.log('openCard, ', event.currentTarget.querySelector('.card-subtitle.mb-2.text-muted').innerHTML);

    fetch(`/notes/${dataset_id}`, {
        method: 'get',
        //body: JSON.stringify(toDo),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json()).then(commits => {
        let id = commits.note._id;
        const editDelete = `
        <div class="modal fade show" id="ModalTodoFormEdit" style="display: block;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <form role="form" onsubmit="submitAddTODO(event)">
                            <div class="form-group"><label class="control-label">Name</label>
                                <div><input class="form-control input-lg" id="EdittoDoName" type="text" name="name" value="${commits.note.Name}"></div>
                            </div>
                            <div class="form-group">
                                <label data-error="wrong" data-success="right" for="Editform8">Your notes</label>
                                <textarea class="md-textarea form-control grey-text" id="Editform8" name="text" data-id ="${id}" rows="4">${commits.note.Text}</textarea>
                            </div>
                            <div class="form-group">
                                <div>
                                    <a class="card-link" data-id = "${id}" href='#'  onclick="EditCard(event)">Edit</a>
                                    <a class="card-link" id="${id}" href='#' onclick="deleteToDo(event)">Delete </a>
                                    <a class="card-link" href='#' onclick="closeEditCard(event)">Close </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;
        // console.log(commits);
        // console.log(id);
        document.body.innerHTML += editDelete;
    });
}

function closeEditCard(event) {
    event.preventDefault();
    document.getElementById("ModalTodoFormEdit").remove();
}

function EditCard(event) {
    if (confirm('Save edited card?') === true) {
        let toDoName = document.getElementById('EdittoDoName').value;
        let toDoText = document.getElementById('Editform8').value;
        let toDo = {};
        toDo['toDoName'] = toDoName;
        toDo['toDoText'] = toDoText;
        // console.log(event.target.dataset.id);
        fetch(`/api/notes/${event.target.dataset.id}`, {
            method: 'PUT',
            body: JSON.stringify(toDo),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                window.location.href = '/';
            });
    }
}

function createList() {
    if (window.location.pathname === '/api/lists') $('#ModalListForm').modal('show');
    else window.location = '/api/lists';
}

function createTask(event){
    const divTasks= document.querySelector('#tasksList');
    const taskInput = document.getElementById('newTask');
    const newTask=taskInput.value;
    taskInput.value='';
    divTasks.innerHTML+=
        `<div class="form-check">
                <input class="form-check-input" onchange="changeCheck(event, 'tasksList')" type="checkbox" id=${newTask} value=${newTask}>
                <label class="form-check-label" for=${newTask}>${newTask}</label>
                </div>`;
}

function changeCheck(event, parentDiv){
    let taskList=document.getElementById(parentDiv);
    let check=event.target;
    let div=check.parentElement;

    if(event.target.checked){taskList.append(div)}
    else{taskList.prepend(div)}
}

function deleteList(event) {
    event.preventDefault();
    // const result = confirm('Delete this card?');
    if (confirm('Delete this list?') === true) {

        fetch(`/api/lists/${event.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .finally(() => {
                window.location.href = '/';
            });
    }
}

function submitAddList(event) {
    let listName = document.getElementById('listName').value;
    let listTasks=document.getElementsByClassName('form-check-input');

    let list = {};
    list['listName'] = listName;
    list['listTasks']=[];
    for (let i=0; i<listTasks.length;i++) {
        let task=listTasks[i].value;
        let checked=listTasks[i].checked;
        list['listTasks'].push({"task":task, "checked":checked})
    }

    event.preventDefault();

    fetch('/api/lists', {
        method: 'POST',
        body: JSON.stringify(list),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(() => {
            window.location.href = '/';
        });
}

function openList(event) {
    const dataset_id = event.currentTarget.dataset.id;

    fetch(`/lists/${dataset_id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json()).then(commits => {
        let id = commits.note._id;
        let tasks=commits.note.Tasks;
        const editDelete = `
        <div class="modal fade show" id="ModalListFormEdit" style="display: block;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <form role="form" onsubmit="submitAddList(event)">
                            <div class="form-group"><label class="control-label">Name</label>
                                <div><input class="form-control input-lg" id="EditListName" type="text" name="name" value="${commits.note.Name}"></div>
                            </div>
                            <div class="form-group" id="tasks"></div>
                            <div class="form-group">
                                <div>
                                    <a class="card-link" data-id = "${id}" href='#'  onclick="EditList(event)">Edit</a>
                                    <a class="card-link" id="${id}" href='#' onclick="deleteList(event)">Delete </a>
                                    <a class="card-link" href='#' onclick="closeEditList(event)">Close </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.innerHTML += editDelete;
        const divTasks= document.querySelector('#tasks');

        for (let i=0; i<tasks.length; i++) {
            let object=tasks[i];
            if (!object.checked) {
                divTasks.innerHTML +=
                    `<div class="form-check">
                <input class="form-check-input" onchange="changeCheck(event, 'tasks')" type="checkbox" id=${object.task} value=${object.task}>
                <label class="form-check-label" for=${object.task}>${object.task}</label>
                </div>`;
            }else {
                divTasks.innerHTML +=
                    `<div class="form-check">
                <input class="form-check-input" onchange="changeCheck(event, 'tasks')" checked=${object.checked} type="checkbox" id=${object.task} value=${object.task}>
                <label class="form-check-label" for=${object.task}>${object.task}</label>
                </div>`;
            }
        }
    })
}

function closeEditList(event) {
    event.preventDefault();
    document.getElementById("ModalListFormEdit").remove();
}

function EditList(event) {
    if (confirm('Save edited list?') === true) {
        let listName = document.getElementById('EditListName').value;
        let listTasks=document.getElementsByClassName('form-check-input');

        let list = {};
        list['listName'] = listName;
        list['listTasks']=[];
        for (let i=0; i<listTasks.length;i++) {
            let task=listTasks[i].value;
            let checked=listTasks[i].checked;
            list['listTasks'].push({"task":task, "checked":checked})
        }

        fetch(`/api/lists/${event.target.dataset.id}`, {
            method: 'PUT',
            body: JSON.stringify(list),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                window.location.href = '/';
            });
    }
}
