console.log("hello, just testing");

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