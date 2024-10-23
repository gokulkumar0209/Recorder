import React, { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
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
			<div className="inner-border w-[1152px] h-[560px]  flex justify-center items-center">
				{noStart ? (
					<button onClick={(e) => startStop(e)}>
						<div className=" w-[202px] h-[202px] rounded-full border-[1px] border-[#FFB684] flex justify-center items-center bg-[#2F4858] border-shadow text-[#FFB684] font-semibold ">
							Babble
						</div>
					</button>
				) : (
					count && (
						<button>
							<div className=" w-[202px] h-[202px] rounded-full flex justify-center items-center font-semibold bg-white ">
								{count}
							</div>
						</button>
					)
				)}
			</div>
		</div>
	);
}

// box-shadow: 0px 4px 70px 10px #FFFFFF0D;

export default Home;
