import React from "react";
import Wave from "react-wavify";

function Waves() {
	return (
		<Wave
			fill="#FFB684"
			paused={false}
			style={{ display: "flex" }}
			options={{
				height:20,
				amplitude: 20,
				speed: 0.40,
				points: 20,
			}}
		>
			<defs>
				<linearGradient id="gradient" gradientTransform="rotate(90)">
					<stop offset="0" stopColor="white" />
					<stop offset="0.5" stopColor="black" />
				</linearGradient>
				<mask id="mask">
					<rect x="0" y="50" width="2000" height="2000" fill="url(#gradient)" />
				</mask>
			</defs>
		</Wave>
	);
}

export default Waves;
