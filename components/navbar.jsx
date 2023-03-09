import { useUserContext } from "@/context/AppContext";

function NavBar() {
    const { setTheme } = useUserContext();
    return (
        <nav className="header">
            <a className="title">Your Dev Logesh Blogs</a>
          
            <div>
                <span className="material-symbols-outlined theme-icon"
                    onClick={(e) => {
                        localStorage.setItem("theme", "light");
                        setTheme("light");
                    }}
                >light_mode</span>
                <span className="material-symbols-outlined theme-icon"
                    onClick={(e) => {
                        localStorage.setItem("theme", "dark");
                        setTheme("dark");
                    }}
                >dark_mode</span>
            </div>
        </nav>
    );
}

export default NavBar;