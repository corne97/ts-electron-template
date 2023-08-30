import React from "react";

import { HID } from "./ipc";
import type { Device } from "node-hid";

import "./app.scss";

const initList = await HID.getDevices();

const deviceInfo = await HID.getDeviceInfo(10);

console.log({ deviceInfo });

export function App()
{
	const [list, _] = React.useState<Device[]>(initList);

	return (
		<>
			<div className="d-flex justify-content-between">
				<button
					className="btn btn-primary" id="chooseDevice">
					Scan Devices
				</button>
				<button className="btn btn-primary" id="writeData">
					WriteData
				</button>
				{list.map((device, i) => <h1 key={i}>{device.productId} - {device.manufacturer} - {device.serialNumber}</h1>)}
			</div>
		</>
	);
}
