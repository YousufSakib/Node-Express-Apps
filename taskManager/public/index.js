const unorder_list_Dom = document.querySelector("ul.taskList");
const form_new_task = document.querySelector("form.newTaskForm");

const get_tasks = async () => {
    const url = "http://127.0.0.0:3000/api/v1/tasks";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const tasks = await response.json();
        let list_inner_html = "";
        tasks.forEach((element) => {
            list_inner_html += `                <li class="listItem ${
                element.is_completed
            }" _id=${element._id} task_name=${element.task_name.replaceAll(
                " ",
                "_",
            )}>
                    <span class="left">${element.task_name}</span>
                    <div class="right">
                        <img class="edit" src="icons/edit.png" alt="" />
                        <img class="delete" src="icons/delete.png" alt="" />
                    </div>
                </li>`;
        });
        if (tasks.length > 0) {
            unorder_list_Dom.innerHTML = list_inner_html;
            const delete_icon = document.querySelectorAll(
                "ul.taskList li.listItem div.right img.delete",
            );
            const edit_icon = document.querySelectorAll(
                "ul.taskList li.listItem div.right img.edit",
            );
            console.log(edit_icon);
            delete_icon.forEach((delete_icon) => {
                delete_icon.addEventListener("click", deletHandler);
            });
            edit_icon.forEach((edit_icon) => {
                edit_icon.addEventListener("click", editHandler);
            });
        } else {
            unorder_list_Dom.innerHTML = "<p>No pending task available.</p>";
        }
    } catch (err) {
        console.error(err.message);
        unorder_list_Dom.innerHTML = "<p>Error Occured.</p>";
    }
};
get_tasks();

form_new_task.addEventListener("submit", async function (e) {
    e.preventDefault();
    let taskName = document.getElementById("newTaskInput").value;
    taskName = taskName.trim();
    if (!taskName) {
        alert("Task name is required");
        return;
    }
    try {
        const url = `http://127.0.0.0:3000/api/v1/tasks`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task_name: taskName,
                is_completed: false,
            }),
        });
        const resData = await response.json();
        console.log(resData);
        location.reload();
    } catch (err) {
        console.log(err);
    }
});
const deletHandler = async (e) => {
    const taskId = e.target.parentElement.parentElement.getAttribute("_id");
    const url = `http://127.0.0.0:3000/api/v1/tasks/${taskId}`;

    try {
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const tasks = await response.json();
        console.log(tasks);
        location.reload();
    } catch (err) {}
};
const editHandler = (e) => {
    const taskId = e.target.parentElement.parentElement.getAttribute("_id");
    const taskName =
        e.target.parentElement.parentElement.getAttribute("task_name");
    document.querySelector("input#taskNameEdit").value = taskName.replaceAll(
        "_",
        " ",
    );
    document.querySelector(
        ".editTask .card .editTaskForm .right span",
    ).innerText = taskId;
    document.querySelector(".editTask").style.display = "initial";
};

const editTaskForm = document.querySelector(".editTaskForm");

editTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const isCompleted = document.querySelector("#isCompleted").checked;
    const taskName = document.querySelector("#taskNameEdit").value.trim();
    console.log(taskName);
    const taskId = document.querySelector(
        ".editTask .card .editTaskForm .right span",
    ).innerText;
    const url = `http://127.0.0.0:3000/api/v1/tasks/${taskId}`;
    if (!taskName) {
        alert("Task name should be not empty text");
        return;
    }
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task_name: taskName,
                is_completed: isCompleted,
            }),
        });
        const res_data = await response.json();
        // console.log(res_data);
        location.reload();
    } catch (err) {}
});
