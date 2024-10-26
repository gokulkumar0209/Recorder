import React, { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { clsx } from "clsx";
import "./Home.css";
import Waves from "./Waves";

function Home() {
	const [isRecordingStarted, setIsRecordingStarted] = useState(false);
	const [count, setCount] = useState(3);
	const [file, setFile] = useState(null);
	const constraints = {
		audio: true,
	};
	const {
		startRecording,
		stopRecording,
		togglePauseResume,
		isRecording,
		isPaused,
		recordingTime,
		recordingBlob,
	} = useAudioRecorder();

	const start = async (e) => {
		e.preventDefault();
		await requestMedia();
	};

	const pause = (e) => {
		e.preventDefault();

		togglePauseResume();
		if (count == "Resume") {
			setCount("Pause");
		} else if (count == "Pause") {
			setCount("Resume");
		}
		console.log(isPaused);
		console.log(recordingTime);
	};

	const stop = (e) => {
		e.preventDefault();
		stopRecording();
		setIsRecordingStarted(false);
		setCount(3);
	};
	const dlt = (e) => {
		e.preventDefault();
		stop(e);
		setFile(null);
		console.log("File Deleted");
	};
	const requestMedia = async () => {
		try {
			await navigator.mediaDevices.getUserMedia(constraints);
			setIsRecordingStarted(true);
			startCountdown();
		} catch (error) {
			console.log("Error accessing microphone", error);
		}
	};

	const startCountdown = () => {
		const initialCount = 3;
		setCount(initialCount);
		const interval = setInterval(() => {
			setCount((prevCount) => {
				if (prevCount <= 1) {
					clearInterval(interval);
					startRecording();
					setCount("Pause");
				}
				return prevCount - 1;
			});
		}, 1000);
	};
	useEffect(() => {
		if (!recordingBlob) {
			return;
		}
		setFile(recordingBlob);
	}, [recordingBlob]);
	return (
		<div className="star-background outer-border flex justify-center items-center">
			<h1 className="absolute top-28 text-center text-white z-10 font-reenie  font-medium text-[27px]">
				<span className="inline-block transform  ">b</span>
				<span className="inline-block transform rotate-[-15.16deg] ">a</span>
				<span className="inline-block transform ">b</span>
				<span className="inline-block transform rotate-[17.39deg] ">b</span>
				<span className="inline-block transform rotate-[17.39deg] ">l</span>
				<span className="inline-block transform rotate-[17.39deg] ">e</span>
			</h1>

			<div className="inner-border w-[1152px] h-[560px] flex justify-center items-center relative overflow-hidden">
				{!isRecordingStarted ? (
					<button onClick={start}>
						<div className="w-[202px] h-[202px] rounded-full border-[1px] border-[#FFB684] flex justify-center items-center bg-[#2F4858] shadow-md text-[#FFB684] font-semibold order-1">
							Babble
						</div>
					</button>
				) : count !== null ? (
					<div className={clsx("relative w-[202px] h-[202px] order-2")}>
						<button className="relative z-10" onClick={pause}>
							<div
								className={clsx(
									"w-[202px] h-[202px] rounded-full flex justify-center items-center font-semibold bg-white",
									count == "Resume" &&
										"w-[150px] h-[150px] bg-[#FFB684] mt-8 ml-4"
								)}
							>
								{count}
							</div>
						</button>
						<div
							className={clsx(
								"z-10 absolute -bottom-20 left-0 right-0 p-2 text-center",
								count == "Resume" && " -left-48"
							)}
						>
							<button onClick={dlt} className=" p-2 rounded-full bg-white">
								&#x1F5D1;
							</button>
						</div>
					</div>
				) : null}

				{count === "Resume" && (
					<div className="relative w-[202px] h-[202px] order-1">
						<button className="relative z-10" onClick={stop}>
							<div className="w-[202px] h-[202px] rounded-full flex justify-center items-center font-semibold bg-white">
								Done
							</div>
						</button>
					</div>
				)}

				{!isPaused && isRecording && (
					<div className="absolute -bottom-6 left-0 w-full h-full z-0 overflow-hidden">
						<Waves />
					</div>
				)}
			</div>
			{!isRecordingStarted && (
				<div className=" absolute bottom-[140px] w-full flex justify-center gap-4  ">
					<img className=" h-[58px] w-[58px] " src="/images/home.png" alt="" />
					<img
						className=" h-[58px] w-[58px] "
						src="/images/recording.png"
						alt=""
					/>
				</div>
			)}
		</div>
	);
}

export default Home;
