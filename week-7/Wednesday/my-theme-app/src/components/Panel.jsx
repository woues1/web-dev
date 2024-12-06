import useThemeContext from '../hooks/useThemeContext';

export default function Panel({ title, children }) {
    const { theme } = useThemeContext(); // Get theme from context
    const className = 'panel-' + theme; // Dynamic class based on theme

    return (
        <section className={className}>
            <h1>{title}</h1>
            {children}
        </section>
    );
}   