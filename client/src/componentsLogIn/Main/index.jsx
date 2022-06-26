import styles from "./styles.module.css";
import Products from "../../dasboard/products";
import Category from "../../dasboard/category";
import { useState } from "react";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		console.log(localStorage);
		window.location.reload();
	};

	const [all, setAll] = useState(true);
	const [category, setCategory] = useState(false);

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Nerdly</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.middle}>
				<aside>
					aside
				</aside>
				<main>
					<nav>
						<button 
						className={all ? styles.selected:styles.notselected}
						onClick={()=>{
							setAll(true);
							setCategory(false);
						}}
						>All</button>
						<button 
						className={category ? styles.selected:styles.notselected}
						onClick={() => {
							setAll(false);
							setCategory(true);
						}}
						>Categories</button>
					</nav>
					{all?
					<Products />:
					<Category />}
				</main>
			</div>
		</div>
	);
};

export default Main;
