import { useState, FormEvent } from "react";
import "./App.css";

interface TaskData {
  id: number;
  task: string;
  date: string;
  completed: boolean;
}

function App() {
  const [formData, setFormData] = useState<TaskData>({
    id: 0,
    task: "",
    date: getTodayDate(),
    completed: false,
  });
  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [tab, setTab] = useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (formData.task.length > 0) {
      setTaskList(
        [...taskList, formData].sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
      );
      setFormData({
        id: taskList.length + 1,
        task: "",
        date: getTodayDate(),
        completed: false,
      });
    }
  };

  const handleUpdate = (item: TaskData): void => {
    const updatedTasks = taskList.map((task) =>
      task.id === item.id ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);
  };

  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <main>
        <section>
          <h2>New Task</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Task:
              <input
                type="text"
                name="task"
                value={formData.task}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </label>
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </section>
        <section>
          <nav>
            <button onClick={() => setTab(false)}>Incomplete</button>
            <button onClick={() => setTab(true)}>Complete</button>
          </nav>
          <table>
            <thead>
              <tr>
                <th>Complete</th>
                <th>Task</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {taskList
                .filter((item) => item.completed === tab)
                .map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        name="complete"
                        checked={item.completed}
                        onChange={() => handleUpdate(item)}
                      />
                    </td>
                    <td>{item.task}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default App;
