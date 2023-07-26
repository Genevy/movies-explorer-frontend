import Preloader from "../Preloader/Preloader";
import './PreloaderPage.css';

function PreloaderPage () {
	return (
		<section className="preloader-page">
			<Preloader isFull={true} />
		</section>
	)
}

export default PreloaderPage;