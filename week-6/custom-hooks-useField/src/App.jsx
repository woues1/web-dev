// AppWithCustomHook.jsx
import useField from './hooks/useField';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

const AppWithCustomHook = () => {
  const nameInput = useField('text');
  const bornInput = useField('date');
  const heightInput = useField('number');
  const [name, setName] = useLocalStorage('name', '');
  const handleSubmit = (event) => {

    event.preventDefault();

    const submittedData = {
      name: nameInput.value,
      birthdate: bornInput.value,
      height: heightInput.value,
    };
    localStorage.setItem('submit', JSON.stringify(submittedData));
    console.log('Submitted Data:', submittedData);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            Name: <input {...nameInput} />
          </div>
          <br />
          <div>
            Birthdate: <input {...bornInput} />
          </div>
          <br />
          <div>
            Height: <input {...heightInput} />
          </div>
          <div>
            Localstorage: <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <p>Your name is stored in localStorage: {name}</p>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div>
          {nameInput.value} {bornInput.value} {heightInput.value}
        </div>
      </div>
    </>


  );
};

export default AppWithCustomHook;