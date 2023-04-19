import { useLocalStorage } from 'use-hooks';
import { useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function SwitchTheme() {
    const [theme, setTheme] = useLocalStorage('theme', 'dark');
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    //modify data-theme when theme changes
    useEffect(() => {
        const body = document.documentElement;
        body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <button className="btn btn-circle flex items-center justify-center ml-2" onClick={toggleTheme}>
            {theme === 'dark' ? (
                <FiMoon className="w-5 h-5" />
            ) : (
                <FiSun className="w-5 h-5" />
            )}
        </button>
    );
};
