import { ThemeProvider } from './context/ThemeContext';
import Form from './components/Form';
import Button from './components/Button';

export default function App() {
  return (
    <ThemeProvider> {/* Provides theme context to all child components */}
      <Form />
      <Button>Toggle Theme</Button> {/* This button can toggle the theme */}
    </ThemeProvider>
  );
}
