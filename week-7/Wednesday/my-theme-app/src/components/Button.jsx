import useThemeContext from "../hooks/useThemeContext";

export default function Button({ children }) {
    const { theme, toggleTheme } = useThemeContext(); // Access theme and toggle function
    const className = 'button-' + theme; // Dynamic class based on theme

    return (
        <button className={className} onClick={toggleTheme}>
            {children}
        </button>
    );
}