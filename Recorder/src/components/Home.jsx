import React, { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "./Home.css";
function Home() {
	const [noStart, setNoStart] = useState(true);
	const [count, setCount] = useState(3);
	const constraints = {
		audio: true,
	};
	const {
		startRecording,
		stopRecording,
		togglePauseResume,
		recordingBlob,
		isRecording,
		isPaused,
		recordingTime,
		mediaRecorder,
	} = useAudioRecorder();
	const startStop = async (e) => {
		e.preventDefault();
		await requestMedia();
	};
	async function requestMedia() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);

			setNoStart(false);
			startCountdown();
		} catch (error) {
			console.log("Blocked Block", error);
			return false;
		}
	}
	const startCountdown = () => {
		const initialCount = 3;
		setCount(initialCount);
		const interval = setInterval(() => {
			setCount((prevcount) => {
				if (prevcount <= 1) {
					clearInterval(interval);
					console.log("Recording Started");
					setCount("Start");
					startRecording();
				}
				return prevcount - 1;
			});
		}, 1000);
	};

	return (
		<div className="star-background  outer-border flex justify-center items-center ">
			<div className="inner-border w-[1152px] h-[560px]  flex justify-center items-center relative overflow-hidden">
				{noStart ? (
					<button onClick={(e) => startStop(e)}>
						<div className=" w-[202px] h-[202px] rounded-full border-[1px] border-[#FFB684] flex justify-center items-center bg-[#2F4858] border-shadow text-[#FFB684] font-semibold ">
							Babble
						</div>
					</button>
				) : (
					count != null && (
						<div className="relative w-[202px] h-[202px]">
							<button className="relative z-10">
								<div className="w-[202px] h-[202px] rounded-full flex justify-center items-center font-semibold bg-white">
									{count}
								</div>
							</button>
						</div>
					)
				)}
				{count == "Start" && (
					<div className="absolute -bottom-6 left-0 w-full h-full z-0 overflow-hidden">
						<div className="wave-container overflow-hidden">
							<svg
								className="wave wave1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1440 320"
							>
								<path
									fill="#FFC59A"
									d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,202.7C672,235,768,245,864,229.3C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
								></path>
							</svg>
							<svg
								className="wave wave2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1440 320"
							>
								<path
									fill="#FFB684"
									d="M0,320L48,293.3C96,267,192,213,288,213.3C384,213,480,267,576,298.7C672,331,768,341,864,325.3C960,309,1056,267,1152,234.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
								></path>
							</svg>
							<svg
								className="wave wave3"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1440 320"
							>
								<path
									fill="#FFC59A"
									d="M0,192L48,170.7C96,149,192,107,288,117.3C384,128,480,192,576,202.7C672,213,768,171,864,165.3C960,160,1056,192,1152,213.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
								></path>
							</svg>
							<svg
								className="wave wave4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1440 320"
							>
								<path
									fill="#FFB684"
									d="M0,288L48,272C96,256,192,224,288,192C384,160,480,128,576,112C672,96,768,96,864,122.7C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
								></path>
							</svg>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

// box-shadow: 0px 4px 70px 10px #FFFFFF0D;

export default Home;
