
let ToDos = []
let nextId = 1;

const addOne = (task, completed, dueDate) => {

    const newTask = {
        id: nextId++,
        task: task,
        completed: completed,
        dueDate: dueDate
    };

    ToDos.push(newTask);
    return newTask;
}

const getAll = () => {
    return ToDos;
}

const findById = (id) =>{
    const numericId = Number(id); 
    const task = ToDos.find(item => item.id === numericId);
    return task || false; 
}

const updateOneById = (id, updatedData) => {
    
    const task = findById(id);
    if (task) {
        if (updatedData.task) task.task = updatedData.task;
        if (updatedData.completed) task.completed = updatedData.completed;
        if (updatedData.dueDate) task.dueDate = updatedData.dueDate;
        return task; 
    }
    return false; 
    
}

const deleteOneById = (id) => {
    const task = findById(id);
    if (task) {
        const initialLength = ToDos.length;
        ToDos = ToDos.filter(task => task.id !== Number(id));
        return ToDos.length < initialLength; 
    }
    return false; 
}

console.log(addOne("walk", "false", "2024"))
console.log(getAll())
console.log(findById("1"))
console.log(updateOneById(1, {task: "groceries"}))
console.log(deleteOneById(1));