import { Navbar } from "./Navbar.tsx";
import { Footer } from "./Footer.tsx";
import { Avatar } from "./Avatar.tsx";
import { Heartrate } from "./Heartrate.tsx";
import { Tidal } from "./Tidal.tsx";

export const App = () => {
	return (
		<div>
			<Navbar />
			<Footer />
			<main class="responsive">
				<article class="middle-align center-align">
					<div class="padding">
						<Avatar />
						<div class="space" />
						<h5>Hallo, Ich bin Seth.</h5>
						<p>
							Developing for both the
							<br />
							frontends and backends of software.
						</p>
					</div>
				</article>
				<br />
				<Heartrate />
				<br />
				<Tidal />
			</main>
		</div>
	);
};
