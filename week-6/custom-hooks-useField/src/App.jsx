// AppWithCustomHook.jsx
import useField from './hooks/useField';
import './App.css';  // Add CSS if needed

const AppWithCustomHook = () => {
  const nameInput = useField('text');
  const bornInput = useField('date');
  const heightInput = useField('number');

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
        <button type="submit">Submit</button>
      </form>
      <div>
        {nameInput.value} {bornInput.value} {heightInput.value}
      </div>
    </div>
  );
};

export default AppWithCustomHook;